const ColumnService = require('../services/columns.service');

class ColumnsController {
    columnService = new ColumnService();

    createColumn = async (req, res) => {
        const columnData = req.body;
        try {
            const createdColumn = await this.columnService.createColumn(columnData);
            res.status(201).json(createdColumn);
        } catch (error) {
            res.status(500).json({ error: '컬럼 생성 실패' });
        }
    };

    getColumnById = async (req, res) => {
        const { columnId } = req.params;
        try {
            const column = await this.columnService.getColumnById(columnId);
            if (column) {
                res.status(200).json(column);
            } else {
                res.status(404).json({ message: '컬럼이 존재하지 않습니다.' });
            }
        } catch (error) {
            res.status(500).json({ error: '컬럼 조회 실패' });
        }
    };

    getAllColumns = async (req, res) => {
        try {
            const columns = await this.columnService.getAllColumns();
            res.status(200).json(columns);
        } catch (error) {
            console.error('Error retrieving columns:', error);
            res.status(500).json({ error: '컬럼 조회 실패' });
        }
    };

    updateColumn = async (req, res) => {
        const { columnId } = req.params;
        const updatedData = req.body;
        try {
            const updatedColumn = await this.columnService.updateColumn(columnId, updatedData);
            res.status(200).json(updatedColumn);
        } catch (error) {
            res.status(500).json({ error: '컬럼 수정 실패' });
        }
    };

    deleteColumn = async (req, res) => {
        const { columnId } = req.params;
        try {
            await this.columnService.deleteColumn(columnId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: '컬럼 삭제 실패' });
        }
    };
}

module.exports = ColumnsController