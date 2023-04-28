from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import gettext_lazy as _

User = get_user_model()


class IntegerRangeField(models.IntegerField):
    def __init__(self, verbose_name=None, name=None, min_value=None, max_value=None, **kwargs):
        self.min_value, self.max_value = min_value, max_value
        models.IntegerField.__init__(self, verbose_name, name, **kwargs)

    def formfield(self, **kwargs):
        defaults = {'min_value': self.min_value, 'max_value': self.max_value}
        defaults.update(kwargs)
        return super(IntegerRangeField, self).formfield(**defaults)


class Category(models.Model):
    name = models.CharField(_("name"), max_length=100, null=False, blank=False)

    def __str__(self):
        return self.name


class Product(models.Model):
    STATUS_CHOICES = [
        ('available', _('Available')),
        ('out_of_stock', _('Out of Stock')),
        ('discontinued', _('Discontinued')),
    ]

    name = models.CharField(_("name"), max_length=100, null=False, blank=False)
    description = models.TextField(_("description"), max_length=500)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, verbose_name=_("category"), null=False, blank=False)
    price = models.DecimalField(_("price"), max_digits=8, decimal_places=2, null=False, blank=False)
    image = models.URLField(_("image"), max_length=200, null=True, blank=True)
    images = models.JSONField(_("images"), default=list, blank=True)
    status = models.CharField(_("status"), max_length=20, choices=STATUS_CHOICES, default='available')
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    def __str__(self):
        return self.name


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("user"), default=1)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, verbose_name=_("product"), default=1)
    # quantities = models.JSONField(_("quantities"))
    quantity = IntegerRangeField(_("quantity"), default=1, min_value=1, max_value=100)
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    def __str__(self):
        return f"the user {self.user} ordered {self.quantity} of {self.product}"


class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name=_("user"), null=False, blank=False)
    orders = models.ManyToManyField(Order, blank=True, verbose_name=_("orders"), related_name="cart_orders")
    created_at = models.DateTimeField(_("created at"), auto_now_add=True)
    updated_at = models.DateTimeField(_("updated at"), auto_now=True)

    def __str__(self):
        return f"{self.user}'s cart"
