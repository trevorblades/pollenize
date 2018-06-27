import ImgurStorage from 'multer-storage-imgur';
import multer from 'multer';

const storage = ImgurStorage({clientId: process.env.IMGUR_CLIENT_ID});
const upload = multer({storage});
export default upload.single('file');
