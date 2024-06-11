from django.urls import path
from . import views

# urlpatterns variable contains all the paths and their corresponding view functions

urlpatterns =[
    #path('session/', views.session_view, name='api_session'),
    #path('whoami/', views.whoami_view, name='api_whoami'),
    path("get_username/", views.get_username, name = "get_username"),
    path("RAMdata/", views.RAMdata, name = "api_ram"),
    path("SSDdata/", views.SSDdata, name = "api_ssd"),
    path("HDDdata/", views.HDDdata, name = "api_hdd"),
    path('login/', views.login_view, name='api_login'),
    path('logout/', views.logout_view, name='api_logout'),
    path('submitAccount/',views.submitAccount_view, name='api_submitAccount'),
    path('deleteAccount/',views.deleteAccount_view, name='api_deleteAccount'),
    
    path('addPurchaseList/', views.addPurchaseList_view, name='add_purchase_list'), 
    path('getPurchaseList/', views.getPurchaseList_view, name='get_purchase_list'), 
    path('removePurchaseList/', views.removePurchaseList_view, name='remove_purchase_list'), 
    path('getOrderHistory/', views.getOrderHistory_view, name='get_order_history'),
    
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),  # Add product to cart
    path('remove_from_cart/', views.remove_from_cart, name='remove_from_cart'),  # Remove product from cart
    path('get_cart/', views.get_cart, name='get_cart'),  # Get list of products in the cart
    
    path('create_collection/', views.create_collection, name='create_collection'),  # Create a new collection, you can create with product or empty
    path('delete_collection/', views.delete_collection, name='delete_collection'),  # Delete a user's specified collection (by name)
    path('add_to_collection/', views.add_to_collection, name='add_to_collection'),  # Add product to specified collection
    path('remove_from_collection/', views.remove_from_collection, name='remove_from_collection'),  # Remove product from collection (by collection ID)
    path('get_collection_products/', views.get_collection_products, name='get_collection_products'),  # Get all products in a specified collection
    path('get_user_collections/', views.get_user_collections, name='get_user_collections'),  # Get all collections of a user

]
