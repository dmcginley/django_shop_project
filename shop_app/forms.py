from django import forms
from .models import Author
# from .widgets import CustomClearableFileInput
from .models import Book


class BookChangeListForm(forms.ModelForm):
    # here we only need to define the field we want to be editable
    authors = forms.ModelMultipleChoiceField(
        queryset=Author.objects.all(), required=False)


class BookForm(forms.ModelForm):

    class Meta:
        model = Book
        fields = '__all__'

    # image = forms.ImageField(
    #     label='Image', required=False, widget=CustomClearableFileInput)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        # categories = Category.objects.all()
        # friendly_names = [(c.id, c.get_friendly_name()) for c in categories]

        # self.fields['category'].choices = friendly_names
        # for field_name, field in self.fields.items():
        #     field.widget.attrs['class'] = 'border-black rounded-0'

        # for field in self.fields.items():
        #     field.attrs['class'] = 'border-black rounded-0'

        # self.fields['full_name'].widget.attrs['autofocus'] = True
        for field in self.fields:
            self.fields[field].widget.attrs['class'] = 'label p-2'
