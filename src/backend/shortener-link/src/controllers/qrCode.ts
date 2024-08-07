import { Request, Response } from "express";
import { isValidUrl } from "../helpers/validator";
import QRCode from "qrcode";

class QrCodeController {
  async generateQrCode(req: Request, res: Response) {
    try {
      const { url } = req.body;
    
      if (!isValidUrl(url)) {
        return res.status(400).json({ message: "Invalid url" });
      }
    
      const qrCode = await QRCode.toDataURL(url);
    
      return res.status(200).json({ qrCode });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default QrCodeController;
