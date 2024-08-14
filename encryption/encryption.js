const crypto = require('crypto');

// Function to encrypt data
function encrypt(te, key) {
    const algorithm = 'aes-256-cbc'; // Algorithm for encryption
    const iv = crypto.randomBytes(16); // Initialization vector
    // console.log(key,iv)
    const text=JSON.stringify(te);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        key:key.toString('hex'),
        iv: iv.toString('hex'),
        encryptedData: encrypted
    };
}

// Function to decrypt data
function decrypt(encrypted) {
    const algorithm = 'aes-256-cbc'; // Algorithm for decryption
   const key=Buffer.from(encrypted.key,'hex')
    const iv = Buffer.from(encrypted.iv, 'hex');
    const encryptedText = Buffer.from(encrypted.encryptedData, 'hex');


    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return JSON.parse(decrypted);
}


module.exports={
    encrypt,
    decrypt
}

