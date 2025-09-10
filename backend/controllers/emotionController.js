const emotionService = require("../utils/emotion_service");

const emotionController = {
    analyzeEmotion: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No image file provided"
                });
            }

            const imageBuffer = req.file.buffer;

            const result = await emotionService.analyzeEmotionFromImage(imageBuffer);

            res.json({
                success: true,
                data: result
            });

        } catch (error) {
            console.error("Error in emotion analysis:", error);

            res.status(500).json({
                success: false,
                message: "Failed to analyze emotion. Please try again.",
                error: process.env.NODE_ENV === 'development' ? error.message : undefined
            });
        }
    }
};

module.exports = emotionController;