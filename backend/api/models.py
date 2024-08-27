from django.db import models

# Create your models here.

class Product(models.Model):
    # Category Field Choices
    CATEGORY_CHOICES = [
        ('MISC', 'Miscellaneous'),
        ('STAIONERY', 'Stationery and Office Supplies'),
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
    backhouseStock = models.IntegerField()
    displayStock = models.IntegerField()
    unitPrice = models.FloatField()
    wsmq = models.IntegerField()
    wsp = models.FloatField()
    reorderLevel = models.IntegerField()
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
