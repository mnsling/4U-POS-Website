from django.urls import path
from .views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register('product', ProductViewset, basename='product')

urlpatterns = router.urls

# urlpatterns = [
#     path('', home)
# ]