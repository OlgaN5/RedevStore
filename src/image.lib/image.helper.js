const imageService = require('../services/image.service')
class ImageHelper {
    async createImage(filename) {
        const imageLink = process.env.HOST + `static/${filename}`
        const image = await imageService.createImage({
            link: imageLink
        })
        return image
    }
}

module.exports = new ImageHelper()