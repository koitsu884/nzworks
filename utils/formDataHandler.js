const path = require('path');
const Datauri = require('datauri');
const multer = require('multer');

const memoryStorage = multer.memoryStorage();
const memoryUploaderConfig = {
    storage: memoryStorage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
};

const dataUri = new Datauri();

module.exports.memoryUploadSingle = key => multer(memoryUploaderConfig).single(key);
module.exports.memoryUploadMulti = (key, limit=5) => multer(memoryUploaderConfig).array(key, limit);
module.exports.bufferToDataUri = req => dataUri.format(path.extname(req.file.originalname).toString(),
    req.file.buffer);