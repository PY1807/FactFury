import json
import string
import os
from .EvidenceVerifier.evidence_verifier import EvidenceVerifier
from .NewsChecker.news_checker import NewsChecker
from .SemanticAndStructuredAnalyzer.SemanticAnalyzer.semantic_analyzer import SemanticAnalyzer
from .SemanticAndStructuredAnalyzer.StructuredAnalyzer.structured_analyzer import StructuredAnalyzer
from .TextTranslator.detect_source_lang import DetectSourceLanguage
from .TextTranslator.translate import translateToEng
from .VideoTranscriber.get_title_from_video import GetTitleFromVideo
from .VideoTranscriber.get_text_from_url import GetTextFromURL

table=str.maketrans("","",string.punctuation)

json_path = os.path.join(os.path.dirname(__file__), "lang_codes.json")
with open(json_path, "r") as file:
    lang_codes = json.load(file)

lang_codes=dict(lang_codes)


def FakeNewsDetectorInVideo(video_url:str):
    title=GetTitleFromVideo(video_url=video_url)
    content=GetTextFromURL(video_url=video_url)
    #Process title:
    processed_title=""
    for word in title.split(" "):
        if word=="|":
            break
        word=word.translate(table)
        if word.isalpha():
            processed_title+=word
            processed_title+=" "
    
    processed_title=processed_title.strip()
    title=processed_title

    
    print(f"title:{title}")
    print(f"content:{content}")
    
    final_results={}
    num_real=0
    num_fake=0
    
    news_checker_results=NewsChecker(posted_article=title)
    structured_analyzer_results=StructuredAnalyzer(posted_article=content)
    semantic_analyzer_results=SemanticAnalyzer(posted_article=content)

    if news_checker_results["news_authenticity"]=="Real":
        num_real+=4

    elif news_checker_results["news_authenticity"]=="Fake":
        num_fake+=4

    if structured_analyzer_results["news_authenticity"]=="Real":
        num_real+=1

    elif structured_analyzer_results["news_authenticity"]=="Fake":
        num_fake+=1

    if semantic_analyzer_results["news_authenticity"]=="Real":
        num_real+=2

    elif semantic_analyzer_results["news_authenticity"]=="Fake":
        num_fake+=2


    final_results["NewsChecker"]=news_checker_results
    final_results["StructureAnalyzer"]=structured_analyzer_results
    final_results["SemanticAnalyzer"]=semantic_analyzer_results

    if num_real>=num_fake:
        final_results["final_result"]=True

    else:
        final_results["final_result"]=False

    return final_results
    
def FakeNewsDetector(title:str,content:str,links):
    src_lng=DetectSourceLanguage(text=title)
    print(f"The detected language is {src_lng}")
    if src_lng!="English":
        lang=lang_codes[src_lng]
        title=translateToEng(text=title,src_lang=lang)
        content=translateToEng(text=content,src_lang=lang)
        
    print(title)
    evidence_verifier_results={}
    final_results={}
    num_real=0
    num_fake=0
    print(f"Link:{links}")
    
    if links:
        evidence_verifier_results=EvidenceVerifier(posted_article=content,links=links)
        if evidence_verifier_results["evidence_comparison"]=="Similar":
            num_real+=3

        else:
            num_fake+=3

    else:
        evidence_verifier_results["remarks"]="Error"
        num_fake+=0

    news_checker_results=NewsChecker(posted_article=title)

    # news_checker_results={}
    structured_analyzer_results=StructuredAnalyzer(posted_article=content)
    semantic_analyzer_results=SemanticAnalyzer(posted_article=content)

    if news_checker_results["news_authenticity"]=="Real":
        num_real+=4

    elif news_checker_results["news_authenticity"]=="Fake":
        num_fake+=4

    if structured_analyzer_results["news_authenticity"]=="Real":
        num_real+=1

    elif structured_analyzer_results["news_authenticity"]=="Fake":
        num_fake+=1

    if semantic_analyzer_results["news_authenticity"]=="Real":
        num_real+=2

    elif semantic_analyzer_results["news_authenticity"]=="Fake":
        num_fake+=2


    final_results["NewsChecker"]=news_checker_results
    final_results["StructureAnalyzer"]=structured_analyzer_results
    final_results["SemanticAnalyzer"]=semantic_analyzer_results
    final_results["EvidenceVerifier"]=evidence_verifier_results

    if num_real>=num_fake:
        final_results["final_result"]=True

    else:
        final_results["final_result"]=False

    return final_results