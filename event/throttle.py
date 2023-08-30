from rest_framework.throttling import UserRateThrottle


class RequestEvery10Seconds(UserRateThrottle):
    rate = '1/s'

    def parse_rate(self, rate):
        """
        Given the request rate string, return a two tuple of:
        <allowed number of requests>, <period of time in seconds>

        So we always return a rate for 10 request per 10 minutes.

        Args:
            string: rate to be parsed, which we ignore.

        Returns:
            tuple:  <allowed number of requests>, <period of time in seconds>
        """
        return (1, 10)
