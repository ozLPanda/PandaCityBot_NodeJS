import * as crypto from "crypto";
import fs from 'fs'

const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
  modulusLength: 2048,
  publicKeyEncoding: { type: "spki", format: "pem" },
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
});
let key = `${publicKey}${privateKey}`

fs.writeFileSync('..\\assets\\keys\\public.key', publicKey)
fs.writeFileSync('..\\assets\\keys\\private.key', privateKey)

console.log('File created')