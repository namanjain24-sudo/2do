from rest_framework import serializers
from .models import Todo
from django.contrib.auth.models import User

class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ['id', 'title', 'is_completed', 'user']
        extra_kwargs = {
            'title': {'required': True, 'allow_blank': False}
        }

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError('Email is required.')
        elif '@' not in value:
            raise serializers.ValidationError('Email is invalid.')
        elif '.' not in value:
            raise serializers.ValidationError('Email is invalid.')
        elif User.objects.filter(email=value).exists():
            raise serializers.ValidationError('Email is already in use.')
        return value
    
    def validate_username(self, value):
        if not value:
            raise serializers.ValidationError('Username is required.')
        elif User.objects.filter(username=value).exists():
            raise serializers.ValidationError('Username is already in use.')
        return value
    
    def validate_password(self, value):
        if not value:
            raise serializers.ValidationError('Password is required.')
        elif len(value) < 4:
            raise serializers.ValidationError('Password must be at least 4 characters long.')
        return value