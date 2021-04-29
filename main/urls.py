from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('api/oxygenStatus',views.oxygen_data),
    path('api/caseStats',views.current_cases_data)
]
