from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.core.mail import send_mail
from django.utils.crypto import get_random_string

@api_view(['POST'])
def create_user(request):
    data = request.data  # Use request.data to access the parsed data
    username = data.get('username')
    password = data.get('password')
    email = data.get('email')

    if not username or not password or not email:
        return Response({'error': 'Username, password, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create(
        username=username,
        email=email
    )
    user.set_password(password)
    user.save()

    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
    

@api_view(['POST'])
def signin_user(request):
    data = request.data
    username = data.get('username')
    password = data.get('password')

    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        return Response({'message': 'User signed in successfully.'}, status=status.HTTP_200_OK)

    return Response({'error': 'Invalid username or password.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def forgot_password(request):
    data = request.data
    email = data.get('email')
    new_password = data.get('new_password')

    if not email:
        return Response({'error': 'Email is required.'}, status=status.HTTP_400_BAD_REQUEST)
    elif not new_password:
        return Response({'error': 'New password is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response({'error': 'User with this email does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(new_password)
    user.save()

    send_mail(
        'Password Reset',
        'Your Password was changed successfully',
        '',
        [email],
        fail_silently=False,
    )

    return Response({'message': 'New password has been sent to your email.'}, status=status.HTTP_200_OK)