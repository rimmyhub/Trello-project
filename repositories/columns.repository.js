const { Column, sequelize } = require('../models');


class ColumnRepository {
    async createColumn(columnData) {
        const createdColumn = await Column.create(columnData);
        return createdColumn;
    }

    async getNextColumnPosition(boardId) {
        try {
            const maxPositionColumn = await Column.findOne({
                attributes: [[sequelize.fn('MAX', sequelize.col('position')), 'maxPosition']], // Sequelize 사용
                where: { boardId }
            });

            return maxPositionColumn ? (maxPositionColumn.get('maxPosition') || 0) + 1 : 0;
        } catch (error) {
            console.error('Error updating column order:', error);
            throw new Error('컬럼 생성 위치 조회 실패');
        }
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
        const deletedColumn = await Column.destroy({ where: { userId, columnId } });
        //const deletedColumn = await Column.destroy({ where: { userId:userId, columnId:columnId } });
        //const deletedColumn = await Column.destroy({ where: { userId:2, columnId:3 } });
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
            const { fromposition, toposition } = columnOrder;

            // 열 순서 업데이트 로직을 구현합니다.
            // fromposition과 toposition을 이용하여 열 순서를 변경합니다.
            // 이 예제에서는 단순히 열 순서를 서로 바꾸는 예시를 제시합니다.
            // 실제 업데이트 로직에 맞게 수정해야 합니다.

            // 예시: 열 순서를 서로 바꾸는 코드
            await Column.update({ order: toposition }, { where: { columnId: fromposition, boardId } });
            await Column.update({ order: fromposition }, { where: { columnId: toposition, boardId } });


        } catch (error) {
            console.error('Error updating column order:', error);
            throw new Error('컬럼 순서 업데이트 실패');
        }
    }
}

module.exports = ColumnRepository;
