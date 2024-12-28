import multer from "multer";
var upload = multer({ storage: multer.memoryStorage() });
export default upload;
