package voxgigmockaesdk

import (
	"github.com/voxgig-sdk/mockae-sdk/core"
	"github.com/voxgig-sdk/mockae-sdk/entity"
	"github.com/voxgig-sdk/mockae-sdk/feature"
	_ "github.com/voxgig-sdk/mockae-sdk/utility"
)

// Type aliases preserve external API.
type MockaeSDK = core.MockaeSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type MockaeEntity = core.MockaeEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type MockaeError = core.MockaeError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewCartEntityFunc = func(client *core.MockaeSDK, entopts map[string]any) core.MockaeEntity {
		return entity.NewCartEntity(client, entopts)
	}
	core.NewCouponEntityFunc = func(client *core.MockaeSDK, entopts map[string]any) core.MockaeEntity {
		return entity.NewCouponEntity(client, entopts)
	}
	core.NewProductEntityFunc = func(client *core.MockaeSDK, entopts map[string]any) core.MockaeEntity {
		return entity.NewProductEntity(client, entopts)
	}
	core.NewStatusEntityFunc = func(client *core.MockaeSDK, entopts map[string]any) core.MockaeEntity {
		return entity.NewStatusEntity(client, entopts)
	}
	core.NewUserEntityFunc = func(client *core.MockaeSDK, entopts map[string]any) core.MockaeEntity {
		return entity.NewUserEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewMockaeSDK = core.NewMockaeSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
