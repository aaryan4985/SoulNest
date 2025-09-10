const express = require("express");
const router = express.Router();
const emotionController = require("../controllers/emotionController");
const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

router.post("/analyze", upload.single('image'), emotionController.analyzeEmotion);

module.exports = router;