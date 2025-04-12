import requests
from .get_video_info import GetTextURLFromVideo
import xml.etree.ElementTree as ET

def GetTextFromURL(video_url):
    text_url=GetTextURLFromVideo(video_url=video_url)
    respone=requests.get(text_url)
    if respone.status_code==200:
        root = ET.fromstring(respone.text)
        
        extracted_text = []

        for text_element in root.findall("text"):
            if text_element.text:  # Ensure text is not None
                extracted_text.append(text_element.text.strip())

        print("Text extracted successfully from url....")
        return " ".join(extracted_text)
    
    else:
        print("Failed to extract text from url...")
        
        
if __name__=="__main__":
    print(GetTextFromURL(video_url="https://www.youtube.com/watch?v=fGqxiosEIBE"))