const { Column } = require('../models');

class ColumnRepository {
    createColumn = async (columnData) => {
        const createdColumn = await Column.create(columnData);
        return createdColumn;
    };

    getColumnById = async (columnId) => {
        const column = await Column.findByPk(columnId);
        return column;
    };

    getAllColumns = async () => {
        const columns = await Column.findAll();
        return columns;
    };

    updateColumn = async (columnId, updatedData) => {
        const updatedColumn = await Column.update(updatedData, {
            where: { columnId },
        });
        return updatedColumn;
    };

    deleteColumn = async (columnId) => {
        const deletedColumn = await Column.destroy({ where: { columnId } });
        return deletedColumn;
    };
}

module.exports = ColumnRepository;