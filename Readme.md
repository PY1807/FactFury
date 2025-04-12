# FactFury - Turning Headlines into Verified Truths

<!-- ![FactFury Logo](https://drive.google.com/file/d/1IOudhrpnu4ADM7oKMXWwNpI-itQbou0f/view?usp=drive_link) -->
<p align="center">
  <img src="logo.png" alt="FactFury Logo" width="300"/>
</p>

## 🛡️ Fighting Misinformation with AI

FactFury is a robust, AI-driven shield against the ever-growing threat of misinformation in today's digital age. With its multimodal capabilities, multilingual support, and deepfake detection, it ensures real-time verification of text, videos, and images—empowering both media platforms and the public with the tools to trust what they see and read.

## 🔍 The Problem

In an age of instant information, misinformation spreads faster than facts. There's a critical need for real-time detection, alerting, and verification tools to combat this growing challenge to public discourse and trust in media.

## 💡 Our Solution: FactFury

FactFury is an AI-powered fact-checking platform that:

- ✅ Detects, flags, and fact-checks text, YouTube videos, deepfake images, and videos
- 🌐 Supports multilingual analysis with focus on Indian languages
- 🔍 Provides clear explanations on why content is flagged
- 🚀 Delivers real-time content integrity verification

## 🛠️ Technical Features

### Multimodal Approach for Text & Video Processing
- **NewsChecker**: Validates facts via external sources
- **StructuredAnalyzer**: Analyzes writing style and grammar patterns
- **SemanticAnalyzer**: Extracts meaning from content using NLP techniques
- **EvidenceVerifier**: Verifies cited references and flags mismatches

### Advanced Deepfake Detection
- **Image Detection**: Uses Inception layers and Skip Connection architecture
- **Video Detection**: Implements Optical Classification, Conv2Plus1D, and MaxPooling techniques

### Innovative Platform Features
- Multi-Lingual News Support (10+ Indian languages)
- Hashtag-Based News Segregation
- YouTube Video Transcription Analysis
- Smart Search by Title
- Deepfake Image/Video Detection

## 🧰 Technology Stack

- **Backend**: Python, Django, NLTK, OpenAI
- **Frontend**: React, TypeScript
- **ML/AI**: TensorFlow, Keras, Hugging Face, Mistral AI
- **Database**: MongoDB
- **Cloud**: AWS(S3)
- **Other Tools**: Scikit-learn, LangChain, Selenium

## 📋 Prerequisites

Before installation, ensure you have the following installed:
- Python 3.8+
- Node.js and npm
- Git

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/zaid1303/FactFury.git
cd FactFury
```

### 2. Install backend dependencies
```bash
pip install -r req.txt
```

### 3. Download large model files
Download the required large files from our Google Drive repository:
```
https://drive.google.com/drive/folders/1ua223UgckyNTIZ01Z4VhYE9hNV0cw8a7?usp=drive_link
```

### 4. Place the large files in their correct locations
The following files need to be placed in specific locations:
```
./Backend/analysepost/FakeNewsDetector/DeepFakeDetection/DeepfakeImageDetection/deepfake_model.h5
./Backend/analysepost/FakeNewsDetector/DeepFakeDetection/DeepfakeVideoDetection/deepfake_video_detection.h5
./Backend/analysepost/FakeNewsDetector/SemanticAndStructuredAnalyzer/Data/Fake.csv
./Backend/analysepost/FakeNewsDetector/SemanticAndStructuredAnalyzer/Data/True.csv
./Backend/glove.6B.100d.txt
./Backend/lstm_model_weights.weights.h5
```

### 5. Configure backend environment
```bash
cd Backend
# Create .env file based on the example provided
cp .env.example .env
# Edit the .env file with your configuration details
```

### 6. Start the backend server
```bash
python manage.py runserver
```

### 7. In a new terminal, set up and start the frontend
```bash
cd FactFury/Frontend
npm i
npm run dev
```

## 🚀 Usage

Once both the backend and frontend servers are running:

1. Navigate to the frontend URL (typically http://localhost:5173)
2. Upload or link to content you want to verify
3. Get instant AI-powered fact checking and analysis

## 🔮 Future Roadmap

- Scale to a larger user base
- Integrate APIs with various broadcasting media
- Add additional relevant features
- Collaborate with government and media organizations for mass adoption

## 👥 Team FactFury

- Priyanshu Yadav
- Mohd Zaid
- Amartya Pawar
- Jyotiraditya Chillal

## 🏆 Acknowledgements

This project was developed as part of the Truth Tell Hackathon 2024-25, supported by:
- WAVES (World Audio Visual & Entertainment Summit)
- ICEA (India Cellular & Electronics Association)
- Ministry of Electronics and Information Technology
- Ministry of Information and Broadcasting
- INDIAai (A NITI Initiative)

## 📄 License

[MIT License](LICENSE)