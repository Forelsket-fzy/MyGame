import express from 'express';
import { updateslide } from "../../controller/slideshowController.js";

const router = express.Router();

router
    .post('/admin/UpdateSlide',updateslide)//修改
    
export default router;