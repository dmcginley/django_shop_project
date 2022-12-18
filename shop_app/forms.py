from django import forms
from .models import Author
from .models import Book
from .widgets import CustomClearableFileInput


class BookChangeListForm(forms.ModelForm):
    # here we only need to define the field we want to be editable
    authors = forms.ModelMultipleChoiceField(
        queryset=Author.objects.all(), required=False)


class BookForm(forms.ModelForm):

    class Meta:
        model = Book
        fields = '__all__'
        # fields = ('title', 'authors', 'rating',
        #           'description', 'isbn',
        #           'publisher', 'publication_date', 'pages',
        #           'image', 'price', 'number_in_stock', 'genres')

    image = forms.ImageField(
        label='Image', required=False, widget=CustomClearableFileInput)

    readonly_fields = ('date_added',)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'input'
            # self.fields[field].widget.attrs['class'] = 'is-fullwidth'
