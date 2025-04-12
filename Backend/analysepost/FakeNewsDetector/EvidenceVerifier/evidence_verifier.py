from .get_text_from_link import GetTextFromLink
from .combine_news_article import CombineNewsArticles
from .compare_news_articles import CompareNewsArticles
from .semantic_similarity_between_articles import SemanticSimilarityBetweenArticles
from langchain_mistralai import ChatMistralAI
import os
from dotenv import load_dotenv
load_dotenv()

model = ChatMistralAI(
    model="mistral-large-latest",
    temperature=0,
    max_retries=2,
 api_key=os.environ["MISTRAL_API_KEY"]
)

def EvidenceVerifier(posted_article:str,links:str):
    text=GetTextFromLink(links=links)
    final_news_article=CombineNewsArticles(news_articles=text,model=model)
    result={}
    result=CompareNewsArticles(posted_article=posted_article,supporting_article=final_news_article,model=model)
    semantic_similarity_score=SemanticSimilarityBetweenArticles(posted_article=posted_article,
                                                                supporting_article=final_news_article)

    result["semantic_similarity_score"]=str(semantic_similarity_score)
    return result

