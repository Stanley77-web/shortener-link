import express from 'express';
import UrlShortenerController from '../controllers/urlShortener';

const urlShortenerController = new UrlShortenerController();
const router = express.Router();

router.get('/:redirectUrl', urlShortenerController.directUrl);

export default router;
