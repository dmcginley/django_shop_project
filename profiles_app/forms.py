from django import forms
from .models import UserProfile


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ('user',)
        # fields = ('default_name', 'default_phone_number',
        #           'default_street_address1', 'default_street_address2',
        #           'default_town_or_city', 'default_county', 'default_postcode',
        #           'default_country')

    def __init__(self, *args, **kwargs):
        """
        Add placeholders and classes, remove auto-generated
        labels and set autofocus on first field
        """
        super().__init__(*args, **kwargs)

        placeholders = {

            # 'default_name': 'e.g Alex Smith',
            'email': 'e.g. alexsmith@example.com',
            'default_phone_number': '+353 083 5551234',
            'default_street_address1': '123 Main Street',
            'default_street_address2': 'Apt 12',
            'default_town_or_city': 'Letterkenny',
            'default_postcode': 'F92 AABB',
            'default_county': 'Donegal',
            'default_country': 'Ireland',

        }

        self.fields['default_phone_number'].widget.attrs['autofocus'] = True
        for field in self.fields:
            # if field != 'country':
            # if self.fields[field].required:
            # placeholder = f'{placeholders[field]}'
            # else:
            placeholder = placeholders[field]
            self.fields[field].widget.attrs['placeholder'] = placeholder
            self.fields[field].widget.attrs['class'] = 'is-fullwidth'

            # self.fields[field].label = False
