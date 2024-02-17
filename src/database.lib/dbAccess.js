class DbAccess {
    async readOne(Model, conditions, include) {
        return await Model.findOne({
            include: include,
            where: conditions
        })
    }
    async readAll(Model, conditions, include) {
        console.log(Model, conditions, include)
        return await Model.findAll({
            include: include,
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