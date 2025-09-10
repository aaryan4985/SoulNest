const vision = require('@google-cloud/vision');

class EmotionService {
    constructor() {
        this.client = new vision.ImageAnnotatorClient({
            keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,

        });
    }

    async analyzeEmotionFromImage(imageBuffer) {
        try {
            const [result] = await this.client.faceDetection({
                image: { content: imageBuffer }
            });

            const faces = result.faceAnnotations;

            if (!faces || faces.length === 0) {
                return {
                    emotion: 'neutral',
                    confidence: 0,
                    message: 'No face detected in the image'
                };
            }

            const face = faces[0];
            const dominantEmotion = this.extractDominantEmotion(face);

            return {
                emotion: dominantEmotion.emotion,
                confidence: dominantEmotion.confidence,
                detectedFaces: faces.length,
                allEmotions: this.getAllEmotions(face)
            };

        } catch (error) {
            console.error('Google Vision API error:', error);
            throw new Error('Failed to analyze emotion with Vision API');
        }
    }

    extractDominantEmotion(face) {
        const likelihoodToValue = {
            'VERY_UNLIKELY': 0.1,
            'UNLIKELY': 0.3,
            'POSSIBLE': 0.5,
            'LIKELY': 0.7,
            'VERY_LIKELY': 0.9
        };

        const emotions = {
            joy: likelihoodToValue[face.joyLikelihood] || 0,
            sorrow: likelihoodToValue[face.sorrowLikelihood] || 0,
            anger: likelihoodToValue[face.angerLikelihood] || 0,
            surprise: likelihoodToValue[face.surpriseLikelihood] || 0
        };

        let dominantEmotion = 'neutral';
        let maxLikelihood = 0.4; 

        Object.entries(emotions).forEach(([emotion, likelihood]) => {
            if (likelihood > maxLikelihood) {
                dominantEmotion = emotion;
                maxLikelihood = likelihood;
            }
        });

        const emotionMap = {
            joy: 'happy',
            sorrow: 'sad',
            anger: 'angry',
            surprise: 'excited',
            neutral: 'neutral'
        };

        return {
            emotion: emotionMap[dominantEmotion] || 'neutral',
            confidence: Math.round(maxLikelihood * 100)
        };
    }

    getAllEmotions(face) {
        return {
            joy: face.joyLikelihood,
            sorrow: face.sorrowLikelihood,
            anger: face.angerLikelihood,
            surprise: face.surpriseLikelihood,
            headwear: face.headwearLikelihood,
            blurred: face.blurredLikelihood,
            underExposed: face.underExposedLikelihood,
            confidence: face.detectionConfidence
        };
    }

    getRealLandmarkFeatures(landmarks) {
        const features = {
            eyeOpenness: 0.5,
            smileIntensity: 0,
            mouthOpenness: 0,
            eyebrowPosition: 0.5
        };
        return features;
    }
}

module.exports = new EmotionService();