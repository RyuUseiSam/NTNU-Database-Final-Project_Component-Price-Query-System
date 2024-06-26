from django.urls import path
from . import views

# urlpatterns variable contains all the paths and their corresponding view functions

urlpatterns =[
    path('submitAccount/',views.submitAccount_view, name='api_submitAccount'),
    path('deleteAccount/',views.deleteAccount_view, name='api_deleteAccount'),
    path('login/', views.login_view, name='api_login'),
    path('logout/', views.logout_view, name='api_logout'),
    path('session/', views.session_view, name='api_session'),
    path('whoami/', views.whoami_view, name='api_whoami'),
    path('test/', views.test_view, name='api_test'),
]