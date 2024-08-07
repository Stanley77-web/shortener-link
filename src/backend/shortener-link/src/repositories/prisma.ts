import { Prisma, PrismaClient } from "@prisma/client";
import { urlDecryption, urlEncryption } from "../helpers/urlDecryption";

const prisma = new PrismaClient().$extends({
  query: {
    urlShortener: {
      $allOperations({ operation, args, query }) {
        const hashedOperation = ["create", "update"]
        
        if (hashedOperation.includes(operation)) {
          const createUpdateArgs = args as Prisma.UrlShortenerCreateArgs | Prisma.UrlShortenerUpdateArgs;

          if (createUpdateArgs.data.url) {
            createUpdateArgs.data.url = urlEncryption(createUpdateArgs.data.url as string);
          }
        }

        return query(args);
      }
    }
  },
  result: {
    urlShortener: {
      url: {
        needs: { url: true },
        compute: (value) => urlDecryption(value.url),
      }
    }
  }
});

export default prisma;
