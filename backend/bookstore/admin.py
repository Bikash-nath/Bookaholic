from django.contrib import admin
from .models import Book, Author, Genre, Format, Review, Order, OrderItem, ShippingAddress, UserProfile, Seller


class BookAdmin(admin.ModelAdmin):
   list_filter = ('author', 'genres', 'price', 'publisher',
                  'publication_date', 'bestseller_rank', 'rating')
   list_display = ('title', 'author', 'price', 'rating')


class AuthorAdmin(admin.ModelAdmin):
   list_filter = ('rating', 'genres','total_books', 'origin', 'dob', )
   list_display = ('name', 'origin', 'rating','total_books')


admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Genre)
admin.site.register(Format)
admin.site.register(Review)
admin.site.register(Order)
admin.site.register(OrderItem)
admin.site.register(ShippingAddress)
admin.site.register(UserProfile)
admin.site.register(Seller)
