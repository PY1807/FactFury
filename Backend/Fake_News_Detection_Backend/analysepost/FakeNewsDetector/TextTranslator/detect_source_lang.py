import os
from dotenv import load_dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_mistralai import ChatMistralAI
from .detect_source_lang_specs import DetectSourceLanguageSpecs

load_dotenv()

def DetectSourceLanguage(text):
    template="""
    You are provided with a text.
    Your job is to detect the language in the text.
    Text:
    {text}
    Note: Just give the name of detected language and nothing else
    """
    
    llm=ChatMistralAI(
    model="mistral-large-latest",
    temperature=0,
    max_retries=2,
    api_key="cyyuhvxven2BgbLIW9dfZmLkdmftArzN"
    ).with_structured_output(DetectSourceLanguageSpecs)
    
    prompt=ChatPromptTemplate.from_template(template=template,
                                     input_variable=["text"])
    
    lang_detection_chain=prompt|llm
    
    detected_lang=lang_detection_chain.invoke(
        {
            "text":text
        }
    ).lang
    
    return detected_lang

if __name__=="__main__":
    text="मोदी सरकार ने वक्फ बिल से सीधा-सीधा ये मैसेज... जानें कंगना रनौत ने क्या कहा"
    print(DetectSourceLanguage(text=text))
    


    
