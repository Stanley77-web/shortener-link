import { Express } from "express";

import redirectUrl from "./redirectUrl";
import urlShortener from "./urlShortener";
import qrCode from "./qrCode";

function routes(app: Express) {
  app.use("/", redirectUrl);
  app.use("/api/url", urlShortener);
  app.use("/api/qr", qrCode);
}

export default routes;
