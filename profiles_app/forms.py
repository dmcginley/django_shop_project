from django import forms
from .models import UserProfile


class UserProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        exclude = ('user',)

    def __init__(self, *args, **kwargs):
        """
        Add placeholders and classes, remove auto-generated
        labels and set autofocus on first field
        """
        super().__init__(*args, **kwargs)
        placeholders = {
            # 'full_name': 'e.g Alex Smith',
            # 'email': 'e.g. alexsmith@gmail.com',
            'default_phone_number': '',
            'default_street_address1': '',
            'default_street_address2': '',
            'default_town_or_city': '',
            'default_postcode': '',
            'default_county': '',
            'default_country': '',
            # 'street_address1': 'Street Address 1',
            # 'street_address2': 'Street Address 2',
            # 'town_or_city': 'Town or City',
            # 'postcode': 'Postal Code',
            # 'county': 'County',
            # 'country': 'Country',
        }

        self.fields['default_phone_number'].widget.attrs['autofocus'] = True
        for field in self.fields:
            # if field != 'country':
            # if self.fields[field].required:
            #     placeholder = f'{placeholders[field]}'
            # else:
            placeholder = placeholders[field]
            self.fields[field].widget.attrs['placeholder'] = placeholder
            self.fields[field].widget.attrs['class'] = 'stripe-style-input'
            self.fields[field].widget.attrs['class'] = 'is-fullwidth'

            self.fields[field].label = False
