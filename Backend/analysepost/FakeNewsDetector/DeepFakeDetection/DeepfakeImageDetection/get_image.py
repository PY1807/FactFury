import urllib.request

def GetImage(url):
    
    img_path = "img.jpg"

    try:
        urllib.request.urlretrieve(url, img_path)
        print("Image downlaoded successfully...")
        return img_path


    except Exception as e:
        print(e)
        return None