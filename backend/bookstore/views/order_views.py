from django.shortcuts import render
# from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework import status
import datetime
from django.utils import timezone

from bookstore.models import Book, Order, OrderItem, ShippingAddress, Author, Notification
from bookstore.serializers.order_serializer import OrderSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
   user = request.user
   data = request.data
   order_items = data['orderItems']
   if order_items and len(order_items) == 0:
      return Response({'error_message': 'No Order Item to proceed.'}, status=status.HTTP_400_BAD_REQUEST)
   else:

      # (1) Create order

      order = Order.objects.create(
          user=user,
          payment_method=data['paymentMethod'],
          shipping_price=data['shippingPrice'],
          total_price=data['totalPrice'],
          total_savings=data['savings']
      )

      # (2) Create shipping address

      shipping = ShippingAddress.objects.create(
          order=order,
          full_name=data['shippingAddress']['fullName'],
          mobile_no=data['shippingAddress']['mobileNo'],
          pincode=data['shippingAddress']['pincode'],
          building=data['shippingAddress']['building'],
          area=data['shippingAddress']['area'],
          landmark=data['shippingAddress']['landmark'],
          city=data['shippingAddress']['city'],
          state=data['shippingAddress']['state'],
          address_type=data.get('addressType')
      )

      # (3) Create order items & set Order to OrderItem relationship
      for order_item in order_items:
         book = Book.objects.get(id=order_item['bookId'])
         author = Author.objects.get(id=order_item['authorId'])
         item = OrderItem.objects.create(
             book=book,
             author=author,
             order=order,
             title=book.title,
             author_name=author.name,
             qty=order_item['qty'],
             price=order_item['price'],
             discount=order_item['discount'],
             seller=order_item['seller'],
             image=book.image.url,  # a string to URL path
         )
         # (4) Update stock
         book.count_in_stock -= item.qty
         book.save()
      serializer = OrderSerializer(order, many=False)
      return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_order_by_id(request, pk):
   try:
      user = request.user
      order = Order.objects.get(id=pk)

      if user.is_staff or order.user == user:
         serializer = OrderSerializer(order, many=False)

         return Response(serializer.data)

      else:
         return Response(
             {'error_message': "You're Not authorised to view this order"},
             status=status.HTTP_400_BAD_REQUEST
         )
   except:
      return Response({'error_message': "Order does not exist."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
   user = request.user
   for order in user.order_set.all():
      if order.is_paid and not order.is_dispatched and timezone.now() > order.paid_at + datetime.timedelta(days=1):
         order.is_dispatched = True
         order.dispatched_at = order.paid_at + datetime.timedelta(days=1)
      if order.is_dispatched and not order.is_shipped and timezone.now() > order.dispatched_at + datetime.timedelta(days=2):
         order.is_shipped = True
         order.shipped_at = order.paid_at + datetime.timedelta(days=3)
      if order.is_shipped and not order.is_delivered and timezone.now() > order.shipped_at + datetime.timedelta(days=4):
         order.is_delivered = True
         order.delivered_at = order.paid_at + datetime.timedelta(days=7)
      order.save()
   orders = user.order_set.all()
   serializer = OrderSerializer(orders, many=True)
   return Response(serializer.data)


@ api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def cancel_order(request, pk):
   order = Order.objects.get(id=pk)
   order_id=order.id
   order.delete()
   userprofile = request.user.userprofile_set.all()[0]
   Notification.objects.create(userprofile=userprofile, title='📦 Order cancellation successfull',
                               body=f'You have successfully cancelled Order no. {order_id}')
   return Response(status=status.HTTP_204_NO_CONTENT)


@ api_view(['DELETE'])
@ permission_classes([IsAuthenticated])
def cancel_order_item(request, pk):
   order_item = OrderItem.objects.get(id=pk)
   order_item.delete()
   userprofile = request.user.userprofile_set.all()[0]
   Notification.objects.create(userprofile=userprofile, title='📦 Order-item cancellation successfull',
                               body=f"You have successfully cancelled '{order_item.title}' book")
   return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
   order = Order.objects.get(id=pk)
   order.is_paid = True
   order.paid_at = timezone.now()
   order.arriving_at = order.paid_at + datetime.timedelta(days=7)
   order.save()
   userprofile = request.user.userprofile_set.all()[0]
   Notification.objects.create(userprofile=userprofile, title='💰 Payment successfull',
                               body=f'Your order will be arriving at {order.arriving_at}')
   return Response(status=status.HTTP_201_CREATED)
