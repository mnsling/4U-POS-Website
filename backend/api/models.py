from django.db import models
from django.db.models import Sum
from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from django.utils import timezone
from django.db import transaction

# Supplier Model
class Supplier(models.Model):
    supplierName = models.CharField(unique=True, max_length=100)
    cellphoneNumber = models.CharField(max_length=100)
    telephoneNumber = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)
    pointPerson = models.CharField(unique=True, max_length=100)

    def __str__(self):
        return self.supplierName
    
# Product Model
class Product(models.Model):
    # Category Field Choices
    CATEGORY_CHOICES = [
        ('MISC', 'Miscellaneous'),
        ('STATIONERY', 'Stationery and Office Supplies'),
        ('SMOKING', 'Tobacco & Smoking Accessories'),
        ('HOUSE', 'Household Items'),
        ('HEALTH', 'Health & Beauty'),
        ('FROZEN', 'Frozen Foods'),
        ('REFRIDGERATED', 'Dairy & Refridgerated Items'),
        ('GROCERY', 'Grocery Items'),
        ('SNACKS', 'Snacks'),
        ('BEVERAGES', 'Beverages'),
    ]

    name = models.CharField(unique=True, max_length=100)
    barcodeNo = models.CharField(unique=True, max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    unitPrice = models.DecimalField(max_digits=10, decimal_places=2)
    wsmq = models.IntegerField()
    wsp = models.DecimalField(max_digits=10, decimal_places=2)
    reorderLevel = models.IntegerField()
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
    
# Stock Model
class Stock(models.Model):
    stockName = models.CharField(max_length=100, unique=True, default='')
    supplier = models.ForeignKey(Supplier, default='', on_delete=models.CASCADE)
    productId = models.ForeignKey(Product, default='', on_delete=models.CASCADE, null=True, blank=True)
    backhouseStock = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    backUoM = models.CharField(default='', max_length=50)
    standardQuantity= models.IntegerField(default=0)
    displayStock = models.IntegerField(default=0)
    displayUoM = models.CharField(default='', max_length=50)
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.stockName
    
# Product Model
class RepackedProduct(models.Model):
    # Category Field Choices
    CATEGORY_CHOICES = [
        ('MISC', 'Miscellaneous'),
        ('STATIONERY', 'Stationery and Office Supplies'),
        ('SMOKING', 'Tobacco & Smoking Accessories'),
        ('HOUSE', 'Household Items'),
        ('HEALTH', 'Health & Beauty'),
        ('FROZEN', 'Frozen Foods'),
        ('REFRIDGERATED', 'Dairy & Refridgerated Items'),
        ('GROCERY', 'Grocery Items'),
        ('SNACKS', 'Snacks'),
        ('BEVERAGES', 'Beverages'),
    ]

    name = models.CharField(unique=True, max_length=100)
    stock = models.ForeignKey(Stock, default='', on_delete=models.CASCADE)
    barcodeNo = models.CharField(unique=True, max_length=100)
    category = models.CharField(max_length=100, choices=CATEGORY_CHOICES)
    displayedStock = models.IntegerField()
    unitWeight = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    unitPrice = models.DecimalField(max_digits=10, decimal_places=2)
    wsmq = models.IntegerField()
    wsp = models.DecimalField(max_digits=10, decimal_places=2)
    reorderLevel = models.IntegerField()
    created = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name

# DeliveryRecord Model
class DeliveryRecord(models.Model):
    # Status Field Choices
    STATUS_CHOICES = [
        ('VALIDATING', 'Validating'),
        ('DELIVERED', 'Delivered'),
    ]

    supplierId = models.ForeignKey(Supplier, null=True, on_delete=models.CASCADE)
    referenceNumber = models.CharField(unique=True, null=True, max_length=100)
    dateDelivered = models.DateField(null=True, blank=True)
    deliveryFee = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    totalAmount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='VALIDATING')

    def calculate_total_amount(self):
        total_sum = DeliveryRecordItem.objects.filter(deliveryRecordID=self).aggregate(Sum('total'))['total__sum']
        self.totalAmount = total_sum if total_sum is not None else 0

    def update_stock_for_delivery(self):
        if self.status == 'DELIVERED':
            for item in DeliveryRecordItem.objects.filter(deliveryRecordID=self):
                quantity = item.qty

                try:
                    stock_entry = Stock.objects.get(id=item.stockID.id)
                except Stock.DoesNotExist:
                    continue

                expiry_date = item.expiryDate

                stock_entry.backhouseStock += quantity

                stock_entry.save()

                StockItem.objects.create(
                    stockID=stock_entry,
                    referenceNumber=self.referenceNumber,
                    closedStock=quantity,
                    openStock=0, 
                    toDisplayStock=0,
                    displayedStock=0,
                    damagedStock=0,
                    stockedOutQty=0,
                    expiryDate=expiry_date,
                )

    def save(self, *args, **kwargs):
        if self.pk:
            self.calculate_total_amount()

        # Automatically set dateDelivered if status is 'DELIVERED'
        if self.status == 'DELIVERED':
            if self.dateDelivered is None:
                self.dateDelivered = timezone.now().date()

            # Only update stock and create StockItem if the status is changed to "DELIVERED"
            self.update_stock_for_delivery()

        super().save(*args, **kwargs)

    def __str__(self):
        return self.referenceNumber

