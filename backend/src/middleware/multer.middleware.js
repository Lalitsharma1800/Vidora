import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const video_storage = multer.memoryStorage();
export const upload_video_and_thumbnail = multer({
  limit: { fileSize: 20 * 1024 * 1024 },
  storage: video_storage,
});

export const upload = multer({ storage });
