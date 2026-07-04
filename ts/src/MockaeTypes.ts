// Typed models for the Mockae SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cart {
  id?: number
  item?: any[]
  total?: number
  user_id?: number
}

export interface CartLoadMatch {
  id: number
}

export type CartListMatch = Partial<Cart>

export interface Coupon {
  code?: string
  discount?: number
  expiry_date?: string
  id?: number
  type?: string
}

export interface CouponLoadMatch {
  id: number
}

export type CouponListMatch = Partial<Coupon>

export interface Product {
  category?: string
  description?: string
  id?: number
  name?: string
  price?: number
}

export interface ProductLoadMatch {
  id: number
}

export type ProductListMatch = Partial<Product>

export interface Status {
}

export interface StatusLoadMatch {
  id: number
}

export interface User {
  email?: string
  first_name?: string
  id?: number
  last_name?: string
  username?: string
}

export interface UserLoadMatch {
  id: number
}

export type UserListMatch = Partial<User>