# DeliveryRecordItem Model
class DeliveryRecordItem(models.Model):
    deliveryRecordID = models.ForeignKey(DeliveryRecord, on_delete=models.CASCADE)
    stockID = models.ForeignKey(Stock, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    qty = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    expiryDate = models.DateField(null=True, blank=True)

    def save(self, *args, **kwargs):
        # Automatically calculate the total as price * qty before saving
        self.total = self.price * self.qty
        super().save(*args, **kwargs)
    
    def __str__(self):
        return f"{self.deliveryRecordID}"

# Signal functions to update totalAmount when DeliveryRecordItem changes
@receiver(post_save, sender=DeliveryRecordItem)
@receiver(post_delete, sender=DeliveryRecordItem)
def update_delivery_record_total(sender, instance, **kwargs):
    delivery_record = instance.deliveryRecordID
    delivery_record.calculate_total_amount()
    delivery_record.save()

class StockItem(models.Model):
    stockID = models.ForeignKey(Stock, null=True, on_delete=models.CASCADE)
    referenceNumber = models.CharField(null=True, max_length=100)
    closedStock = models.IntegerField(null=True)
    openStock = models.IntegerField(null=True)
    toDisplayStock = models.IntegerField(null=True)
    displayedStock = models.IntegerField(null=True)
    damagedStock = models.IntegerField(null=True)
    stockedOutQty = models.IntegerField(null=True)
    expiryDate = models.DateField(null=True)

    def __str__(self):
        return f"{self.stockID.stockName} - {self.referenceNumber}"

class Transaction(models.Model):
    TERMINAL_CHOICES = [
        ('ONE', 'One'),
        ('TWO', 'Two'),
        ('THREE', 'Three'),
    ]

    STATUS_CHOICES = [
        ('COMPLETED', 'Completed'),
        ('VOIDED', 'Voided'),
        ('ON HOLD', 'On Hold'),
    ]

    transactionTime = models.DateTimeField(auto_now_add=True)
    terminalIssued = models.CharField(max_length=10, choices=TERMINAL_CHOICES, default='One')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ON HOLD')
    amountDue = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discountApplicable = models.BooleanField()
    finalAmount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    amountPaid = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    customerChange = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Transaction {self.id}"

    def calculate_amount_due(self):
        # Calculate amountDue as the sum of productTotal from TransactionItem objects
        total = TransactionItem.objects.filter(transactionID=self).aggregate(Sum('productTotal'))['productTotal__sum']
        self.amountDue = total if total is not None else 0

        # Calculate finalAmount based on discount condition
        if self.discountApplicable:
            self.finalAmount = float(self.amountDue * 0.85)  # Applying a 15% discount
        else:
            self.finalAmount = self.amountDue

        # Save the updated values to the database
        self.save()
    
class TransactionItem(models.Model):
    transactionID = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    productID = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    productTotal = models.DecimalField( max_digits=10, decimal_places=2,null=True, blank=True)
    unitMeasurement = models.CharField(max_length=25, null=True, blank=True)

    def fetch_product_price_and_display_uom(self):
        try:
            product_price = self.productID.unitPrice
            stock_entry = Stock.objects.get(productId=self.productID)
            display_uom = stock_entry.displayUoM
            return {
                "price": product_price,
                "displayUoM": display_uom,
            }
        except ObjectDoesNotExist:
            return {
                "price": None,
                "displayUoM": "UoM not found",
            }

    def save(self, *args, **kwargs):
        product_data = self.fetch_product_price_and_display_uom()
        self.price = product_data["price"] if product_data["price"] is not None else self.price
        self.unitMeasurement = product_data["displayUoM"]
        
        # Calculate the productTotal
        if self.price is not None and self.quantity is not None:
            self.productTotal = self.price * self.quantity

        super().save(*args, **kwargs)

    def __str__(self):
        return f"Transaction Item: {self.id}"
    
@receiver(post_save, sender=TransactionItem)
@receiver(post_delete, sender=TransactionItem)
def update_transaction_amount_due(sender, instance, **kwargs):
    transaction = instance.transactionID
    transaction.calculate_amount_due()

class OpenStockLog(models.Model):
    # Status Field Choices
    STATUS_CHOICES = [
        ('VALIDATING', 'Validating'),
        ('CONFIRMED', 'Confirmed'),
    ]

    dateCreated = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='VALIDATING')

    def __str__(self):
        return str(self.dateCreated)
    
