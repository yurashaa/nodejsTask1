const uuid = require('uuid').v1();
const fs = require('fs-extra').promises;
const path = require('path');

module.exports = async (id, photo, dirName) => {
    const photoDir = `${dirName}/${id}/photos`;
    const [fileExtension] = photo.name.split('.').reverse();
    const fileName = `${uuid}.${fileExtension}`;

    await fs.mkdir(path.resolve(process.cwd(), 'public', photoDir), {recursive: true});
    await photo.mv(path.resolve(process.cwd(), 'public', photoDir, fileName));

    return `/${photoDir}/${fileName}`;
};
