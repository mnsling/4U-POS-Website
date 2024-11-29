from django.contrib import admin
from django.shortcuts import render, redirect
from django.urls import path
from django.http import HttpResponseBadRequest
from .models import *
from .forms import QuantityForm

admin.site.register(Stock)
admin.site.register(Product)
admin.site.register(Supplier)
admin.site.register(DeliveryRecord)
admin.site.register(DeliveryRecordItem)
admin.site.register(StockItem)
admin.site.register(Transaction)
admin.site.register(TransactionItem)
admin.site.register(OpenStockLog)
admin.site.register(OpenStockLogItem)
admin.site.register(MoveStockLog)
admin.site.register(MoveStockLogItem)
admin.site.register(StockOutLog)
admin.site.register(StockOutLogItem)