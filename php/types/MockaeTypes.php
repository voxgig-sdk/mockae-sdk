<?php
declare(strict_types=1);

// Typed models for the Mockae SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Cart entity data model. */
class Cart
{
    public ?int $id = null;
    public ?array $item = null;
    public ?float $total = null;
    public ?int $user_id = null;
}

/** Request payload for Cart#load. */
class CartLoadMatch
{
    public int $id;
}

/** Request payload for Cart#list. */
class CartListMatch
{
    public ?int $id = null;
    public ?array $item = null;
    public ?float $total = null;
    public ?int $user_id = null;
}

/** Coupon entity data model. */
class Coupon
{
    public ?string $code = null;
    public ?float $discount = null;
    public ?string $expiry_date = null;
    public ?int $id = null;
    public ?string $type = null;
}

/** Request payload for Coupon#load. */
class CouponLoadMatch
{
    public int $id;
}

/** Request payload for Coupon#list. */
class CouponListMatch
{
    public ?string $code = null;
    public ?float $discount = null;
    public ?string $expiry_date = null;
    public ?int $id = null;
    public ?string $type = null;
}

/** Product entity data model. */
class Product
{
    public ?string $category = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?float $price = null;
}

/** Request payload for Product#load. */
class ProductLoadMatch
{
    public int $id;
}

/** Request payload for Product#list. */
class ProductListMatch
{
    public ?string $category = null;
    public ?string $description = null;
    public ?int $id = null;
    public ?string $name = null;
    public ?float $price = null;
}

/** Status entity data model. */
class Status
{
}

/** Request payload for Status#load. */
class StatusLoadMatch
{
    public int $id;
}

/** User entity data model. */
class User
{
    public ?string $email = null;
    public ?string $first_name = null;
    public ?int $id = null;
    public ?string $last_name = null;
    public ?string $username = null;
}

/** Request payload for User#load. */
class UserLoadMatch
{
    public int $id;
}

/** Request payload for User#list. */
class UserListMatch
{
    public ?string $email = null;
    public ?string $first_name = null;
    public ?int $id = null;
    public ?string $last_name = null;
    public ?string $username = null;
}

