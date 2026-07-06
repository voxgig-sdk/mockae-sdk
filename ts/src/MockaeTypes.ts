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

export interface CartListMatch {
  id?: number
  item?: any[]
  total?: number
  user_id?: number
}

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

export interface CouponListMatch {
  code?: string
  discount?: number
  expiry_date?: string
  id?: number
  type?: string
}

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

export interface ProductListMatch {
  category?: string
  description?: string
  id?: number
  name?: string
  price?: number
}

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

export interface UserListMatch {
  email?: string
  first_name?: string
  id?: number
  last_name?: string
  username?: string
}

