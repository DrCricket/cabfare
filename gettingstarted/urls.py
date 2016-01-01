from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

import hello.views

urlpatterns = patterns('',

    url(r'^', hello.views.uber_data, name='uber_data'),

)
