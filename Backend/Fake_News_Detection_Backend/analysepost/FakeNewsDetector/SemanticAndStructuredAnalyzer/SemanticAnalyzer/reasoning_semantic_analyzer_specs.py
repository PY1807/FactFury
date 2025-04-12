from pydantic import BaseModel,Field
from typing import Literal

class ReasoningSemanticAnalyzerSpecs(BaseModel):
    news_authenticity:Literal["Real","Fake"]=Field(description="""
  Whether the provided news article is Real or Fake.
""")
    reason:str=Field(description="""
    Reason why the model has generated such response.
    """)