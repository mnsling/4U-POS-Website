from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import viewsets, permissions
from .serializers import *
from rest_framework.response import Response
from .models import *

# Create your views here.

class ProductViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return Product.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product)
        return Response(serializer.data)

    def update(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        product.delete()
        return Response(status=204)
    
class RepackedProductViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = RepackedProduct.objects.all()
    serializer_class = RepackedProductSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return RepackedProduct.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product)
        return Response(serializer.data)

    def update(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        serializer = self.serializer_class(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        product = self.queryset.get(pk=pk)
        product.delete()
        return Response(status=204)
    
class StockViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Stock.objects.all()
    serializer_class = StockSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return Stock.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stock = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stock)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stock = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stock = self.queryset.get(pk=pk)
        stock.delete()
        return Response(status=204)

class SupplierViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return Supplier.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        supplier = self.queryset.get(pk=pk)
        serializer = self.serializer_class(supplier)
        return Response(serializer.data)

    def update(self, request, pk=None):
        supplier = self.queryset.get(pk=pk)
        serializer = self.serializer_class(supplier, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        supplier = self.queryset.get(pk=pk)
        supplier.delete()
        return Response(status=204)
    
class DeliveryRecordViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = DeliveryRecord.objects.all()
    serializer_class = DeliveryRecordSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return DeliveryRecord.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class DeliveryRecordItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = DeliveryRecordItem.objects.all()
    serializer_class = DeliveryRecordItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return DeliveryRecordItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecordItem = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecordItem)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecordItem = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecordItem, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecordItem = self.queryset.get(pk=pk)
        stockRecordItem.delete()
        return Response(status=204)
    
class StockItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = StockItem.objects.all()
    serializer_class = StockItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return StockItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stock = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stock)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stock = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stock, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stock = self.queryset.get(pk=pk)
        stock.delete()
        return Response(status=204)

class TransactionViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return Transaction.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class TransactionItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = TransactionItem.objects.all()
    serializer_class = TransactionItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return TransactionItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class OpenStockLogViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = OpenStockLog.objects.all()
    serializer_class = OpenStockLogSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return OpenStockLog.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class OpenStockLogItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = OpenStockLogItem.objects.all()
    serializer_class = OpenStockLogItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return OpenStockLogItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class MoveStockLogViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = MoveStockLog.objects.all()
    serializer_class = MoveStockLogSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return MoveStockLog.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class MoveStockLogItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = MoveStockLogItem.objects.all()
    serializer_class = MoveStockLogItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return MoveStockLogItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class StockOutLogViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = StockOutLog.objects.all()
    serializer_class = StockOutLogSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return StockOutLog.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class StockOutLogItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = StockOutLogItem.objects.all()
    serializer_class = StockOutLogItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return StockOutLogItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class OpenRepackStockLogViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = OpenRepackStockLog.objects.all()
    serializer_class = OpenRepackStockLogSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return OpenRepackStockLog.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)

class OpenRepackStockLogItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = OpenRepackStockLogItem.objects.all()
    serializer_class = OpenRepackStockLogItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return OpenRepackStockLogItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class RepackStockLogViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = RepackStockLog.objects.all()
    serializer_class = RepackStockLogSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return RepackStockLog.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class RepackStockLogItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = RepackStockLogItem.objects.all()
    serializer_class = RepackStockLogItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return RepackStockLogItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class RepackedProductStockOutLogViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = RepackedProductStockOutLog.objects.all()
    serializer_class = RepackedProductStockOutLogSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return RepackedProductStockOutLog.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class RepackedProductStockOutLogItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = RepackedProductStockOutLogItem.objects.all()
    serializer_class = RepackedProductStockOutLogItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return RepackedProductStockOutLogItem.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class ReturnViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = Returns.objects.all()
    serializer_class = ReturnSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return Returns.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)
    
class ReturnItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = ReturnItems.objects.all()
    serializer_class = ReturnItemSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return ReturnItems.objects.all()

    def list(self, request):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def retrieve(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord)
        return Response(serializer.data)

    def update(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        serializer = self.serializer_class(stockRecord, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors, status=400)

    def destroy(self, request, pk=None):
        stockRecord = self.queryset.get(pk=pk)
        stockRecord.delete()
        return Response(status=204)