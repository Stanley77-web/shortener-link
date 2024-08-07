import express from 'express';
import QrCodeController from '../controllers/qrCode';

const qrCodeController = new QrCodeController();
const router = express.Router();

router.post('/', qrCodeController.generateQrCode);

export default router;