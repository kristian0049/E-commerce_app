const crypto = require('crypto');

const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

function encrypt(value){
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(value, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return iv.toString('hex') + ":" + encrypted;
};

function decrypt(value){
    let components = value.split(':');
    let iv_from_components = Buffer.from(components.shift(), 'hex');
    const decipher =  crypto.createDecipheriv(algorithm, key, iv_from_components);
    let decrypted = decipher.update(components.join(":"), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
};

module.exports = {encrypt,decrypt};