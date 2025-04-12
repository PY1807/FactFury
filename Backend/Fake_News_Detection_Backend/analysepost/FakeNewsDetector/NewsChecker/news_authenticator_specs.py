from pydantic import BaseModel,Field
from typing import Literal

class NewsAuthenticatorSpecs(BaseModel):
    news_authenticity:Literal["Real","Fake"]=Field(description="""
    Whether the news Real or Fake.
    """)
    reason:str=Field(description="Reason why the news is authentic or not")