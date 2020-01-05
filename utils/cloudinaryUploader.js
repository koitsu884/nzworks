const config = require('config');
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: config.get('cloudinaryName'),
    api_key: config.get('cloudinaryAPIKey'),
    api_secret: config.get('cloudinarySecret')
});

const cloudinaryRoot = config.get('cloudinaryRoot');

module.exports.singleUpload = function (data, filetype, path, filename) {  
    return cloudinary.uploader.upload(data,
        {
            resource_type: filetype,
            folder: cloudinaryRoot + path,
            public_id: filename,
            overwrite: true
        }
    );
}

module.exports.multiUpload = function () {
    return [];
}

module.exports.deleteFile = function (public_id) {
    return cloudinary.uploader.destroy(public_id);
}

module.exports.deleteFolder = function (path) {
    return cloudinary.api.delete_resources_by_prefix(cloudinaryRoot + path);
}


