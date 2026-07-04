# Typed models for the Mockae SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Cart:
    id: Optional[int] = None
    item: Optional[list] = None
    total: Optional[float] = None
    user_id: Optional[int] = None


@dataclass
class CartLoadMatch:
    id: int


@dataclass
class CartListMatch:
    id: Optional[int] = None
    item: Optional[list] = None
    total: Optional[float] = None
    user_id: Optional[int] = None


@dataclass
class Coupon:
    code: Optional[str] = None
    discount: Optional[float] = None
    expiry_date: Optional[str] = None
    id: Optional[int] = None
    type: Optional[str] = None


@dataclass
class CouponLoadMatch:
    id: int


@dataclass
class CouponListMatch:
    code: Optional[str] = None
    discount: Optional[float] = None
    expiry_date: Optional[str] = None
    id: Optional[int] = None
    type: Optional[str] = None


@dataclass
class Product:
    category: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    price: Optional[float] = None


@dataclass
class ProductLoadMatch:
    id: int


@dataclass
class ProductListMatch:
    category: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    price: Optional[float] = None


@dataclass
class Status:
    pass


@dataclass
class StatusLoadMatch:
    id: int


@dataclass
class User:
    email: Optional[str] = None
    first_name: Optional[str] = None
    id: Optional[int] = None
    last_name: Optional[str] = None
    username: Optional[str] = None


@dataclass
class UserLoadMatch:
    id: int


@dataclass
class UserListMatch:
    email: Optional[str] = None
    first_name: Optional[str] = None
    id: Optional[int] = None
    last_name: Optional[str] = None
    username: Optional[str] = None

