from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _


User = get_user_model()


class Category(models.Model):
    name = models.CharField(_("name"), max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    STATUS_CHOICES = [
        ('available', _('Available')),
        ('out_of_stock', _('Out of Stock')),
        ('discontinued', _('Discontinued')),
    ]

    name = models.CharField(_("name"), max_length=100)
    description = models.TextField(_("description"))
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name=_("category"))
    price = models.DecimalField(_("price"), max_digits=8, decimal_places=2)
    image = models.URLField(_("image"), max_length=200)
    status = models.CharField(_("status"), max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    def __str__(self):
        return self.name


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, blank=True, verbose_name=_("products"))
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    def __str__(self):
        return f"{self.user}'s cart"


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    products = models.ManyToManyField(Product, verbose_name=_("products"))
    total_amount = models.DecimalField(_("total amount"), max_digits=8, decimal_places=2)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    def __str__(self):
        return f"{self.user}'s order"
