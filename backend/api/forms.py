from django import forms

class QuantityForm(forms.Form):
    quantity = forms.IntegerField(label='Quantity', min_value=1)