class OpenStockLogItem(models.Model):
    logID = models.ForeignKey(OpenStockLog, on_delete=models.CASCADE, default=0)
    productID = models.ForeignKey(Product, on_delete=models.CASCADE)
    stockItemID = models.ForeignKey(StockItem, on_delete=models.CASCADE, default=0)
    referenceNumber = models.CharField(max_length=25, null=True, blank=True)
    boxesOpened = models.IntegerField()
    previousQty = models.IntegerField()
    qtyAdded = models.IntegerField()
    damagedQty = models.IntegerField()

    def __str__(self):
        return self.referenceNumber

# Signal for OpenStockLog
@receiver(post_save, sender=OpenStockLog)
def handle_open_stock_log_confirmation(sender, instance, created, **kwargs):
    if created or instance.status != "CONFIRMED":
        return

    log_items = OpenStockLogItem.objects.filter(logID=instance)

    with transaction.atomic():
        for log_item in log_items:
            stock_item = log_item.stockItemID
            if not stock_item:
                raise ValueError(f"StockItem not found for log item {log_item.referenceNumber}")

            # Update StockItem
            stock_item.closedStock = (stock_item.closedStock or 0) - log_item.boxesOpened
            stock_item.openStock = (stock_item.openStock or 0) + log_item.boxesOpened
            stock_item.toDisplayStock = (stock_item.toDisplayStock or 0) + log_item.qtyAdded
            stock_item.damagedStock = (stock_item.damagedStock or 0) + log_item.damagedQty
            stock_item.save()

            # Update Stock
            stock = stock_item.stockID
            if not stock:
                raise ValueError(f"Stock not found for StockItem {stock_item.id}")

            stock.backhouseStock = (stock.backhouseStock or 0) - log_item.boxesOpened
            stock.save()

class MoveStockLog(models.Model):
    # Status Field Choices
    STATUS_CHOICES = [
        ('VALIDATING', 'Validating'),
        ('CONFIRMED', 'Confirmed'),
    ]

    dateCreated = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='VALIDATING')

    def __str__(self):
        return str(self.dateCreated)
    
class MoveStockLogItem(models.Model):
    logID = models.ForeignKey(MoveStockLog, on_delete=models.CASCADE, default=0)
    productID = models.ForeignKey(Product, on_delete=models.CASCADE)
    stockItemID = models.ForeignKey(StockItem, on_delete=models.CASCADE, default=0)
    referenceNumber = models.CharField(max_length=25, null=True, blank=True)
    previousQty = models.IntegerField()
    stocksMoved = models.IntegerField()

    def __str__(self):
        return self.referenceNumber
    
