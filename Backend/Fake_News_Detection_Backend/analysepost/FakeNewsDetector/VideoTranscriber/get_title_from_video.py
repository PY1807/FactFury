import yt_dlp
import json

def GetTitleFromVideo(video_url):
    y=yt_dlp.YoutubeDL()
    with y:
        result=y.extract_info(
            video_url,
            download=False
        )
    title=result["title"]
    return title

