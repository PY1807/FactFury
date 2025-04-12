import requests

def GetVideoFromURL(url):
    filename = 'video.mp4'
    response = requests.get(url, stream=True)
    with open(filename, 'wb') as f:
        for chunk in response.iter_content(chunk_size=8192):
            if chunk:
                f.write(chunk)

    print("Video file downloaded...")
    return filename