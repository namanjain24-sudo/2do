from django.contrib import admin
from django.urls import path
from .views import create_user, forgot_password, logout_user, TodoAPIView, CustomTokenObtainPairView,otprequest,fixcors
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('create_user', create_user.as_view(), name='create_user'),
    path('forgot_password', forgot_password, name='forgot_password'),
    path('logout_user', logout_user, name='logout_user'),
    path('signin_user', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('tokenrefresh', TokenRefreshView.as_view(), name='token_refresh'),
    path('todos', TodoAPIView.as_view(), name='todos'),
    path('otprequest', otprequest.as_view(), name='otprequest'),
    path('fixcors',fixcors.as_view(),name='fixcors')
]
