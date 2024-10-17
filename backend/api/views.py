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
    
class StockRecordViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = StockRecord.objects.all()
    serializer_class = StockRecordSerializer

    def get_queryset(self):
        """Return a fresh queryset each time."""
        return StockRecord.objects.all()

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
    
class StockRecordItemViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = StockRecordItem.objects.all()
    serializer_class = StockRecordItemSerializer

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