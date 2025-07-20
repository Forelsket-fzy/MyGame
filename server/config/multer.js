import multer from "multer";
import path from "path";

import { fileURLToPath } from 'url';

// 获取当前文件的绝对路径
const __filename = fileURLToPath(import.meta.url);
// 获取当前文件所在目录
const __dirname = path.dirname(__filename);


//multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.resolve(__dirname, 'uploads');
        cb(null, uploadDir);
    }
});

const upload = multer({
    storage: storage,
    // 可以添加文件过滤等其他配置
})

export default upload