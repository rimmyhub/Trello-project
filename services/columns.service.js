const ColumnRepository = require('../repositories/columns.repository.js');

class ColumnService {
    constructor() {
        this.columnRepository = new ColumnRepository();
    }

    async getAllColumns() {
        return this.columnRepository.getAllColumns();
    }

    async getColumnById(id) {
        return this.columnRepository.getColumnById(id);
    }

    async createColumn({ boardId, userId, name }) {
        return this.columnRepository.createColumn({ boardId, userId, name });
    }

    async updateColumn(columnId, { name }) {
        return this.columnRepository.updateColumn(columnId, { name });
    }

    async deleteColumn(columnId) {
        return this.columnRepository.deleteColumn(columnId);
    }
}

module.exports = ColumnService;