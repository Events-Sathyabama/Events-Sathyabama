import jwt
from django.conf import settings
from django.utils import timezone


class JWT:
    def __init__(self, exp_time=60, throw_error=False):
        self.exp_time = exp_time
        self.throw_error = throw_error

    def generate_jwt_token(self, data):
        secret_key = settings.SECRET_KEY  
        expiration_time = timezone.now() + timezone.timedelta(seconds=self.exp_time)
        expiration_time = int(expiration_time.timestamp())
        payload = {
            'iat': int(timezone.now().timestamp()),
            'exp': expiration_time,
            'data':data
        }

        token = jwt.encode(payload, secret_key, algorithm='HS256')
        return token

    def decode_jwt_token(self, token):
        secret_key = settings.SECRET_KEY 

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
        except:
            raise "Something Went Wrong"
