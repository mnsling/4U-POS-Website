from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    category_label = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'supplier', 'barcodeNo', 'category', 'category_label', 'unitPrice', 'wsmq', 'wsp', 'reorderLevel')

    def get_category_label(self, obj):
        return obj.get_category_display()

class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ('id', 'productId', 'backhouseStock', 'backUoM', 'displayStock', 'displayUoM')

class SupplierSerializer(serializers.ModelSerializer):

    class Meta:
        model = Supplier
        fields = ('id', 'supplierName', 'cellphoneNumber', 'telephoneNumber', 'email', 'pointPerson')

class DeliveryRecordSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryRecord
        fields = ('id', 'supplierId', 'referenceNumber', 'dateDelivered', 'deliveryFee', 'totalAmount', 'status')

class DeliveryRecordItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = DeliveryRecordItem
        fields =('id', 'deliveryRecordID', 'productID', 'price', 'qty', 'total', 'expiryDate')

class StockItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockItem
        fields =('id', 'productID', 'stockID', 'closedStock', 'openStock', 'toDisplayStock', 'displayedStock', 'damagedStock', 'stockedOutQty', 'stockOutDescription', 'expiryDate')

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields =('id', 'transactionTime', 'terminalIssued', 'amountDue', 'discountApplicable', 'finalAmount', 'amountPaid', 'customerChange')

class TransactionItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TransactionItem
        fields =('id', 'transactionID', 'productID', 'quantity', 'price', 'productTotal', 'unitMeasurement')    