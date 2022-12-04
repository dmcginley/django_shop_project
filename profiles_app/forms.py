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

        # fields = ['full_name', 'email', 'default_phone_number',
        #           'default_street_address1', 'default_street_address2', 'default_town_or_city']

        placeholders = {
            'full_name': 'e.g Alex Smith',
            'email': 'e.g. alexsmith@gmail.com',
            'default_phone_number': '+353 083 555 ...',
            'default_street_address1': '42 Street',
            'default_street_address2': 'Street',
            'default_town_or_city': 'Letterkenny',
            'default_postcode': 'F92 RV1F',
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
