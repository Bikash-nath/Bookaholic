from .models import Book, Author, Seller, Genre, Format
from django.contrib.auth.models import User
from .fetch import isbn, author


def db_loader():
   data = author()
   for i in range(len(data)):
      try:
         d = data[i]
         u1 = User.objects.all()[0]
         s1 = Seller.objects.all()[0]
         try:
            a = Author.objects.get(name__contains=d['author'])
            print(d['author'],'-',d['title'])         
         except:
            print(f"Invalid data!!")
            continue

         book = Book.objects.create(user=u1, author=a, seller=s1, title=d['title'], ISBN=d['ISBN'], image=d['image'], price=d['price'],
                                    discount=d['discount'], language=d['language'], publisher=d['publisher'],
                                    publication_date=d['publication_date'], pages=d['pages'], origin=d['origin'],
                                    age_group=d['age_group'], dimensions=d['dimensions'], description=d['description'],
                                    rating=d['rating'], num_reviews=d['num_reviews'], count_in_stock=d['count_in_stock'])

         for genre in d['genres']:
            try:
               g = Genre.objects.get(genre__contains=genre)
            except:
               g = Genre.objects.create(genre=genre)
            book.genres.add(g)

         for format, link in d['formats'].items():
            Format.objects.create(format=format, link=link, book=book)
      except:
         print(f"Can't load in DB!! Invalid data")
