from django import forms
from .models import Author
from .models import Book, Image
from .widgets import CustomClearableFileInput


class BookChangeListForm(forms.ModelForm):
    # here we only need to define the field we want to be editable
    authors = forms.ModelMultipleChoiceField(
        queryset=Author.objects.all(), required=False)


class BookForm(forms.ModelForm):

    class Meta:
        model = Book
        fields = '__all__'
        # TODO: fix form for add book plus beside input

        # fields = ('title',)

    image = forms.ImageField(
        label='Image', required=False, widget=CustomClearableFileInput)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # categories = Category.objects.all()
        # friendly_names = [(c.id, c.get_friendly_name()) for c in categories]

        # for field in self.fields.items():
        #     field.attrs['class'] = 'border-black rounded-0'

        # self.fields['full_name'].widget.attrs['autofocus'] = True
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'input'

        # for field in self.fields.values():
        #     field.widget.attrs.update({'class': 'form-control'})
