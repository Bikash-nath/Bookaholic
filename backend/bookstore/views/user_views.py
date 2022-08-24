from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from bookstore.models import UserProfile, Author, Book, Genre, Notification

from bookstore.serializers.user_serializer import UserSerializer, UserDetailSerializer

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

   def validate(self, attrs):
      data = super().validate(attrs)
      serializer = UserSerializer(self.user).data
      for k, v in serializer.items():
         data[k] = v

      return data


class MyTokenObtainPairView(TokenObtainPairView):
   serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def register_user(request):
   data = request.data   
   try:
      user = User.objects.create(
          first_name=data['firstName'],
          last_name=data['lastName'],
          username=data['email'].split('@')[0],
          email=data['email'],
          password=make_password(data['password'])
      )      
      userserializer = UserSerializer(user, many=False)            
      return Response(userserializer.data)
   except:      
      message = {'error_message': 'User with this email already exists'}
      return Response(message, status=status.HTTP_400_BAD_REQUEST)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def get_user_profile(request):
   user = request.user
   serializer = UserSerializer(user, many=False)
   return Response(serializer.data)


@ api_view(['GET'])
@ permission_classes([IsAdminUser])
def get_users(request):
   users = User.objects.all()
   serializer = UserSerializer(users, many=True)
   return Response(serializer.data)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def update_user_profile(request):
   user = request.user
   data = request.data
   userprofile = UserProfile.objects.get(id=data['profile_id'])

   if request.FILES.get('avatar'):
      userprofile.avatar = request.FILES['avatar']
   if data.get('mobileNo'):
      userprofile.mobile_no = data['mobileNo']
   if data.get('gender'):
      userprofile.gender = data['gender']
   userprofile.save()

   if data.get('firstName'):
      user.first_name = data['firstName']
   if data.get('lastName'):
      user.last_name = data['lastName']
   if data.get('email'):
      user.email = data['email']
      # update password if password is provided or else don't update
   if not data['password']:
      user.password = make_password(data['password'])
   user.save()
   
   Notification.objects.create(userprofile=userprofile, title='👤 Account details updated',
                               body='You have successfully updated your account details.')
   serializer = UserSerializer(user, many=False)

   return Response(serializer.data)


@ api_view(['DELETE'])
@ permission_classes([IsAdminUser])
def delete_user(request, pk):
   user = User.objects.get(id=pk)
   name = str(user)
   user.delete()
   return Response({'message': f'{name.capitalize()} was successfully deleted.'})


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def get_user_details(request):
   user = request.user
   userprofile = user.userprofile_set.all()[0]
   serializer = UserDetailSerializer(userprofile, many=False)
   return Response(serializer.data)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def follow_author(request, ):
   user = request.user
   userprofile = user.userprofile_set.all()[0]
   author_id = request.data['authorId']
   author = Author.objects.get(id=author_id)

   author_exists = userprofile.authors.all().filter(id=author.id).exists()

   if not author_exists:
      userprofile.authors.add(author)
      author.total_followers += 1

   else:
      userprofile.authors.remove(author)
      author.total_followers -= 1

   author.save()
   serializer = UserDetailSerializer(userprofile, many=False)
   return Response(serializer.data)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def favourite_book(request):
   user = request.user
   userprofile = user.userprofile_set.all()[0]
   book_id = request.data['bookId']
   book = Book.objects.get(id=book_id)

   book_exists = userprofile.books.all().filter(id=book.id).exists()

   if not book_exists:
      userprofile.books.add(book)

   else:
      userprofile.books.remove(book)

   serializer = UserDetailSerializer(userprofile, many=False)
   return Response(serializer.data)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def favourite_genre(request):
   user = request.user
   userprofile = user.userprofile_set.all()[0]
   genre = request.data['genre']
   genre_obj = Genre.objects.get(genre=genre)
   genre_exists = userprofile.genres.all().filter(id=genre_obj.id).exists()

   if not genre_exists:
      userprofile.genres.add(genre_obj)

   else:
      userprofile.genres.remove(genre_obj)

   serializer = UserDetailSerializer(userprofile, many=False)
   return Response(serializer.data)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def get_unread_notifications(request):
   user = request.user
   userprofile = user.userprofile_set.all()[0]
   unread = len(userprofile.notifications.filter(is_unread=True))   
   return Response({'unread': unread}, status=status.HTTP_201_CREATED)


@ api_view(['PUT'])
@ permission_classes([IsAuthenticated])
def update_read_notifications(request):
   user = request.user
   userprofile = user.userprofile_set.all()[0]
   for notification in userprofile.notifications.all():
      notification.is_unread = False
      notification.save()
   return Response({'unread': 0}, status=status.HTTP_201_CREATED)
