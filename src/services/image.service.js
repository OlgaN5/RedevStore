const dbAccess = require('../database.lib/dbAccess')
const {
    Image
} = require('../models/assotiations')
const fs = require('fs')
class ImageService {
    async createImage(data) {
        return await dbAccess.create(Image, data)
    }
    async deleteImage(conditions) {
        const image = await dbAccess.readOne(Image, conditions)
        await dbAccess.delete(Image, conditions)
        const link = image.link
        fs.unlink(link, (err) => {
            if (err) {
                return new Error('file not deleted')
            }
            return {
                id: image.id,
                message: 'deleted'
            }
        })
        // return image
    }
}
module.exports = new ImageService()