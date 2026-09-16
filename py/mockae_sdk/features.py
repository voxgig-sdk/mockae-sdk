# Mockae SDK feature factory

from mockae_sdk.feature.base_feature import MockaeBaseFeature
from mockae_sdk.feature.ratelimit_feature import MockaeRatelimitFeature
from mockae_sdk.feature.retry_feature import MockaeRetryFeature
from mockae_sdk.feature.test_feature import MockaeTestFeature
from mockae_sdk.feature.timeout_feature import MockaeTimeoutFeature


_FEATURES = {
    "base": lambda: MockaeBaseFeature(),
    "ratelimit": lambda: MockaeRatelimitFeature(),
    "retry": lambda: MockaeRetryFeature(),
    "test": lambda: MockaeTestFeature(),
    "timeout": lambda: MockaeTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
