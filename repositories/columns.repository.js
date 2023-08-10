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
    async getAllColumnsForBoard(boardId) {
        const columns = await Column.findAll({
            where: { boardId }
        });
        return columns;
    }
    async updateColumnOrder(boardId, columnOrder) {
        try {
            // 컬럼 순서 업데이트 로직을 여기에 구현
            // 컬럼 순서는 배열 형태로 columnOrder로 전달됩니다.
            // 컬럼 ID 순서대로 배열이 구성되어 있으며, 이를 활용하여 데이터베이스에서 업데이트합니다.

            // 아래는 가상의 예시입니다. 실제 데이터베이스 업데이트 로직을 추가해야 합니다.
            await Promise.all(columnOrder.map(async (columnId, index) => {
                await Column.update({ order: index }, { where: { userId: columnId, boardId } });
            }));
        } catch (error) {
            throw new Error('컬럼 순서 업데이트 실패');
        }
    }
}

module.exports = ColumnRepository;
