const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(value){
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(value, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};

function decrypt(value){
    const decipher =  crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(value, 'hex', 'utf-8');
    decrypted = decipher.final('utf8');
    return decrypted;
};

module.exports = {encrypt,decrypt};