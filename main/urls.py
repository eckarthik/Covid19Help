from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('oxygenStatus',views.oxygen_data),
    path('caseStats',views.current_cases_data)
]
