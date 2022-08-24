from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User
from bookstore.models import Book, Author, Genre, Format, Review, Seller


class BookSerializer(serializers.ModelSerializer):
   class Meta:
      model = Book
      fields = ['id', 'title', 'price', 'image',
                'discount', 'rating', 'num_reviews']


class AuthorSerializer(serializers.ModelSerializer):
   class Meta:
      model = Author
      fields = ['id', 'biography', 'name', 'image']


class AuthorDetailSerializer(serializers.ModelSerializer):
   reviews = serializers.SerializerMethodField(read_only=True)
   genres = serializers.SerializerMethodField(read_only=True)
   books = serializers.SerializerMethodField(read_only=True)

   class Meta:
      model = Author
      fields = '__all__'

   def get_genres(self, obj):
      serializer = GenreSerializer(obj.genres.all(), many=True)
      return serializer.data

   def get_reviews(self, obj):
      reviews = obj.review_set.all()
      serializer = ReviewSerializer(reviews, many=True)
      return serializer.data

   def get_books(self, obj):
      books = obj.book_set.all()
      serializer = BookSerializer(books, many=True)
      return serializer.data


class GenreSerializer(serializers.ModelSerializer):

   class Meta:
      model = Genre
      fields = ['id', 'genre']


class GenreBooksSerializer(serializers.ModelSerializer):
   books = serializers.SerializerMethodField(read_only=True)

   class Meta:
      model = Genre
      fields = ['books']

   def get_books(self, obj):
      book_set = obj.book_set.all()
      serializer = BookSerializer(book_set, many=True)
      return serializer.data


class ReviewSerializer(serializers.ModelSerializer):
   class Meta:
      model = Review
      fields = '__all__'


class FormatSerializer(serializers.ModelSerializer):
   class Meta:
      model = Format
      fields = ['format','link']


class SellerSerializer(serializers.ModelSerializer):
   class Meta:
      model = Seller
      fields = '__all__'


class BookDetailSerializer(serializers.ModelSerializer):
   reviews = serializers.SerializerMethodField(read_only=True)
   genres = serializers.SerializerMethodField(read_only=True)
   formats = serializers.SerializerMethodField(read_only=True)
   author = serializers.SerializerMethodField(read_only=True)
   seller = SellerSerializer()
   author = AuthorDetailSerializer()

   class Meta:
      model = Book
      fields = '__all__'

   def get_author(self, obj):
      serializer = AuthorSerializer(obj.author, many=False)
      return serializer.data

   def get_genres(self, obj):
      serializer = GenreSerializer(obj.genres.all(), many=True)
      return serializer.data

   def get_formats(self, obj):
      serializer = FormatSerializer(obj.format_set.all(), many=True)
      return serializer.data

   def get_seller(self, obj):
      serializer = ReviewSerializer(obj.seller, many=True)
      return serializer.data

   def get_reviews(self, obj):
      reviews = obj.review_set.all()
      serializer = ReviewSerializer(reviews, many=True)
      return serializer.data
