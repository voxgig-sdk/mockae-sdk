package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Mockae",
			"slug": "mockae",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.mockae.com/fakeapi",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"cart": map[string]any{},
				"coupon": map[string]any{},
				"product": map[string]any{},
				"status": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"cart": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Cart ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "items",
						"short": "Items in the cart",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "total",
						"short": "Total cart value",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "userId",
						"short": "User ID who owns the cart",
						"type": "`$INTEGER`",
					},
				},
				"name": "cart",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/carts",
								"parts": []any{
									"carts",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/carts/{id}",
								"parts": []any{
									"carts",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"coupon": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "code",
						"short": "Coupon code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "discount",
						"short": "Discount percentage or amount",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "expiryDate",
						"short": "Coupon expiry date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Coupon ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of discount (percentage or fixed)",
						"type": "`$STRING`",
					},
				},
				"name": "coupon",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/coupons",
								"parts": []any{
									"coupons",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/coupons/{id}",
								"parts": []any{
									"coupons",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"product": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "category",
						"short": "Product category",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Product description",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Product ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Product name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "price",
						"short": "Product price",
						"type": "`$NUMBER`",
					},
				},
				"name": "product",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/products",
								"parts": []any{
									"products",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/products/{id}",
								"parts": []any{
									"products",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"status": map[string]any{
				"fields": []any{},
				"name": "status",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 403,
											"kind": "param",
											"name": "id",
											"orig": "status_code",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/status/{statusCode}",
								"parts": []any{
									"status",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"statusCode": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "email",
						"short": "User email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstName",
						"short": "User's first name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "User ID",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "lastName",
						"short": "User's last name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "username",
						"short": "Username",
						"type": "`$STRING`",
					},
				},
				"name": "user",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/users",
								"parts": []any{
									"users",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/users/{id}",
								"parts": []any{
									"users",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
