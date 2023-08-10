const ColumnRepository = require('../repositories/columns.repository');

class ColumnService {
    constructor() {
        this.columnRepository = new ColumnRepository();
    }

    async createColumn(columnData) {
        return this.columnRepository.createColumn(columnData);
    }

    async updateColumn(columnId, updatedData, userId) {
        return this.columnRepository.updateColumn(columnId, updatedData, userId);
    }

    async deleteColumn(columnId, userId) {
        return this.columnRepository.deleteColumn(columnId, userId);
    }

    async getAllColumns() {
        return this.columnRepository.getAllColumns();
    }

    async getColumnById(columnId) {
        return this.columnRepository.getColumnById(columnId);
    }

    async getAllColumnsForBoard(boardId) {
        return this.columnRepository.getAllColumnsForBoard(boardId);
    }
}



module.exports = ColumnService;
