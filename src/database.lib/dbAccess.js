class DbAccess {
    async readOne(Model, conditions) {
        return await Model.findOne({
            where: conditions
        })
    }
    async readAll(Model, conditions) {
        return await Model.findAll({
            where: conditions
        })
    }
    async create(Model, data) {
        return await Model.create(data)
    }
    async update(Model, dataToUpdate, conditions) {
        return await Model.update(dataToUpdate, {
            where: conditions
        })
    }
    async delete(Model, conditions) {
        return await Model.destroy({
            where: conditions,
        })
    }

}

module.exports = new DbAccess()