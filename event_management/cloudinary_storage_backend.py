from cloudinary_storage.storage import StaticHashedCloudinaryStorage

class CloudinaryStorage(StaticHashedCloudinaryStorage):
    def url(self, name):
        return self._get_url(name)