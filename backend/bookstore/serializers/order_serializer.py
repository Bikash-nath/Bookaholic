from rest_framework import serializers
from bookstore.models import ShippingAddress, OrderItem, Order
from .user_serializer import UserSerializer


class ShippingAddressSerializer(serializers.ModelSerializer):
   class Meta:
      model = ShippingAddress
      fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
   class Meta:
      model = OrderItem
      fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
   order_items = serializers.SerializerMethodField(read_only=True)
   shipping_address = serializers.SerializerMethodField(read_only=True)
   user = serializers.SerializerMethodField(read_only=True)

   class Meta:
      model = Order
      fields = '__all__'

   def get_order_items(self, obj):
      items = obj.orderitem_set.all()
      serializer = OrderItemSerializer(items, many=True)
      return serializer.data

   def get_shipping_address(self, obj):
      try:
         # query from database
         address = ShippingAddressSerializer(
             obj.shippingaddress, many=False).data
      except Exception as e:
         address = False
      return address

   def get_user(self, obj):
      serializer = UserSerializer(obj.user, many=False)
      return serializer.data
