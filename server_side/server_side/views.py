from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import logout
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Todo
from .serializers import TodoSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
import random
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from .serializers import UserSerializer


class create_user(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            instance = User.objects.create_user(
                username=serializer.validated_data.get("username"),
                email=serializer.validated_data.get("email"),
            )
            instance.set_password(serializer.validated_data.get("password"))
            instance.save()
            return Response(
                {"message": "User created successfully.", "status": 'success'},
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"error": serializer.errors, "status": 'error'},
                status=status.HTTP_400_BAD_REQUEST,
            )



@api_view(["POST"])
def forgot_password(request):
    data = request.data
    email = data.get("email")
    new_password = data.get("new_password")

    if not email:
        return Response(
            {"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST
        )
    elif not new_password:
        return Response(
            {"error": "New password is required."}, status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.get(email=email)
    except User.DoesNotExist:
        return Response(
            {"error": "User with this email does not exist."},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user.set_password(new_password)
    user.save()
    return Response(
        {"message": "New password has been sent to your email."},
        status=status.HTTP_200_OK,
    )


@api_view(["POST"])
def logout_user(request):
    logout(request)
    return Response(
        {"message": "User logged out successfully."}, status=status.HTTP_200_OK
    )


class TodoAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        username = request.user.username
        todos = Todo.objects.filter(user__username=username)
        serializer = TodoSerializer(todos, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data
        title = data.get("title")
        if not title:
            return Response(
                {"error": "Title is required."}, status=status.HTTP_400_BAD_REQUEST
            )
        todo = Todo.objects.create(title=title, user=request.user)
        todo.save()
        return Response("Todo Created Successfully", status=status.HTTP_201_CREATED)

    def delete(self, request):
        data = request.data
        id = data.get("id")
        try:
            todo = Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return Response(
                {"error": "Todo does not exist."}, status=status.HTTP_400_BAD_REQUEST
            )
        todo.delete()
        return Response(
            {"message": "Todo deleted successfully."}, status=status.HTTP_200_OK
        )

    def put(self, request):
        data = request.data
        id = data.get("id")
        try:
            todo = Todo.objects.get(id=id)
        except Todo.DoesNotExist:
            return Response(
                {"error": "Todo does not exist."}, status=status.HTTP_400_BAD_REQUEST
            )
        todo.is_completed = True
        todo.save()
        return Response(
            {"message": "Todo completed successfully."}, status=status.HTTP_200_OK
        )


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({"username": self.user.username})
        return data


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class otprequest(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        data = request.data
        email = data.get("email")

        # generate otp
        global otp
        otp = random.randint(1000, 9999)

        # Email account credentials
        from_address = "acrossdevice01@gmail.com"
        password = "bapw oify vutv fuau"

        # send email to
        to_address = email

        # Email content
        subject = "Verify Otp for Todo App"
        body = f"your otp for password reset is {otp} ."

        msg = MIMEMultipart()
        msg["From"] = from_address
        msg["To"] = to_address
        msg["Subject"] = subject

        # Attach the body with the msg instance
        msg.attach(MIMEText(body, "plain"))

        # Create server object with SSL option
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()

        server.login(from_address, password)
        server.sendmail(from_address, to_address, msg.as_string())
        server.quit()

        return Response(
            {"status": True, "message": "Otp successfully sent", "otp": f"{otp}"},
            status.HTTP_200_OK,
        )


class fixcors(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        email = request.data.get("email")
        password = request.data.get("password")

        print(username, email, password)

        # if not username:
        #     return Response({'error': 'Username is required.'}, status=status.HTTP_400_BAD_REQUEST)

        return Response(
            {"message": "User created successfully."}, status=status.HTTP_201_CREATED
        )

        # if not username or not password or not email:
        #     return Response({'error': 'Username, password, and email are required.'}, status=status.HTTP_400_BAD_REQUEST)

        # if User.objects.filter(username=username).exists():
        #     return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        # try:
        #     user = User.objects.create(
        #     username=username,
        #     email=email)
        #     user.set_password(password)
        #     user.save()
        # except Exception as e:
        #     print('user was not created')

        # return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
