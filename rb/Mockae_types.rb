# frozen_string_literal: true

# Typed models for the Mockae SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Cart entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] item
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Float, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
Cart = Struct.new(
  :id,
  :item,
  :total,
  :user_id,
  keyword_init: true
)

# Request payload for Cart#load.
#
# @!attribute [rw] id
#   @return [Integer]
CartLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Cart#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] item
#   @return [Array, nil]
#
# @!attribute [rw] total
#   @return [Float, nil]
#
# @!attribute [rw] user_id
#   @return [Integer, nil]
CartListMatch = Struct.new(
  :id,
  :item,
  :total,
  :user_id,
  keyword_init: true
)

# Coupon entity data model.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] discount
#   @return [Float, nil]
#
# @!attribute [rw] expiry_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Coupon = Struct.new(
  :code,
  :discount,
  :expiry_date,
  :id,
  :type,
  keyword_init: true
)

# Request payload for Coupon#load.
#
# @!attribute [rw] id
#   @return [Integer]
CouponLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Coupon#list.
#
# @!attribute [rw] code
#   @return [String, nil]
#
# @!attribute [rw] discount
#   @return [Float, nil]
#
# @!attribute [rw] expiry_date
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
CouponListMatch = Struct.new(
  :code,
  :discount,
  :expiry_date,
  :id,
  :type,
  keyword_init: true
)

# Product entity data model.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
Product = Struct.new(
  :category,
  :description,
  :id,
  :name,
  :price,
  keyword_init: true
)

# Request payload for Product#load.
#
# @!attribute [rw] id
#   @return [Integer]
ProductLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Product#list.
#
# @!attribute [rw] category
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] price
#   @return [Float, nil]
ProductListMatch = Struct.new(
  :category,
  :description,
  :id,
  :name,
  :price,
  keyword_init: true
)

# Status entity data model.
class Status
end

# Request payload for Status#load.
#
# @!attribute [rw] id
#   @return [Integer]
StatusLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
User = Struct.new(
  :email,
  :first_name,
  :id,
  :last_name,
  :username,
  keyword_init: true
)

# Request payload for User#load.
#
# @!attribute [rw] id
#   @return [Integer]
UserLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] first_name
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] last_name
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
UserListMatch = Struct.new(
  :email,
  :first_name,
  :id,
  :last_name,
  :username,
  keyword_init: true
)

