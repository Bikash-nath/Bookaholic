from django.urls import path
from bookstore.views import author_views as views

urlpatterns = [
    path('top/', views.get_top_authors, name='top-author'),
    path('all/', views.get_all_authors, name='all-authors'),    
    path('<str:pk>/', views.get_author, name='author'),    
    path('<str:pk>/similar/', views.get_similar_authors, name='similar-authors'),
    path('<str:pk>/reviews/', views.create_author_review, name='create-review'),
]
