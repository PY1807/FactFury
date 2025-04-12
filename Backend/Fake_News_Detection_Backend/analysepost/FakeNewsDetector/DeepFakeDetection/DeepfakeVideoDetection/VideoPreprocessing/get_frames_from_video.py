import numpy as np
import cv2 as cv
import random
from .format_frames import FormatFrames

def GetFrameFromVideo(video_path,n_frames=16,output_shape=[128,128],frame_step=25):
    result=[]

    src=cv.VideoCapture(str(video_path))
    video_length=src.get(cv.CAP_PROP_FRAME_COUNT) 
    need_length=1+(n_frames-1)*frame_step

    # if need_length>video_length:
    start=0
 
    # 
    

    src.set(cv.CAP_PROP_POS_FRAMES,start)

    ret,frame=src.read()
    result.append(FormatFrames(frame=frame,output_shape=output_shape))

    for _ in range(n_frames-1):
        for _ in range(frame_step):
            ret,frame=src.read()

        if ret:
            result.append(FormatFrames(frame=frame,output_shape=output_shape))

        else:
            result.append(np.zeros_like(result[0]))


    result=np.array(result)
    result=result[...,[2,1,0]]
    result=np.expand_dims(result,axis=0)
    return result