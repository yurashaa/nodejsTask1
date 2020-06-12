const {ErrorHandler, errorsEnum} = require('../../error');
const {fileOptionsEnum, responseStatusCode} = require('../../constants');

module.exports = (req, res, next) => {
    req.photos = [];
    req.docs = [];

    if (!req.files) {
        return next();
    }

    const files = Object.values(req.files);

    for (const file of files) {
        const {mimetype, size} = file;
        console.log(size, mimetype);

        if (fileOptionsEnum.PHOTO_MIMETYPES.includes(mimetype)) {
            if (size < fileOptionsEnum.PHOTO_MAX_SIZE) {
                console.log(size);
                req.photos.push(file);
            }
        } else if (fileOptionsEnum.DOC_MIMETYPES.includes(mimetype)) {
            if (size < fileOptionsEnum.DOC_MAX_SIZE) {
                req.docs.push(file);
            }
        } else {
            return next(new ErrorHandler(
                errorsEnum.ERR_NOT_VALID_FILES.msg,
                responseStatusCode.BAD_REQUEST,
                errorsEnum.ERR_NOT_VALID_FILES.code
            ));
        }
    }

    next();
};
