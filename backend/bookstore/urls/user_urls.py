from django.urls import path
from bookstore.views import user_views as views


urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(),
         name='token_obtain_pair'),
    path('register/', views.register_user, name='register-user'),

    path('', views.get_users, name='user-profiles'),
    path('profile/', views.get_user_profile, name='user-profile'),
    path('details/', views.get_user_details, name='user-details'),

    path('profile/update/', views.update_user_profile, name='user-profile-update'),
    path('delete/<str:pk>/', views.delete_user, name='delete-user'),

    path('follow/author/', views.follow_author, name='follow-author'),
    path('favourite/book/', views.favourite_book, name='favourite-book'),    
    path('favourite/genre/', views.favourite_genre, name='favourite-genre'),
    
    path('notifications/', views.get_unread_notifications, name='get-unread-notifications'),
    path('notifications/update/', views.update_read_notifications, name='update-read-notifications'),
]
