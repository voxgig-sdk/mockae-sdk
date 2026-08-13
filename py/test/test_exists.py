# Mockae SDK exists test

import pytest
from mockae_sdk import MockaeSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = MockaeSDK.test(None, None)
        assert testsdk is not None
