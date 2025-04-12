from .models import User,Post
from django.shortcuts import render
from .models import Signup,Post1
import datetime
from django.http import JsonResponse,HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth.hashers import make_password,check_password
import json
import re
from django.core import serializers
from django.utils import timezone
from django.core.mail import send_mail
from django.conf import settings
import time
from .utils import generate_token
from .utils import extract_mobile_number,verify_jwt,sentiment_analysis
from nltk.corpus import stopwords
import boto3
import os
import time
from botocore.exceptions import BotoCoreError, NoCredentialsError
from dotenv import load_dotenv
from .FakeNewsDetector.main import FakeNewsDetector
from .FakeNewsDetector.NewsChecker.news_checker import NewsChecker
from .FakeNewsDetector.DeepFakeDetection.DeepfakeImageDetection.deepfake_image_detection import DeepFakeImageDetection
from .FakeNewsDetector.DeepFakeDetection.DeepfakeVideoDetection.deepfake_video_detection import DeepFakeVideoDetection
from .FakeNewsDetector.main import FakeNewsDetectorInVideo
from dotenv import load_dotenv
load_dotenv()
def index(request):
  return render(request,'index.html')
@api_view(['GET'])
def get_all_posts(request):
    print("request aayi")
    
    token = request.headers.get('Authorization', "")

    result=verify_jwt(token)
    result = json.loads(result.content) 
    if("data" not in result.keys()):
        return JsonResponse(result)
    
    posts_cursor = Post.find({})
    
    
    posts_list = list(posts_cursor)
    
  
    formatted_posts = []
    for post in posts_list:
        not_required=['_id','text','urls','hashtags'] 
        post_data = {key: value for key, value in post.items() if key not in not_required}  # 
        formatted_posts.append(post_data)
    
    # print("Output", formatted_posts)
   
    
    return JsonResponse({"posts": formatted_posts})

@api_view(['GET'])
def get_trending_posts(request):
    token = request.headers.get('Authorization', "")

    result=verify_jwt(token)
    result = json.loads(result.content) 
    if("data" not in result.keys()):
        return JsonResponse(result)
    posts = Post.find({})
    mp = {}


    for post in posts:
     for hashtag in post['hashtags']:
        mp[hashtag] = mp.get(hashtag, 0) + 1


    top_5_hashtags = [
    {"hashtag": key, "count": value}
    for key, value in sorted(mp.items(), key=lambda item: item[1], reverse=True)[:5]
]

    return JsonResponse({"trending_posts": top_5_hashtags})



@api_view(['GET'])
def getpost_from_hashtag(request):
    hashtag = request.GET.get('query', '')
    token = request.headers.get('Authorization', "")
    hashtag = "#" + hashtag

    result=verify_jwt(token)
    result = json.loads(result.content) 
    if("data" not in result.keys()):
        return JsonResponse(result)

    posts = Post.find({})
    store = []
    for post in posts:
        if hashtag in post['hashtags']:
            not_required=['_id','text','urls','hashtags'] 
            post_data = {key: value for key, value in post.items() if key not in not_required} 
            store.append(post_data)

    return JsonResponse({"posts": store}, safe=False)
@api_view(['POST'])
def signup_user(request):
    
    data = json.loads(request.body) 
    
    contact_no = data.get('contact_number')
    print(contact_no)
    check_user=User.find_one({"contact_number":contact_no})
    if check_user:
        return JsonResponse({"status": "unsuccessful", "message": "A person with the same mobile number exists"})
    
    
    hashed_password = make_password(data.get('password'))
    
    curr = time.time()
    user = Signup(
        name=data.get('name'),
        
        email=data.get('email'),
        password=hashed_password,
        contact_number=data.get('contact_number'),
        date_joined=time.ctime(curr)
    )
    user_dict = user.to_dict()
    print("Ab aayega")
    print(user_dict)
    contact=data.get('contact_number')
    token=generate_token(contact)
   
    User.insert_one(user_dict)

   
    return JsonResponse({"status": "successful", "message": "Person registered","token":token})