# Signal for MoveStockLog
@receiver(post_save, sender=MoveStockLog)
def handle_open_stock_log_confirmation(sender, instance, created, **kwargs):
    if created or instance.status != "CONFIRMED":
        return

    log_items = MoveStockLogItem.objects.filter(logID=instance)

    with transaction.atomic():
        for log_item in log_items:
            stock_item = log_item.stockItemID
            if not stock_item:
                raise ValueError(f"StockItem not found for log item {log_item.referenceNumber}")

            # Update StockItem
            stock_item.toDisplayStock = (stock_item.toDisplayStock or 0) - log_item.stocksMoved
            stock_item.displayedStock = (stock_item.displayedStock or 0) + log_item.stocksMoved
            stock_item.save()

            # Update Stock
            stock = stock_item.stockID
            if not stock:
                raise ValueError(f"Stock not found for StockItem {stock_item.id}")

            stock.displayStock = (stock.displayStock or 0) + log_item.stocksMoved
            stock.save()
    
class StockOutLog(models.Model):
    # Status Field Choices
    STATUS_CHOICES = [
        ('VALIDATING', 'Validating'),
        ('CONFIRMED', 'Confirmed'),
    ]

    dateCreated = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='VALIDATING')

    def __str__(self):
        return str(self.dateCreated)
    
class StockOutLogItem(models.Model):
    logID = models.ForeignKey(StockOutLog, on_delete=models.CASCADE, default=0)
    productID = models.ForeignKey(Product, on_delete=models.CASCADE)
    stockItemID = models.ForeignKey(StockItem, on_delete=models.CASCADE, default=0)
    referenceNumber = models.CharField(max_length=25, null=True, blank=True)
    previousQty = models.IntegerField()
    stockOutQty = models.IntegerField()
    stockOutDescription = models.TextField(null=True)

    def __str__(self):
        return self.referenceNumber
    
# Signal for OpenStockLog
@receiver(post_save, sender=StockOutLog)
def handle_open_stock_log_confirmation(sender, instance, created, **kwargs):
    if created or instance.status != "CONFIRMED":
        return

    log_items = StockOutLogItem.objects.filter(logID=instance)

    with transaction.atomic():
        for log_item in log_items:
            stock_item = log_item.stockItemID
            if not stock_item:
                raise ValueError(f"StockItem not found for log item {log_item.referenceNumber}")

            # Update StockItem
            stock_item.displayedStock = (stock_item.displayedStock or 0) - log_item.stockOutQty
            stock_item.stockedOutQty = (stock_item.stockedOutQty or 0) + log_item.stockOutQty
            stock_item.save()

            # Update Stock
            stock = stock_item.stockID
            if not stock:
                raise ValueError(f"Stock not found for StockItem {stock_item.id}")

            stock.displayStock = (stock.displayStock or 0) - log_item.stockOutQty
            stock.save()

class RepackProductLog(models.Model):
    # Status Field Choices
    STATUS_CHOICES = [
        ('VALIDATING', 'Validating'),
        ('CONFIRMED', 'Confirmed'),
    ]

    dateCreated = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='VALIDATING')

    def __str__(self):
        return str(self.dateCreated)
    
class RepackProductLogItem(models.Model):
    logID = models.ForeignKey(OpenStockLog, on_delete=models.CASCADE, default=0)
    productID = models.ForeignKey(RepackedProduct, on_delete=models.CASCADE)
    stockItemID = models.ForeignKey(StockItem, on_delete=models.CASCADE, default=0)
    referenceNumber = models.CharField(max_length=25, null=True, blank=True)
    boxesOpened = models.IntegerField()
    previousQty = models.IntegerField()
    qtyAdded = models.IntegerField()
    damagedQty = models.IntegerField()

    def __str__(self):
        return self.referenceNumber