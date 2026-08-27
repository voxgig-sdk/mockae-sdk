// Typed models for the Mockae SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Cart {
  id?: number
  items?: any[]
  total?: number
  userId?: number
}

export interface CartLoadMatch {
  id: number
}

export interface CartListMatch {
  id?: number
  items?: any[]
  total?: number
  userId?: number
}

export interface Coupon {
  code?: string
  discount?: number
  expiryDate?: string
  id?: number
  type?: string
}

export interface CouponLoadMatch {
  id: number
}

export interface CouponListMatch {
  code?: string
  discount?: number
  expiryDate?: string
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
  id?: string
}

export interface StatusLoadMatch {
  id: number
}

export interface User {
  email?: string
  firstName?: string
  id?: number
  lastName?: string
  username?: string
}

export interface UserLoadMatch {
  id: number
}

export interface UserListMatch {
  email?: string
  firstName?: string
  id?: number
  lastName?: string
  username?: string
}

