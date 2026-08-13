# Mockae SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

MockaeUtility.registrar = ->(u) {
  u.clean = MockaeUtilities::Clean
  u.done = MockaeUtilities::Done
  u.make_error = MockaeUtilities::MakeError
  u.feature_add = MockaeUtilities::FeatureAdd
  u.feature_hook = MockaeUtilities::FeatureHook
  u.feature_init = MockaeUtilities::FeatureInit
  u.fetcher = MockaeUtilities::Fetcher
  u.make_fetch_def = MockaeUtilities::MakeFetchDef
  u.make_context = MockaeUtilities::MakeContext
  u.make_options = MockaeUtilities::MakeOptions
  u.make_request = MockaeUtilities::MakeRequest
  u.make_response = MockaeUtilities::MakeResponse
  u.make_result = MockaeUtilities::MakeResult
  u.make_point = MockaeUtilities::MakePoint
  u.make_spec = MockaeUtilities::MakeSpec
  u.make_url = MockaeUtilities::MakeUrl
  u.param = MockaeUtilities::Param
  u.prepare_auth = MockaeUtilities::PrepareAuth
  u.prepare_body = MockaeUtilities::PrepareBody
  u.prepare_headers = MockaeUtilities::PrepareHeaders
  u.prepare_method = MockaeUtilities::PrepareMethod
  u.prepare_params = MockaeUtilities::PrepareParams
  u.prepare_path = MockaeUtilities::PreparePath
  u.prepare_query = MockaeUtilities::PrepareQuery
  u.graphql_body = MockaeUtilities::GraphqlBody
  u.graphql_errors = MockaeUtilities::GraphqlErrors
  u.result_basic = MockaeUtilities::ResultBasic
  u.result_body = MockaeUtilities::ResultBody
  u.result_headers = MockaeUtilities::ResultHeaders
  u.transform_request = MockaeUtilities::TransformRequest
  u.transform_response = MockaeUtilities::TransformResponse
}
