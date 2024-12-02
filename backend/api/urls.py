from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('product', ProductViewset, basename='product')
router.register('repackedProduct', RepackedProductViewset, basename='repackedProduct')
router.register('stock', StockViewset, basename='stock')
router.register('supplier', SupplierViewset, basename='supplier')

router.register('deliveryRecord', DeliveryRecordViewset, basename='deliveryRecord')
router.register('deliveryRecordItem', DeliveryRecordItemViewset, basename='deliveryRecordItem')
router.register('stockItem', StockItemViewset, basename='stockItem')

router.register('transaction', TransactionViewset, basename='transaction')
router.register('transactionItem', TransactionItemViewset, basename='transactionItem')

router.register('openStockLog', OpenStockLogViewset, basename='openStockLog')
router.register('openStockLogItem', OpenStockLogItemViewset, basename='openStockLogItem')
router.register('moveStockLog', MoveStockLogViewset, basename='moveStockLog')
router.register('moveStockLogItem', MoveStockLogItemViewset, basename='moveStockLogItem')
router.register('stockOutLog', StockOutLogViewset, basename='stockOutLog')
router.register('stockOutLogItem', StockOutLogItemViewset, basename='stockOutLogItem')

router.register('openRepackStockLog', OpenRepackStockLogViewset, basename='openRepackStockLog')
router.register('openRepackStockLogItem', OpenRepackStockLogItemViewset, basename='openRepackStockLogItem')
router.register('repackStockLog', RepackStockLogViewset, basename='repackStockLog')
router.register('repackStockLogItem', RepackStockLogItemViewset, basename='repackStockLogItem')
router.register('repackStockOutLog', RepackedProductStockOutLogViewset, basename='repackProductStockOutLog')
router.register('repackStockOutLogItem', RepackedProductStockOutLogItemViewset, basename='repackProductStockOutLogItem')

router.register('return', ReturnViewset, basename='return')
router.register('returnItem', ReturnItemViewset, basename='returnItem')

urlpatterns = router.urls