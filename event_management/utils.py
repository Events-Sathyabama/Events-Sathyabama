import jwt
from datetime import datetime, timedelta
from django.conf import settings


class JWT:
    def __init__(self, exp_time=60, throw_error=False):
        self.exp_time = exp_time
        self.throw_error = throw_error

    def generate_jwt_token(self, data):
        secret_key = settings.SECRET_KEY  # Replace with your own secret key
        expiration_time = datetime.utcnow() + timedelta(seconds=self.exp_time)

        payload = {
            'iat': datetime.utcnow().isoformat(),
            'exp': expiration_time.isoformat(),
            'data':data
        }

        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return token

    def decode_jwt_token(self, token):
        secret_key = 'your_secret_key'  # Replace with your own secret key

        try:
            decoded_payload = jwt.decode(token, secret_key, algorithms=['HS256'])
            return decoded_payload['data']
        except jwt.ExpiredSignatureError:
            if self.throw_error:
                raise "Token Expired"
            return None
        except jwt.InvalidTokenError:
            if self.throw_error:
                raise "Invalid Token"
            return None
