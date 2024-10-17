from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    category_label = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'barcodeNo', 'category', 'category_label', 'unitPrice', 'wsmq', 'wsp', 'reorderLevel')

    def get_category_label(self, obj):
        return obj.get_category_display()

class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ('id', 'productId', 'backhouseStock', 'backUoM', 'displayStock', 'displayUoM', 'conversionRate')

class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = ('id', 'supplierName', 'cellphoneNumber', 'telephoneNumber', 'email', 'pointPerson')

class StockRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockRecord
        fields = ('id', 'supplierId', 'trackingNumber', 'dateOrdered', 'dateDelivered', 'deliveryFee', 'totalAmount', 'status')

class StockRecordItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockRecordItem
        fields =('stockRecordID', 'productID', 'price', 'qtyOrdered', 'qtyDelivered', 'total')