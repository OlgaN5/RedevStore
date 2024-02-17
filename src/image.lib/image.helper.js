const imageService = require('../services/image.service')
class ImageHelper {
    async createImage(filename, productId) {
        const imageLink = `static/${filename}` //process.env.HOST +
        const image = await imageService.createImage({
            host: process.env.HOST,
            path: imageLink,
            productId
        })
        return image
    }
}

module.exports = new ImageHelper()