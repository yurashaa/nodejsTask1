module.exports = {
    PHOTO_MIMETYPES: [
        'image/jpeg',
        'image/jpg',
        // 'image/gif',
        // 'image/bmp',
        'image/png',
        // 'image/tiff',
        // 'image/webp'
    ],
    DOC_MIMETYPES: [
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/pdf',
        'application/x-shockwave-flash',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ],

    PHOTO_MAX_SIZE: 3 * 1024 * 1024,
    DOC_MAX_SIZE: 10 * 1024 * 1024,

    USERS_DIR: 'users',
    PRODUCTS_DIR: 'products',
};
