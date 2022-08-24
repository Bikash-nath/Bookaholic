from django.urls import path
from bookstore.views import book_views as views

urlpatterns = [    
    path('bestseller/', views.get_bestseller_books, name='bestsellers'),    
    path('indian/', views.get_indian_books, name='indian-books'),    
    path('search/', views.search_books, name='search-books'),        
    path('<str:pk>/', views.get_book, name='book'),            
    path('genre/<str:genre>/', views.get_genre_books, name='books-by-genre'),
    path('<str:pk>/similar/', views.get_similar_books, name='similar-book'),
    path('<str:pk>/reviews/', views.create_book_review, name='create-review'),
]
