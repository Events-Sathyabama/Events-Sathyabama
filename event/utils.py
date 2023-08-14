from io import BytesIO  #basic input/output operation
from PIL import Image #Imported to compress images
from django.core.files import File #to store files

def compress(image):
    return image
    if image is None:
        return None   
    im = Image.open(image)   
    im_io = BytesIO()     
    im.save(im_io, 'JPEG', quality=60)     
    new_image = File(im_io, name=image.name)    
    return new_image