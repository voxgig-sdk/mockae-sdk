# Mockae Golang SDK



The Golang SDK for the Mockae API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Cart(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/mockae-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/mockae-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/mockae-sdk/go=../mockae-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/mockae-sdk/go"
)

func main() {
    client := sdk.New()

    // List cart records — the value is the array of records itself.
    carts, err := client.Cart(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range carts.([]any) {
        fmt.Println(item)
    }

    // Load a single cart — the value is the loaded record.
    cart, err := client.Cart(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(cart)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
carts, err := client.Cart(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = carts
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

cart, err := client.Cart(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(cart) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewMockaeSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
MOCKAE_TEST_LIVE=TRUE
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewMockaeSDK

```go
func NewMockaeSDK(options map[string]any) *MockaeSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *MockaeSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### MockaeSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Cart` | `(data map[string]any) MockaeEntity` | Create a Cart entity instance. |
| `Coupon` | `(data map[string]any) MockaeEntity` | Create a Coupon entity instance. |
| `Product` | `(data map[string]any) MockaeEntity` | Create a Product entity instance. |
| `Status` | `(data map[string]any) MockaeEntity` | Create a Status entity instance. |
| `User` | `(data map[string]any) MockaeEntity` | Create an User entity instance. |

### Entity interface (MockaeEntity)

All entities implement the `MockaeEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    cart, err := client.Cart(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // cart is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Cart

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"item"` |  |
| `"total"` |  |
| `"user_id"` |  |

Operations: List, Load.

API path: `/carts`

#### Coupon

| Field | Description |
| --- | --- |
| `"code"` |  |
| `"discount"` |  |
| `"expiry_date"` |  |
| `"id"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/coupons`

#### Product

| Field | Description |
| --- | --- |
| `"category"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"price"` |  |

Operations: List, Load.

API path: `/products`

#### Status

| Field | Description |
| --- | --- |

Operations: Load.

API path: `/status/{statusCode}`

#### User

| Field | Description |
| --- | --- |
| `"email"` |  |
| `"first_name"` |  |
| `"id"` |  |
| `"last_name"` |  |
| `"username"` |  |

Operations: List, Load.

API path: `/users`



## Entities


### Cart

Create an instance: `cart := client.Cart(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `item` | `[]any` |  |
| `total` | `float64` |  |
| `user_id` | `int` |  |

#### Example: Load

```go
cart, err := client.Cart(nil).Load(map[string]any{"id": "cart_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(cart) // the loaded record
```

#### Example: List

```go
carts, err := client.Cart(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(carts) // the array of records
```


### Coupon

Create an instance: `coupon := client.Coupon(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `code` | `string` |  |
| `discount` | `float64` |  |
| `expiry_date` | `string` |  |
| `id` | `int` |  |
| `type` | `string` |  |

#### Example: Load

```go
coupon, err := client.Coupon(nil).Load(map[string]any{"id": "coupon_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(coupon) // the loaded record
```

#### Example: List

```go
coupons, err := client.Coupon(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(coupons) // the array of records
```


### Product

Create an instance: `product := client.Product(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `category` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `price` | `float64` |  |

#### Example: Load

```go
product, err := client.Product(nil).Load(map[string]any{"id": "product_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(product) // the loaded record
```

#### Example: List

```go
products, err := client.Product(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(products) // the array of records
```


### Status

Create an instance: `status := client.Status(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Example: Load

```go
status, err := client.Status(nil).Load(map[string]any{"id": "status_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(status) // the loaded record
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `email` | `string` |  |
| `first_name` | `string` |  |
| `id` | `int` |  |
| `last_name` | `string` |  |
| `username` | `string` |  |

#### Example: Load

```go
user, err := client.User(nil).Load(map[string]any{"id": "user_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(user) // the loaded record
```

#### Example: List

```go
users, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(users) // the array of records
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/mockae-sdk/go/
├── mockae.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/mockae-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
cart := client.Cart(nil)
cart.List(nil, nil)

// cart.Data() now returns the cart data from the last list
// cart.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
