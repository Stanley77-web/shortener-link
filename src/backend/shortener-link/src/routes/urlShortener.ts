import express from 'express';
import UrlShortenerController from '../controllers/urlShortener';

const urlShortenerController = new UrlShortenerController();
const router = express.Router();

router.post('/', urlShortenerController.createUrl);
router.get('/list', urlShortenerController.getUrls);
router.get('/:shortUrl', urlShortenerController.getUrl);
router.put('/:shortUrl', urlShortenerController.updateUrl);
router.delete('/:shortUrl', urlShortenerController.deleteUrl);

export default router;
