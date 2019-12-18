const {singleUpload, deleteFile, deleteFolder} = require('./cloudinaryUploader');

module.exports.singleUpload = function (data, filetype, path, filename) {
    return singleUpload(data, filetype, path, filename);
}

module.exports.multiUpload = function () {
    return [];
}

module.exports.deleteFile = function (image_id) {
    return deleteFile(image_id);
}

module.exports.deleteFolder = function (path) {
    return deleteFolder(path);
}


