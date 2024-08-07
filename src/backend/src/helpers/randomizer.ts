import UrlShortenerRepository from "../repositories/urlShortener";
import { nanoid } from "nanoid";

async function getUniqueId(): Promise<string> {
  const urlShortenerRepository = new UrlShortenerRepository();
  let uniqueId = nanoid(10)

  while (true) {
    const url = await urlShortenerRepository.getUrl(uniqueId);
    if (!url) break;
    uniqueId = nanoid(10);
  }

  return uniqueId;
}

export { getUniqueId };