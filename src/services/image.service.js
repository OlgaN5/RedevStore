const dbAccess = require('../database.lib/dbAccess')
const {
    Image
} = require('../models/assotiations')
const path = require('path')
const fs = require('fs')
class ImageService {
    async createImage(data) {
        return await dbAccess.create(Image, data)
    }
    async deleteImage(conditions) {
        const image = await dbAccess.readOne(Image, conditions)
        if (!image) return {
            message: 'not found'
        }
        await dbAccess.delete(Image, conditions)
        const imagePath = image.path
        fs.unlink(path.join(__dirname, '..', imagePath), (err) => {
            if (err) {
                console.log('1')
                console.log(__dirname, '..', imagePath)
                console.log(err.message)
                return new Error('file not deleted')
            }
            console.log('2')
            console.log(imagePath)
            return {
                id: image.id,
                message: 'deleted'
            }
        })
        // return image
    }
}
module.exports = new ImageService()