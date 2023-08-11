const ColumnRepository = require('../repositories/columns.repository');
const { validationResult, body } = require('express-validator');

exports.validateUpdateColumnOrder = [
    validationResult,
    body('fromposition').isInt(),
    body('toposition').isInt()
];

class ColumnService {
    constructor() {
        this.columnRepository = new ColumnRepository();
    }

    async createColumn(columnData) {
        return this.columnRepository.createColumn(columnData);
    }

    async getNextColumnPosition(boardId) {
        try {
            return this.columnRepository.getNextColumnPosition(boardId);
        } catch (error) {
            throw new Error('컬럼 생성 위치 조회 실패');
        }
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

    async updateColumnOrder(boardId, columnOrder) {
        try {
            return this.columnRepository.updateColumnOrder(boardId, columnOrder);
        } catch (error) {
            throw new Error('컬럼 순서 업데이트 실패');
        }
    }


    // 다른 메서드들도 추가로 구현해야 합니다.
}

module.exports = ColumnService;
