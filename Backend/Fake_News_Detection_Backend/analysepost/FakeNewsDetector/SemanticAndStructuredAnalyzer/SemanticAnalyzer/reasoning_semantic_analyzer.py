import os
import time
from langchain.prompts import ChatPromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_mistralai import ChatMistralAI
from .reasoning_semantic_analyzer_specs import ReasoningSemanticAnalyzerSpecs
from dotenv import load_dotenv
load_dotenv()

def ReasoningSemanticAnalyzer(posted_article:str):
    llm =  ChatMistralAI(
    model="mistral-large-latest",
    temperature=0,
    max_retries=2,
    api_key=os.environ["MISTRAL_API_KEY"]).with_structured_output(ReasoningSemanticAnalyzerSpecs)

    template="""
    You have to analyze the semantic structure of the article and give prediction.
    You are given with the news article.
    Your job is to provide the reason that why such prediction.
    Try to include evidences from the news article and explain how it is contributed in model prediction.
    
    News Article:
    {news_article}
    
    """

    prompt=ChatPromptTemplate.from_template(template=template,
                                            input_variable=["news_article"])

    reasoning_chain=prompt|llm

    response=reasoning_chain.invoke({
        "news_article":posted_article
    })
    result={}
    result["news_authenticity"]=response.news_authenticity
    result["reason"]=response.reason
    

    time.sleep(3)
    return result