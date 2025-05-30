import os
from .entity_extractor import EntityExtractor
from .generate_news_search import NewsSearchGenerator
from .select_best_news_query import SelectBestNewsSearch
from .Authenticate_News_Sources.scraping_news_from_web import ScrapeNewsFromWeb
from .calculate_similarity_score import CalSimilarityScore
from .merging_retrieved_articles import MergingRetrievedArticles
from .news_authenticator import NewsAuthenticator
from langchain_mistralai import ChatMistralAI
# from langchain_mistralai import MistralAIEmbeddings
from dotenv import load_dotenv
load_dotenv()

model = ChatMistralAI(
    model="mistral-large-latest",
    temperature=0,
    max_retries=2,
 api_key=os.environ["MISTRAL_API_KEY"]
)

# embedding_model = MistralAIEmbeddings(
#     model="mistral-embed",
#
#
#  api_key=os.environ["MISTRAL_API_KEY"]
# )


def NewsChecker(posted_article:str,similarity_threshold=0.70):
    # extracted_entities=EntityExtractor(posted_article,model)
    # news_search_query=NewsSearchGenerator(extracted_entities,model)
    # best_news_search_query=SelectBestNewsSearch(news_search_query,model)
    scraped_news_articles=ScrapeNewsFromWeb(posted_article)
    scraped_news_articles_with_similarity_score=CalSimilarityScore(posted_article,scraped_news_articles)
    print(f"Scraped News articles:{scraped_news_articles}")
    real_news_articles=[]

    for article,sim_score in scraped_news_articles_with_similarity_score.items():
        if sim_score>=similarity_threshold:
            real_news_articles.append(article)

    merged_real_news_article=MergingRetrievedArticles(real_news_articles,model)
    news_authenticity_report=NewsAuthenticator(posted_article=posted_article,real_article=merged_real_news_article,model=model)
    news_authenticity_report["remarks"]="Done"
    print("News Checker Completed....")
    return news_authenticity_report


if __name__=="main_":
    posted_article="Delhi Station Stampede: 180 Dead, Families' Desperate Search For Loved Ones"
    news_authenticity_report=NewsChecker(posted_article=posted_article)
    print(news_authenticity_report)