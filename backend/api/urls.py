from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('product', ProductViewset, basename='product')
router.register('stock', StockViewset, basename='stock')
router.register('supplier', SupplierViewset, basename='supplier')
router.register('stockRecord', StockRecordViewset, basename='stockRecord')
router.register('stockRecordItem', StockRecordItemViewset, basename='stockRecordItem')

urlpatterns = router.urls