import sys
import os
from pathlib import Path
import random

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.dirname(SCRIPT_DIR))

from bookstore.models import Book, Author, Seller, Genre, Format
from django.contrib.auth.models import User
from .fetch import isbn_books, author_books


def db_loader(author):
   data = author_books(author)
   try:
      for i in range(len(data)):
         d = data[i]
         u1 = User.objects.all()[0]
         seller = Seller.objects.all()[random.randint(
             0, len(Seller.objects.all()) - 1)]
         try:
            a = Author.objects.get(name__contains=d['author'])
            print(d['author'], '-', d['title'])
         except Exception as e:
            print(f"Author name didn't match, Exception:{e}.")
            continue

         book = Book.objects.create(user=u1, author=a, seller=seller, title=d['title'], ISBN_10=d['ISBN_10'], ISBN_13=d['ISBN_13'],
                                    image=d['image'], price=d['price'], discount=d['discount'], language=d['language'],
                                    publisher=d['publisher'], publication_date=d['publication_date'], pages=d['pages'], origin=d['origin'],
                                    age_group=d['age_group'], dimensions=d['dimensions'], description=d['description'],
                                    rating=d['rating'], num_reviews=d['num_reviews'], count_in_stock=d['count_in_stock'])

         for genre in d['genres']:
            genres = Genre.objects.filter(genre__contains=genre)
            if len(genres):
               g = genres[0]
            else:
               g = Genre.objects.create(genre=genre)
            book.genres.add(g)

         for format, link in d['formats'].items():
            Format.objects.create(format=format, link=link, book=book)
   except Exception as e:
      print(f"Loading failed. Error: {e}")
