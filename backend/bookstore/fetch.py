import requests
import json
import os.path
import random

__BASEURL = 'https://www.googleapis.com/books/v1/volumes'


def fetch_books(q, **kwargs):
   params = dict(q=q)
   for p in 'maxResults langRestrict printType filter download'.split():
      if p in kwargs:
         params[p] = kwargs[p]

   res = requests.get(__BASEURL, params=params)
   # with open('book1.txt', 'a') as f:
   #    f.write(res.content)

   # https://www.googleapis.com/books/v1/volumes?q=intitle%3AImmortals%2Cinauthor%3AAmish&maxResults=5

   if res.status_code == 200:
      return json.loads(res.content)
   else:
      print(res.status_code)
   return res


def filter_dict(r):
   d = {}
   if not r['volumeInfo'].get('authors') or not r['volumeInfo'].get('categories'):
      return {}
   try:
      d['title'] = r['volumeInfo']['title']
      d['ISBN'] = r['volumeInfo']['industryIdentifiers'][1]['identifier']
      d['author'] = r['volumeInfo']['authors'][0]
      d['image'] = 'book_images/' + r['volumeInfo']['title'] + '.jpg'
      d['price'] = random.randint(200, 500)
      d['discount'] = random.randint(20, 41)
      d['count_in_stock'] = random.randint(10, 51)
      if r['volumeInfo']['language'] == 'en':
         d['language'] = 'English'
      else:
         d['language'] = r['volumeInfo']['language']
      d['publisher'] = r['volumeInfo'].get('publisher')
      d['publication_date'] = r['volumeInfo']['publishedDate']
      if r['volumeInfo']["maturityRating"] == "NOT_MATURE":
         d['age_group'] = '10+'
      else:
         d['age_group'] = '18+'
      d['pages'] = r['volumeInfo'].get('pageCount') or 300
      d['genres'] = r['volumeInfo']['categories']

      d['formats'] = {}
      if r.get('accessInfo') and r['accessInfo']['epub'].get('acsTokenLink'):
         d['formats']['Ebook'] = r['accessInfo']['epub']['acsTokenLink']
      if r.get('accessInfo') and r['accessInfo']['pdf'].get('acsTokenLink'):
         d['formats']['PDF'] = r['accessInfo']['pdf']['acsTokenLink']

      d['origin'] = r['saleInfo']['country']
      d['dimensions'] = r['volumeInfo'].get('dimensions')
      d['description'] = r['volumeInfo'].get('description')
      d['rating'] = r['volumeInfo'].get('averageRating') or 0.00
      d['num_reviews'] = r['volumeInfo'].get('ratingsCount') or 0

      path = os.path.join(os.path.join(
          os.getcwd() + '/uploads/book_images/' + r['volumeInfo']['title'] + '.jpg'))

      image = requests.get(
          f"http://covers.openlibrary.org/b/isbn/{r['volumeInfo']['industryIdentifiers'][1]['identifier']}.jpg?default=false")
      if not image.ok:
         url = r['volumeInfo'].get('imageLinks')
         if not url:
            return {}
      if not image.ok and url.get('large'):
         image = requests.get(url.get('large'))
      if not image.ok and url.get('medium'):
         image = requests.get(url.get('medium'))
      if not image.ok and url.get('small'):
         image = requests.get(url.get('small'))
      if not image.ok:
         image = requests.get(url['thumbnail'])
      with open(path, 'wb') as f:
         f.write(image.content)
      return d
   except:
      return {}      


def isbn():
   isbn_list = [9781338216660,
                9780553212426,
                9781602707528, ]
   results = []
   invalid_isbn = []
   for i, isbn in enumerate(isbn_list):
      res = fetch_books(f'isbn:{isbn}', maxResults=1)

      if not res.get('items'):
         invalid_isbn.append(isbn)
         continue
      d = filter_dict(res['items'][0])
      if d != {} or d != None:
         results.append(d)
         print(d.get('title'), 'found.')
   if len(invalid_isbn):
      print('Invalid ISBN list-\n', invalid_isbn)
   print(f'{len(results)} books data fetched.. Invalid ISBNs- {len(invalid_isbn)}')
   return results


def author():
   author = 'Anuj Dhar'
   results = []
   res = fetch_books(f'author:{author}', maxResults=8)

   if not res.get('items'):
      print(res)
      return
   for r in res['items']:
      d = filter_dict(r)
      if d != {} or d != None:
         results.append(d)
   return results

# use subject(keyword) & printType(parameter) for gemres
