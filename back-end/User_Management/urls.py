from rest_framework.routers import DefaultRouter
from django.urls import path, include

from User_Management.views import (
    AllUserViewset,
    RegistrationViewset,
    UserLoginView,
    UserLogoutView,
)

router = DefaultRouter()
router.register("all", AllUserViewset, basename="all-users")
urlpatterns = [
    path("", include(router.urls)),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", UserLogoutView.as_view(), name="logout"),
    path("register/", RegistrationViewset.as_view(), name="register"),
]
