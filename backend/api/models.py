from django.db import models

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
    displayStock = models.IntegerField(default=0)
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