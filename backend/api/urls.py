from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('product', ProductViewset, basename='product')
router.register('stock', StockViewset, basename='stock')
router.register('supplier', SupplierViewset, basename='supplier')
router.register('deliveryRecord', DeliveryRecordViewset, basename='deliveryRecord')
router.register('deliveryRecordItem', DeliveryRecordItemViewset, basename='deliveryRecordItem')
router.register('stockItem', StockItemViewset, basename='stockItem')
router.register('transaction', TransactionViewset, basename='transaction')
router.register('transactionItem', TransactionItemViewset, basename='transactionItem')

urlpatterns = router.urls