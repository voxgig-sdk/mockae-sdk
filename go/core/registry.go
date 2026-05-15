package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewCartEntityFunc func(client *MockaeSDK, entopts map[string]any) MockaeEntity

var NewCouponEntityFunc func(client *MockaeSDK, entopts map[string]any) MockaeEntity

var NewProductEntityFunc func(client *MockaeSDK, entopts map[string]any) MockaeEntity

var NewStatusEntityFunc func(client *MockaeSDK, entopts map[string]any) MockaeEntity

var NewUserEntityFunc func(client *MockaeSDK, entopts map[string]any) MockaeEntity