@api_view(['POST'])
def create_post(request):

    data=json.loads(request.body)
    token = request.headers.get('Authorization', "")

    result=verify_jwt(token)
    result = json.loads(result.content) 
    if("data" not in result.keys()):
        return JsonResponse(result)
    mobile_number=result["data"]["mobile"]
    check_user=User.find_one({"contact_number":mobile_number})
    if not check_user:
        return JsonResponse({"status": "unsuccessful", "message": "User not found"})
    
   
    content = data.get('content', '')
    
   
    hashtags = re.findall(r'#\w+', content)   
    
    
    urls = re.findall(r'(https?://\S+|ftp://\S+|www\.\S+)', content) 
    print(f"Urls:{urls}") 
    
   
    content_cleaned = re.sub(r'#\w+', '', content)  
    content_cleaned = re.sub(r'(https?://\S+|ftp://\S+|www\.\S+)', '', content_cleaned)  # 
    
    curr =time.time()
    name=check_user['name']
    dict = {
    "title": data.get("title", ""),
    "content": data.get("content", ""),
    "urls": urls
    }
    model_response=FakeNewsDetector(
        title=dict["title"],
        content=dict["content"],
        links=dict["urls"]
    )
    final_result=model_response.pop("final_result")
    # result=sentiment_analysis(content)
    # user_instance=str(user_instance)
    # print(" dnj",user_instance)
    # model_final_resp=json.loads(model_response)
    print(model_response)
    post = Post1(
        name=name,
        title=data.get('title',''),
        content=data.get('content',''),
        text=content_cleaned.strip(), 
        result=model_response,
        final_result=final_result,
        hashtags=hashtags,
        urls=urls,
        created_at=time.ctime(curr)
    )
    post_dict = post.to_dict()
 
    Post.insert_one(post_dict)

    return JsonResponse({"status": "successful", "message": "Post created successfully"})
@api_view(['POST'])
def login_user(request):
    data=json.loads(request.body)
    mobile_no=data.get('contact_number')
    password=data.get('password')
    
    # token=generate_token(mobile_no)
    user=User.find_one({"contact_number":mobile_no})
    if user:
        if check_password(password,user['password']):
            token=generate_token(mobile_no)
            return JsonResponse({"status": "successful", "message": "Person logged-in","token":token})
        else:
            return JsonResponse({"status": "unsuccessful", "message": "Incorrect password"})

    else:
        return JsonResponse({"status":"User does not exist",})

@api_view(['POST'])
def auth(request):

    
    
    token = request.headers.get('Authorization', "")
   
    result=verify_jwt(token)
    result = json.loads(result.content) 
    if("data" not in result.keys()):
        return JsonResponse(result)
    mobile_number=result["data"]["mobile"]
    user=User.find_one({"contact_number":mobile_number})
    
    if user:
        result["name"] = user.get("name", "")
    
    return JsonResponse(result)

@api_view(['GET'])
def search(request):
    token = request.headers.get('Authorization', "")
    result = verify_jwt(token)
    result = json.loads(result.content) 
    
    if "data" not in result.keys():
        return JsonResponse(result)
    
    text = request.GET.get('query', '')
    # print(text)
    stop_words = set(stopwords.words('english'))
    filtered_words = [word for word in text.split() if word.lower() not in stop_words]

    if not filtered_words:
        return JsonResponse({"posts": []})
    
    # Combine title and content queries into a single query
    combined_queries = []
    for word in filtered_words:
        combined_queries.extend([
            {"title": {"$regex": word, "$options": "i"}},
            {"content": {"$regex": word, "$options": "i"}}
        ])
    
    # Use a single database query with combined conditions
    posts = Post.find({"$or": combined_queries})
    
    # Use a dictionary with post ID as key to ensure uniqueness
    unique_posts = {}
    for post in posts:
        post_id = str(post.get('_id'))  # Convert ObjectId to string
        if post_id not in unique_posts:
            post_data = {key: value for key, value in post.items() if key != '_id'}
            unique_posts[post_id] = post_data
    
    # Convert the dictionary values to list for the response
    formatted_posts = list(unique_posts.values())
    
    return JsonResponse({"posts": formatted_posts})

