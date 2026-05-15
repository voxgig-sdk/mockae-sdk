<?php
declare(strict_types=1);

// Mockae SDK exists test

require_once __DIR__ . '/../mockae_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = MockaeSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
