import ImgurStorage from '@trevorblades/multer-storage-imgur';
import multer from 'multer';

const upload = multer({
  storage: ImgurStorage({
    clientId: process.env.IMGUR_CLIENT_ID
  })
});

export default upload.single('file');
