import cryptojs from "crypto-js";

const secret = process.env.CRYPTO_SECRET || "secret";

function urlEncryption(url: string) {
    return cryptojs.AES.encrypt(url, secret).toString();
  }

function urlDecryption(url: string) {
  return cryptojs.AES.decrypt(url, secret).toString(cryptojs.enc.Utf8);
}



export { urlEncryption, urlDecryption };