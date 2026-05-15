<?php
declare(strict_types=1);

// Mockae SDK utility: result_headers

class MockaeResultHeaders
{
    public static function call(MockaeContext $ctx): ?MockaeResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
