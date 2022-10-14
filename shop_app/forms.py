from django import forms
from .models import Author


class BookChangeListForm(forms.ModelForm):
    # here we only need to define the field we want to be editable
    authors = forms.ModelMultipleChoiceField(
        queryset=Author.objects.all(), required=False)
