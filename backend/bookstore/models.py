from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator, MaxValueValidator
from django.core.validators import MinLengthValidator


class Genre(models.Model):
   genre = models.CharField(max_length=30)

   def __str__(self):
      return self.genre


class Author(models.Model):
   name = models.CharField(max_length=100)
   image = models.ImageField(
       upload_to='author_images', default='/author-image.jpg')
   biography = models.TextField(validators=[MinLengthValidator(50)])
   genres = models.ManyToManyField(Genre)
   language = models.CharField(max_length=50, default='English')
   total_books = models.IntegerField(default=0)
   origin = models.CharField(max_length=50, default='India')
   dob = models.DateField(auto_now_add=False, null=True, blank=True)
   website = models.CharField(max_length=50, null=True, blank=True)
   twitter = models.CharField(max_length=50, null=True, blank=True)
   num_reviews = models.IntegerField(default=0)
   rating = models.DecimalField(
       max_digits=3, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(5)])
   total_followers = models.IntegerField(default=0)

   def __str__(self):
      return f"{self.name}"


class Seller(models.Model):
   name = models.CharField(max_length=50)
   delivers_in = models.IntegerField(default=5)
   replacement = models.IntegerField(default=10)
   returnable = models.BooleanField(default=False)
   rating = models.DecimalField(
       max_digits=3, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(5)])
   num_reviews = models.IntegerField(default=0)
   joined = models.DateField(auto_now_add=False)
   address = models.CharField(max_length=200)

   def __str__(self):
      return self.name


class Book(models.Model):
   user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
   title = models.CharField(max_length=200)
   ISBN = models.IntegerField(default=0)
   author = models.ForeignKey(Author, on_delete=models.PROTECT)
   image = models.ImageField(
       upload_to='book_images', default='/placeholder.png')
   price = models.DecimalField(
       max_digits=7, decimal_places=2)
   discount = models.IntegerField(
       default=0)
   language = models.CharField(max_length=50, default='English')
   publisher = models.CharField(max_length=200, null=True)
   publication_date = models.TextField(null=True)
   pages = models.IntegerField(default=0)
   genres = models.ManyToManyField(Genre)
   origin = models.CharField(max_length=30, default='Indian')
   age_group = models.CharField(max_length=30, default='Any')
   weight = models.DecimalField(
       max_digits=6, decimal_places=2, default=0.00)
   dimensions = models.CharField(max_length=25, null=True)
   description = models.TextField(
       validators=[MinLengthValidator(50)], null=True)
   bestseller_rank = models.IntegerField(null=True)
   seller = models.ForeignKey(Seller, on_delete=models.PROTECT)
   rating = models.DecimalField(
       max_digits=3, decimal_places=2, validators=[MinValueValidator(0), MaxValueValidator(5)])
   num_reviews = models.IntegerField(default=0)
   count_in_stock = models.IntegerField(default=0)

   def __str__(self):
      return f"{self.title} ({self.rating})"


class Format(models.Model):
   book = models.ForeignKey(Book, on_delete=models.CASCADE, null=True)
   format = models.CharField(max_length=30, default='Paperback')
   link = models.CharField(max_length=200, null=True, blank=True)

   def __str__(self):
      return self.format

# <img src="{{ user.userprofile.avatar.url }}">
# <img src=path/to/images/{{ user.get_profile.avatar }}">


class UserProfile(models.Model):
   user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
   avatar = models.ImageField(
       upload_to='profile_images', default='profile_images/user-avatar.jpg')
   mobile_no = models.IntegerField(
       validators=[MaxValueValidator(10000000000)], blank=True, null=True)
   gender = models.CharField(max_length=10, null=True)
   wish_list = models.ManyToManyField(Book, related_name='wish_list')
   books = models.ManyToManyField(Book, related_name='favourites')
   authors = models.ManyToManyField(Author, related_name='followers')
   genres = models.ManyToManyField(Genre)

   def __str__(self):
      return f'{self.user.first_name}'


class Cart(models.Model):
   user = models.ForeignKey(
       UserProfile, on_delete=models.SET_NULL, related_name='cart_items', null=True)
   book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
   format = models.OneToOneField(Format, on_delete=models.SET_NULL, null=True)
   seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
   quantity = models.IntegerField(default=1)

   def __str__(self):
      return str(self.rating)


class Review(models.Model):
   book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
   seller = models.ForeignKey(Seller, on_delete=models.SET_NULL, null=True)
   user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
   name = models.CharField(max_length=50)
   author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)
   rating = models.IntegerField(default=0)
   comment = models.TextField(blank=True, null=True)
   created_at = models.DateTimeField(auto_now_add=True)

   def __str__(self):
      return str(self.rating)


class Notification(models.Model):
   userprofile = models.ForeignKey(
       UserProfile, on_delete=models.CASCADE, related_name='notifications', null=True)
   title = models.CharField(max_length=50)
   body = models.TextField(null=True)
   generated_at = models.DateTimeField(auto_now_add=True)
   is_unread = models.BooleanField(default=True)

   def __str__(self):
      return str(self.title)


class Order(models.Model):
   user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
   payment_method = models.CharField(max_length=200)
   shipping_price = models.DecimalField(
       max_digits=7, decimal_places=2)
   total_price = models.DecimalField(
       max_digits=7, decimal_places=2, default=0.00)
   total_savings = models.IntegerField(default=0)
   ordered_at = models.DateTimeField(auto_now_add=True)
   is_paid = models.BooleanField(default=False, null=True, blank=True)
   paid_at = models.DateTimeField(
       auto_now_add=False, null=True, blank=True)
   is_dispatched = models.BooleanField(default=False, null=True)
   dispatched_at = models.DateTimeField(
       auto_now_add=False, null=True, blank=True)
   is_shipped = models.BooleanField(default=False, null=True)
   shipped_at = models.DateTimeField(
       auto_now_add=False, null=True, blank=True)
   is_delivered = models.BooleanField(default=False, null=True)
   delivered_at = models.DateTimeField(
       auto_now_add=False, null=True, blank=True)
   arriving_at = models.DateTimeField(
       auto_now_add=False, null=True, blank=True)
   is_cancelled = models.BooleanField(default=False, null=True)

   def __str__(self):
      return str(self.ordered_at)


class OrderItem(models.Model):
   book = models.ForeignKey(Book, on_delete=models.SET_NULL, null=True)
   author = models.ForeignKey(Author, on_delete=models.SET_NULL, null=True)
   order = models.ForeignKey(Order, on_delete=models.CASCADE, null=True)
   title = models.CharField(max_length=200)
   author_name = models.CharField(max_length=50, null=True)
   qty = models.IntegerField(default=0)
   price = models.DecimalField(
       max_digits=7, decimal_places=2)
   discount = models.IntegerField(default=0)
   seller = models.CharField(max_length=50)
   image = models.CharField(max_length=200)

   def __str__(self):
      return str(self.title)


class ShippingAddress(models.Model):
   order = models.OneToOneField(Order, on_delete=models.CASCADE)
   full_name = models.CharField(max_length=80)
   mobile_no = models.IntegerField(
       validators=[MaxValueValidator(10000000000)])
   pincode = models.CharField(max_length=10)
   building = models.CharField(max_length=50)
   area = models.CharField(max_length=50)
   city = models.CharField(max_length=100)
   state = models.CharField(max_length=50)
   landmark = models.CharField(max_length=50)
   address_type = models.CharField(max_length=30, null=True)

   def __str__(self):
      return f'{self.area}, {self.city}'
