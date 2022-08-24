from django.shortcuts import render
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status

from bookstore.models import Author, Review
from bookstore.serializers.books_serializers import AuthorSerializer, AuthorDetailSerializer


@api_view(['GET'])
def get_author(request, pk):
   author = Author.objects.get(id=pk)
   serializer = AuthorDetailSerializer(author, many=False)
   return Response(serializer.data)


@api_view(['GET'])
def get_top_authors(request):
   authors = Author.objects.all().order_by('-rating')[0:18]
   serializer = AuthorSerializer(authors, many=True)
   return Response(serializer.data)


@api_view(['GET'])
def get_similar_authors(request, pk):
   author = Author.objects.get(id=pk)
   authors = Author.objects.filter(
       Q(genres__in=[*author.genres.all()]), ~Q(id=pk)).order_by('rating')[:12]
   serializer = AuthorSerializer(authors, many=True)
   return Response(serializer.data)


@api_view(['GET'])
def get_all_authors(request):
   authors = Author.objects.all()
   serializer = AuthorSerializer(authors, many=True)
   return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_author_review(request, pk):
   user = request.user
   author = Author.objects.get(id=pk)
   data = request.data

   # (1) Review already exits
   review_exists = author.review_set.filter(user=user).exists()

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
          author=author,
          name=user.first_name,
          rating=data['rating'],
          comment=data['comment'],
      )

      reviews = Review.objects.all()
      author.num_reviews = len(reviews)

      total = 0
      for review in reviews:
         total += review.rating

      author.rating = total / len(reviews)
      author.save()

      return Response('Review added successfully.')


# @api_view(['GET'])
# def get_authors(request):
#    query = request.query_params.get('keyword')
#    if query == None:
#       query = ''
#    authors = Author.objects.filter(title__icontains=query)

#    page = request.query_params.get('page')  # number
#    paginator = Paginator(authors, 4)
#    try:
#       authors = paginator.page(page)
#    except PageNotAnInteger:
#       # if page no. is not provided
#       authors = paginator.page(1)
#    except EmptyPage:
#       # if page no. exceeds total number of pages
#       authors = paginator.page(paginator.num_pages)
#    if page == None:
#       page = 1
#    page = int(page)

#    serializer = AuthorSerializer(authors, many=True)
#    return Response({'authors': serializer.data, 'page': page, 'pages': paginator.num_pages})
