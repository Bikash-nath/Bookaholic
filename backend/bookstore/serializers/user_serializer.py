from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from bookstore.models import UserProfile, Notification
from bookstore.serializers.books_serializers import AuthorSerializer, BookSerializer, GenreSerializer


class UserProfileSerializer(serializers.ModelSerializer):

   class Meta:
      model = UserProfile
      fields = ['id', 'user', 'avatar', 'mobile_no', 'gender']


class UserSerializer(serializers.ModelSerializer):
   is_admin = serializers.SerializerMethodField(read_only=True)
   token = serializers.SerializerMethodField(read_only=True)
   profile = serializers.SerializerMethodField(read_only=True)
   # profile = UserProfileSerializer(many=True)

   class Meta:
      model = User
      fields = ('id', 'email', 'first_name',
                'last_name', 'is_admin', 'token', 'profile')
   def get_first_name(self,obj):
      return obj.first_name or obj.email.split('@')[0]

   def get_is_admin(self, obj):
      return obj.is_staff

   def get_token(self, obj):
      token = RefreshToken.for_user(obj)
      return str(token.access_token)

   def get_profile(self, obj):
      profile = obj.userprofile_set.all()[0]
      serializer = UserProfileSerializer(profile, many=False)
      return serializer.data

   # def to_representation(self, obj): #for OneToOneField relationship
   #    representation = super().to_representation(obj)
   #    profile_representation = representation.pop('profile')
   #    for key in profile_representation:
   #       representation[key] = profile_representation[key]

   #    return representation


class NotificationSerializer(serializers.ModelSerializer):
   class Meta:
      model = Notification
      fields = '__all__'


class UserDetailSerializer(serializers.ModelSerializer):
   books = serializers.SerializerMethodField(read_only=True)
   authors = serializers.SerializerMethodField(read_only=True)
   genres = serializers.SerializerMethodField(read_only=True)
   notifications = serializers.SerializerMethodField(read_only=True)

   class Meta:
      model = UserProfile
      fields = ['id', 'books', 'authors', 'genres', 'notifications']

   def get_books(self, obj):
      serializer = BookSerializer(obj.books.all(), many=True)
      return serializer.data

   def get_authors(self, obj):
      serializer = AuthorSerializer(obj.authors.all(), many=True)
      return serializer.data

   def get_genres(self, obj):
      serializer = GenreSerializer(obj.genres.all(), many=True)
      return serializer.data

   def get_notifications(self, obj):
      serializer = NotificationSerializer(obj.notifications.all(), many=True)
      return serializer.data