@api_view(['GET'])
def verify(request):
    token=request.headers.get('Authorization',"")
    result=verify_jwt(token)
    result=json.loads(result.content)
    if "data" not in result:
        return result
    # data=json.loads(request.body)
    # urls=[]
    title= request.GET.get('title', '')
    content= request.GET.get('content', '')
    print(title)
    urls = re.findall(r'(https?://\S+|ftp://\S+|www\.\S+)', content) 
    print(urls)
    model_response = FakeNewsDetector(
        title=title,
        content=content,
        links=urls
    )
    # result=NewsChecker(posted_article=text)
    return JsonResponse({"result":model_response})


@api_view(['GET'])
def get_fake_posts(request):
    token = request.headers.get('Authorization', "")

    result = verify_jwt(token)
    result = json.loads(result.content)
    if ("data" not in result.keys()):
        return JsonResponse(result)

    posts_cursor = Post.find({})

    posts_list = list(posts_cursor)

    formatted_posts = []
    for post in posts_list:
        if "final_result" in post.keys():
            if not post['final_result']:
                not_required = ['_id', 'text', 'urls', 'hashtags', 'final']
                post_data = {key: value for key, value in post.items() if key not in not_required}  #
                formatted_posts.append(post_data)

    return JsonResponse({"posts": formatted_posts})

load_dotenv()

# Initialize S3 client
s3_client = boto3.client(
    's3',
    region_name=os.getenv('AWS_REGION'),
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
    aws_secret_access_key=os.getenv('AWS_SECRET_KEY')
)

BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
@api_view(['POST'])
def get_upload_url(request):
    # token=req.headers.get('Authorization',"")
    # result=verify_jwt(token)
    # result=json.loads(result.content)
    # if "data" not in result:
    #     return result
    try:
        data = request.data
        file_name = data.get('fileName')
        file_type = data.get('fileType')
        print(file_name)
        print(file_type)
        
        if not file_name or not file_type:
            return JsonResponse({'error': 'fileName and fileType are required'}, status=400)

       
        key = f"uploads/{int(time.time())}-{file_name}"

        # Generate a pre-signed URL for S3 upload
        presigned_url = s3_client.generate_presigned_url(
            'put_object',
            Params={'Bucket': BUCKET_NAME, 'Key': key, 'ContentType': file_type},
            ExpiresIn=300  # URL expires in 5 minutes
        )

        # Construct the public file URL
        file_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{key}"

        return JsonResponse({'presignedUrl': presigned_url, 'fileUrl': file_url}, status=200)

    except Exception as e:
          return JsonResponse({'error': 'Failed to generate upload URL', 'message': str(e)}, status=500)

@api_view(['POST'])
def verify_media(request):
    
    token = request.headers.get('Authorization', "")
    result = verify_jwt(token)
    result = json.loads(result.content) 
    
    if "data" not in result.keys():
        return JsonResponse(result)
    print("req")
   
    print("ab")
    data = request.data
    print("ab2")
    file_name = data.get('mediaUrl')
    file_type = data.get('mediaType')
    print(file_name)
    print(file_type)
    
    if not file_name or not file_type:
        return JsonResponse({'error': 'fileName and fileType are required'}, status=400)
    # file=get_upload_url(file_type,file_name)
    # # print("file url:", file_url)
    # file_url1="https://factfury-file.s3.us-east-1.amazonaws.com/uploads/1742668996004-1742668995981-adhaar.jpg"
    if file_type=="image":
        res=DeepFakeImageDetection(file_name)
    else:
        res=DeepFakeVideoDetection(file_name)
        
    
    print(res)
    ans=json.dumps(res)
    return JsonResponse({'Result':ans}, status=200)

    """ except Exception as e:
          return JsonResponse({'error': 'Failed to generate upload URL', 'message': str(e)}, status=500) """
      
@api_view(['GET'])
def verify_youtube(request):
    token = request.headers.get('Authorization', "")
    result = verify_jwt(token)
    result = json.loads(result.content) 
    
    if "data" not in result.keys():
        return JsonResponse(result)
    # data=request.data
    youtube_url = request.GET.get('video_url', '')
    
    res=FakeNewsDetectorInVideo(youtube_url)
    print(res)
    ans=json.dumps(res)
    return JsonResponse({'Result':ans}, status=200)  