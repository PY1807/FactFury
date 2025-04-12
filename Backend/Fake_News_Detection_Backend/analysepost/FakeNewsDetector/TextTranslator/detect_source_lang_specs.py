from pydantic import BaseModel, Field
from typing_extensions import Literal

class DetectSourceLanguageSpecs(BaseModel):
    lang: Literal["English","Hindi","Marathi","Telugu","Tamil","Kannada","Gujarati","Bengali","Odia","Malayalam"]=Field(description="The language present in the text.")