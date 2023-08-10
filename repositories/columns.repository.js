const { Column } = require('../models');

class ColumnRepository {
    async createColumn(columnData) {
        const createdColumn = await Column.create(columnData);
        return createdColumn;
    }

    async getColumnById(columnId) {
        const column = await Column.findByPk(columnId);
        return column;
    }

    async getAllColumns() {
        const columns = await Column.findAll();
        return columns;
    }

    async updateColumn(columnId, updatedData, userId) {
        const updatedColumn = await Column.update(updatedData, {
            where: { userId: columnId, userId }
        });
        return updatedColumn;
    }

    async deleteColumn(columnId, userId) {
        const deletedColumn = await Column.destroy({ where: { userId: columnId, userId } });
        return deletedColumn;
    }
}

module.exports = ColumnRepository;
