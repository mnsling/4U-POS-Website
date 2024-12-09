from rest_framework import serializers
from .models import *

class ProductSerializer(serializers.ModelSerializer):
    category_label = serializers.SerializerMethodField()
    supplier = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ('id', 'name', 'barcodeNo', 'category', 'category_label', 'unitPrice', 'wsmq', 'wsp', 'reorderLevel','supplier' )

    def get_category_label(self, obj):
        return obj.get_category_display()
    
    def get_supplier(self, obj):
        stock = Stock.objects.filter(productId=obj).first()
        if stock:
            return SupplierSerializer(stock.supplier).data
        return None

class RepackedProductSerializer(serializers.ModelSerializer):
    category_label = serializers.SerializerMethodField()
    
    class Meta:
        model = RepackedProduct
        fields = ('id', 'name', 'stock', 'barcodeNo', 'category', 'category_label', 'displayedStock', 'unitWeight', 'unitPrice', 'wsmq', 'wsp', 'reorderLevel')

    def get_category_label(self, obj):
        return obj.get_category_display()

class StockSerializer(serializers.ModelSerializer):

    class Meta:
        model = Stock
        fields = ('id', 'stockName', 'supplier', 'productId', 'backhouseStock', 'backUoM', 'standardQuantity', 'displayStock', 'displayUoM')

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
        fields =('id', 'deliveryRecordID', 'stockID', 'price', 'qty', 'total', 'expiryDate')

class StockItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockItem
        fields =('id', 'stockID', 'referenceNumber', 'closedStock', 'openStock', 'toDisplayStock', 'displayedStock', 'damagedStock', 'stockedOutQty', 'expiryDate')

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Transaction
        fields =('id', 'transactionTime', 'terminalIssued', 'amountDue', 'discountApplicable', 'finalAmount', 'amountPaid', 'customerChange')

class TransactionItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = TransactionItem
        fields =('id', 'transactionID', 'barcodeNo', 'quantity', 'price', 'productTotal', 'unitMeasurement')    

class OpenStockLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = OpenStockLog
        fields =('id', 'dateCreated', 'status')

class OpenStockLogItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OpenStockLogItem
        fields =('id', 'logID', 'productID', 'stockItemID', 'referenceNumber', 'boxesOpened', 'previousQty', 'qtyAdded', 'damagedQty')

class MoveStockLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = MoveStockLog
        fields =('id', 'dateCreated', 'status')  

class MoveStockLogItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = MoveStockLogItem
        fields =('id', 'logID', 'productID', 'stockItemID', 'referenceNumber', 'previousQty', 'stocksMoved')

class StockOutLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockOutLog
        fields =('id', 'dateCreated', 'status')  

class StockOutLogItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = StockOutLogItem
        fields =('id', 'logID', 'productID', 'stockItemID', 'referenceNumber', 'previousQty', 'stockOutQty', 'stockOutDescription') 

class OpenRepackStockLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = OpenRepackStockLog
        fields =('id', 'dateCreated', 'status')

class OpenRepackStockLogItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OpenRepackStockLogItem
        fields =('id', 'logID', 'stockID', 'stockItemID', 'referenceNumber', 'openedStock', 'qtyAdded', 'damagedQty')

class RepackStockLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = RepackStockLog
        fields =('id', 'dateCreated', 'status')

class RepackStockLogItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = RepackStockLogItem
        fields =('id', 'logID', 'productID', 'stockID', 'stockItemID', 'referenceNumber', 'qtyUsed', 'repackQty')

class RepackedProductStockOutLogSerializer(serializers.ModelSerializer):

    class Meta:
        model = RepackedProductStockOutLog
        fields =('id', 'dateCreated', 'status')

class RepackedProductStockOutLogItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = RepackedProductStockOutLogItem
        fields =('id', 'logID', 'productID', 'stockItemID', 'referenceNumber', 'previousQty', 'stockOutQty', 'stockOutDescription')

class ReturnSerializer(serializers.ModelSerializer):

    class Meta:
        model = Returns
        fields =('id', 'transactionID', 'returnDate', 'status', 'refundAmount')

class ReturnItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = ReturnItems
        fields =('id', 'returnID', 'transactionItemID', 'itemQty', 'itemPrice', 'amountRefundable')

class  StartCashCountSerializer(serializers.ModelSerializer):

    class Meta:
        model = StartCashCount
        fields =('id', 'dateToday', 'terminalIssued', 'beginningBalance')

class  EndCashCountSerializer(serializers.ModelSerializer):

    class Meta:
        model = EndCashCount
        fields =('id', 'dateToday', 'terminalIssued', 'thousand', 'fiveHundred', 'twoHundred', 'oneHundred', 'fifty', 'twenty', 'ten', 'five', 'one', 'twoFiveCent', 'tenCent', 'fiveCent', 'amountTotal')