from django.urls import path
from . import views

urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('register/', views.register_view, name='register'),
    path('login_user/', views.login_user, name='login_user'),
    path('logout/', views.logout_user, name='logout'),

    path('donation/', views.donation_index, name='donation_index'),
    path('donation_form/', views.donation_form, name='donation_form'),
    path('submit_donation/', views.submit_donation, name='submit_donation'),
    path('thankyou_page/', views.thankyou_page, name="thankyou_page"),

    path('my_donations/', views.my_donations, name='my_donations'),
    path('delete_donation/<int:donation_id>/', views.delete_donation, name='delete_donation'),

    path('donation_listings/', views.donation_listings, name='donation_listings'),
    path('request_donation/<int:donation_id>/', views.request_donation, name='request_donation'),

    path('my_requests/', views.my_requests, name='my_requests'),
    path('delete_request/<int:request_id>/', views.delete_request, name='delete_request'),

    path('manage_request/<int:request_id>/<str:action>/', views.manage_request, name='manage_request'),
    path('donation-requests/', views.donation_requests_for_my_listings, name='donation_requests_for_my_listings'),

    path('tracker_dash/', views.tracker_dashboard, name='tracker_dashboard'),
    path('add_food_item/', views.add_food_item, name='add_food_item'),
    path('edit_item/<int:item_id>/', views.edit_food_item, name='edit_food_item'),
    path('delete_item/<int:item_id>/', views.delete_food_item, name='delete_food_item'),


]
