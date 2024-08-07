import prisma from "./prisma";
import { UrlShortener } from "../constant/types";

class UrlShortenerRepository {
  async createUrl(data: UrlShortener) {
    return prisma.urlShortener.create({
      data,
    }); 
  }

  async getUrl(shortId: string) {
    return prisma.urlShortener.findUnique({
      where: {
        shortId,
      },
    });
  }

  async getUrls() {
    return prisma.urlShortener.findMany();
  }

  async updateUrl(shortId: string, data: UrlShortener) {
    return prisma.urlShortener.update({
      where: {
        shortId,
      },
      data,
    });
  }

  async deleteUrl(shortId: string) {
    return prisma.urlShortener.delete({
      where: {
        shortId,
      },
    });
  }
}

export default UrlShortenerRepository;
