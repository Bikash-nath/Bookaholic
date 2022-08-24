from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
import operator
from functools import reduce

from bookstore.models import Book, Genre, Review
from bookstore.serializers.books_serializers import BookSerializer, BookDetailSerializer, GenreBooksSerializer, GenreSerializer


@api_view(['GET'])
def get_bestseller_books(request):
   books = Book.objects.filter(rating__gte=4).order_by('-num_reviews')[0:18]
   Serializer = BookSerializer(books, many=True)
   return Response(Serializer.data)


@api_view(['GET'])
def get_indian_books(request):
   books = Book.objects.filter(origin__contains='in').order_by('-rating')[0:18]
   Serializer = BookSerializer(books, many=True)
   return Response(Serializer.data)


@api_view(['GET'])
def get_genre_books(request, genre):
   genres = genre.split(' ')
   genre_list = Genre.objects.filter(
       reduce(operator.or_, (Q(genre__contains=x) for x in genres)))

   serializer = GenreBooksSerializer(genre_list, many=True)
   return Response(serializer.data)


@ api_view(['GET'])
def search_books(request):
   query = request.query_params.get('keyword')
   if query == None:
      query = ''
   books = Book.objects.filter(title__icontains=query)
   total_books = len(books)
   page = request.query_params.get('page')  # number
   paginator = Paginator(books, 12)
   try:
      books = paginator.page(page)
   except PageNotAnInteger:
      # if page no. is not provided
      books = paginator.page(1)
   except EmptyPage:
      # if page no. exceeds total number of pages
      books = paginator.page(paginator.num_pages)
   if page == None:
      page = 1
   page = int(page)

   Serializer = BookSerializer(books, many=True)
   return Response({'books': Serializer.data, 'page': page, 'pages': paginator.num_pages, 'total_books': total_books})


@ api_view(['GET'])
def get_book(request, pk):
   book = Book.objects.get(id=pk)
   Serializer = BookDetailSerializer(book, many=False)
   return Response(Serializer.data)


@ api_view(['GET'])
def get_similar_books(request, pk):
   book = Book.objects.get(id=pk)
   books = Book.objects.filter(Q(author=book.author) | Q(genres__in=[
       *book.genres.all()]), ~Q(id=pk)).order_by('rating')[:18]
   serializer = BookSerializer(books, many=True)
   return Response(serializer.data)


@ api_view(['POST'])
@ permission_classes([IsAuthenticated])
def create_book_review(request, pk):
   user = request.user
   book = Book.objects.get(id=pk)
   data = request.data

   # (1) Review already exits
   review_exists = book.review_set.filter(user=user).exists()

   if review_exists:
      content = {'error_message': 'You have already submitted a review.'}
      return Response(content, status=status.HTTP_400_BAD_REQUEST)

   # (2) No rating or 0 given
   elif data['rating'] == 0:
      content = {'error_message': 'Please select a value between 1 and 5.'}
      return Response(content, status=status.HTTP_400_BAD_REQUEST)

   # (3) Create Review
   else:
      review = Review.objects.create(
          user=user,
          book=book,
          name=user.first_name,
          rating=data['rating'],
          comment=data['comment'],
      )

      reviews = Review.objects.all()
      book.num_reviews = len(reviews)

      total = 0
      for review in reviews:
         total += review.rating

      book.rating = total / len(reviews)
      book.save()

      return Response('Review added successfully.')
