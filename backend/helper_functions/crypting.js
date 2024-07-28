require('dotenv').config();
const crypto = require('crypto');
const {Buffer} = require('node:buffer');
const algorithm = 'aes-256-cbc';
const key = Buffer.from(process.env.SECRET_ENC_KEY,'hex');

function encrypt(value){
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ":" + encrypted;
};

function decrypt(value){
    let components = value.split(':');
    let iv_from_components = Buffer.from(components.shift(), 'hex');
    let encryptedTextBytes = Buffer.from(components.join(':'), 'hex');
    const decipher =  crypto.createDecipheriv(algorithm, key, iv_from_components);
    let decrypted = decipher.update(encryptedTextBytes, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {encrypt,decrypt};