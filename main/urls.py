from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('api/oxygenStatus',views.oxygen_data),
    path('api/caseStats',views.current_cases_data),
    path('api/stateWiseCaseHistory',views.state_wise_case_history),
    path('api/hospitalbeds', views.hospital_beds_data),
    path('api/icu', views.icu_data)
]
