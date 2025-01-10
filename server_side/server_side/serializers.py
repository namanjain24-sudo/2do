from rest_framework import serializers
from .models import Todo

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'is_completed', 'user']
        # Ensure title is defined as a CharField
        extra_kwargs = {
            'title': {'required': True, 'allow_blank': False}
        }