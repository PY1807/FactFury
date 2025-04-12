import os
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from .entity_extractor_specs import EntityExtractorSpecs
import time
load_dotenv()


def EntityExtractor(news,model):
    llm=model.with_structured_output(EntityExtractorSpecs)

    system_msg="""
    You are given a news.Your job is to extract the important entities from the news.
    """

    prompt=ChatPromptTemplate.from_messages(
        [
            ("system",system_msg),
            ("human","{news}")
        ]
    )

    entity_extractor_chain=prompt|llm
    entities=entity_extractor_chain.invoke({"news":news}).entities
    print("Entities extracted...")
    time.sleep(5)
    return entities

if __name__=="__main__":
    print(EntityExtractor("""
    Delhi Railway station stampede LIVE: 18 dead, several injured; two-member committee formed to probe

    """))
