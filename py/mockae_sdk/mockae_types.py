# Typed models for the Mockae SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Cart(TypedDict, total=False):
    id: int
    items: list
    total: float
    userId: int


class CartLoadMatch(TypedDict):
    id: int


class CartListMatch(TypedDict, total=False):
    id: int
    items: list
    total: float
    userId: int


class Coupon(TypedDict, total=False):
    code: str
    discount: float
    expiryDate: str
    id: int
    type: str


class CouponLoadMatch(TypedDict):
    id: int


class CouponListMatch(TypedDict, total=False):
    code: str
    discount: float
    expiryDate: str
    id: int
    type: str


class Product(TypedDict, total=False):
    category: str
    description: str
    id: int
    name: str
    price: float


class ProductLoadMatch(TypedDict):
    id: int


class ProductListMatch(TypedDict, total=False):
    category: str
    description: str
    id: int
    name: str
    price: float


class Status(TypedDict, total=False):
    id: str


class StatusLoadMatch(TypedDict):
    id: int


class User(TypedDict, total=False):
    email: str
    firstName: str
    id: int
    lastName: str
    username: str


class UserLoadMatch(TypedDict):
    id: int


class UserListMatch(TypedDict, total=False):
    email: str
    firstName: str
    id: int
    lastName: str
    username: str
