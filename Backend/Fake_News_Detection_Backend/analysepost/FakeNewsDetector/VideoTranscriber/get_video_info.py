import yt_dlp
import json

def GetTextURLFromVideo(video_url):
    y=yt_dlp.YoutubeDL()
    with y:
        result=y.extract_info(
            video_url,
            download=False
        )
    text_url=result["automatic_captions"]["en"][1]["url"]
    return text_url

if __name__=="__main__":
    video_url="https://www.youtube.com/watch?v=56ggKOx6GaY"
    text_url=GetTextURLFromVideo(video_url)
    print(text_url)