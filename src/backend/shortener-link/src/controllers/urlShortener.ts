import UrlShortenerRepository from "../repositories/urlShortener";
import { Request, Response } from "express";
import { getUniqueId } from "../helpers/randomizer";
import { isValidUrl } from "../helpers/validator";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

class UrlShortenerController {
  private urlShortenerRepository: UrlShortenerRepository;

  constructor() {
    this.urlShortenerRepository = new UrlShortenerRepository();

    // Bind all methods
    this.createUrl = this.createUrl.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.getUrls = this.getUrls.bind(this);
    this.directUrl = this.directUrl.bind(this);
    this.updateUrl = this.updateUrl.bind(this);
    this.deleteUrl = this.deleteUrl.bind(this);
  }

  async createUrl(req: Request, res: Response) {
    try {
      const data = req.body;

      if (!isValidUrl(data.url)) {
        return res.status(400).json({ message: "Invalid url" });
      }

      if (data.shortId) {
        const url = await this.urlShortenerRepository.getUrl(data.shortId);
        if (url) {
          return res.status(400).json({ 
            message: "Name already used",
            shortUrl: BASE_URL + "/" + url.shortId,
          });
        }
      } else data.shortId = await getUniqueId();

      const url = await this.urlShortenerRepository.createUrl(data);

      return res.status(201).json({
        message: "Url created successfully",
        shortUrl: BASE_URL + "/" + url.shortId,
      });
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async getUrl(req: Request, res: Response) {
    try {
      const { shortUrl } = req.params;
      const url = await this.urlShortenerRepository.getUrl(shortUrl);
      if (!url) {
        return res.status(404).json({ message: "Url not found" });
      }
      return res.status(200).json(url);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async getUrls(req: Request, res: Response) {
    try {
      const urls = await this.urlShortenerRepository.getUrls();
      return res.status(200).json(urls);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async directUrl(req: Request, res: Response) {
    try {
      const { redirectUrl } = req.params;
      const url = await this.urlShortenerRepository.getUrl(redirectUrl);

      if (!url) {
        return res.status(404).json({ message: "Url not found" });
      }

      url.numberOfVisits = url.numberOfVisits + 1;
      await this.urlShortenerRepository.updateUrl(redirectUrl, url);

      return res.redirect(url.url);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async updateUrl(req: Request, res: Response) {
    try {
      const { shortUrl } = req.params;
      const data = req.body;
      const url = await this.urlShortenerRepository.updateUrl(shortUrl, data);
      return res.status(200).json(url);
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }

  async deleteUrl(req: Request, res: Response) {
    try {
      const { shortUrl } = req.params;
      await this.urlShortenerRepository.deleteUrl(shortUrl);
      return res.status(204).json();
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
}

export default UrlShortenerController;
