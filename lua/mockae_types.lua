-- Typed models for the Mockae SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Cart
---@field id? number
---@field item? table
---@field total? number
---@field user_id? number

---@class CartLoadMatch
---@field id number

---@class CartListMatch

---@class Coupon
---@field code? string
---@field discount? number
---@field expiry_date? string
---@field id? number
---@field type? string

---@class CouponLoadMatch
---@field id number

---@class CouponListMatch

---@class Product
---@field category? string
---@field description? string
---@field id? number
---@field name? string
---@field price? number

---@class ProductLoadMatch
---@field id number

---@class ProductListMatch

---@class Status

---@class StatusLoadMatch
---@field id number

---@class User
---@field email? string
---@field first_name? string
---@field id? number
---@field last_name? string
---@field username? string

---@class UserLoadMatch
---@field id number

---@class UserListMatch

local M = {}

return M
