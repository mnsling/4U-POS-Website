from django.db import models
from django.utils import timezone

# Create your models here.

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
    unitPrice = models.FloatField()
    wsmq = models.IntegerField()
    wsp = models.FloatField()
    reorderLevel = models.IntegerField()
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def __str__(self):
        return self.name

class Stock(models.Model):

    productId = models.ForeignKey(Product, on_delete=models.CASCADE)
    backhouseStock = models.IntegerField()
    backUoM = models.CharField(default='', max_length=50)
    displayStock = models.IntegerField(default=0)
    displayUoM = models.CharField(default='', max_length=50)
    conversionRate = models.IntegerField()
    created = models.DateField(auto_now_add=True)
    modified = models.DateField(auto_now=True)

    def convert_to_display_stock(self, quantity):
        # Multiply the quantity by the conversion rate to calculate the display stock
        converted_amount = quantity * self.conversionRate
        # Check if there's enough backhouse stock to convert
        if self.backhouseStock >= quantity:
            # Add to display stock
            self.displayStock += converted_amount
            # Subtract the quantity from backhouse stock
            self.backhouseStock -= quantity
            self.save()
            return True
        else:
            return False  # Not enough stock to convert

    def __str__(self):
        return self.productId.name

class Supplier(models.Model):

    supplierName = models.CharField(unique=True, max_length=100)
    cellphoneNumber = models.CharField(max_length=100)
    telephoneNumber = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)
    pointPerson = models.CharField(unique=True, max_length=100)

    def _str_(self):
        return self.supplierName
    
class StockRecord(models.Model):
    # Status Field Choices
    STATUS_CHOICES = [
        ('PENDING', 'Pending'),
        ('APPROVED', 'Approved'),
        ('IN TRANSIT', 'In Transit'),
        ('DELIVERED', 'Delivered'),
        ('CANCELLED', 'Cancelled'),
        ('BACKORDER', 'Backorder'),
    ]

    supplierId = models.ForeignKey(Supplier, null=True, on_delete=models.CASCADE)
    trackingNumber = models.CharField(unique=True, null=True, max_length=100)
    dateOrdered = models.DateField(auto_now_add=True)
    dateDelivered = models.DateField(null=True, blank=True)
    deliveryFee = models.IntegerField(null=True, blank=True)
    totalAmount = models.IntegerField(null=True, blank=True)
    status = models.CharField(max_length=100, choices=STATUS_CHOICES)

    def save(self, *args, **kwargs):
        # Automatically set dateDelivered if status is changed to 'DELIVERED'
        if self.status == 'DELIVERED' and self.dateDelivered is None:
            self.dateDelivered = timezone.now().date()  # Set to current date

        super().save(*args, **kwargs)

    def __str__(self):
        return self.supplierId.supplierName
    
class StockRecordItem(models.Model):

    stockRecordID = models.ForeignKey(StockRecord, on_delete=models.CASCADE)
    productID = models.OneToOneField(Product, on_delete=models.CASCADE)
    price = models.IntegerField()
    qtyOrdered = models.IntegerField()
    qtyDelivered = models.IntegerField()
    total = models.IntegerField()

    def __str__(self):
        return self.productID.name