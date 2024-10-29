from django.contrib import admin
from django.shortcuts import render, redirect
from django.urls import path
from django.http import HttpResponseBadRequest
from .models import *
from .forms import QuantityForm

class StockAdmin(admin.ModelAdmin):
    list_display = ['id', 'productId', 'backhouseStock', 'backUoM', 'displayStock', 'displayUoM', 'conversionRate']

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('convert_stock/', self.admin_site.admin_view(self.convert_stock), name='convert_stock'),
        ]
        return custom_urls + urls

    def convert_stock(self, request):
        if request.method == 'POST':
            stock_id = request.POST.get('stock_id')
            quantity = request.POST.get('quantity')

            if not stock_id or not quantity:
                return HttpResponseBadRequest("Missing stock_id or quantity.")

            try:
                stock = Stock.objects.get(pk=stock_id)
                quantity = int(quantity)
            except Stock.DoesNotExist:
                return HttpResponseBadRequest("Invalid stock selected.")
            except ValueError:
                return HttpResponseBadRequest("Invalid quantity.")

            stock.convert_to_display_stock(quantity)
            return redirect('admin:api_stock_changelist')

        stock_list = Stock.objects.all()
        return render(request, 'admin/convert_stock.html', {'stock_list': stock_list})

    actions = ['start_convert_stock']

    def start_convert_stock(self, request, queryset):
        selected = request.POST.getlist(admin.helpers.ACTION_CHECKBOX_NAME)
        return redirect(f'convert_stock/?ids={",".join(selected)}')

    start_convert_stock.short_description = "Convert stock"

admin.site.register(Stock, StockAdmin)
admin.site.register(Product)
admin.site.register(Supplier)
admin.site.register(DeliveryRecord)
admin.site.register(DeliveryRecordItem)
admin.site.register(Transaction)
admin.site.register(TransactionItem)