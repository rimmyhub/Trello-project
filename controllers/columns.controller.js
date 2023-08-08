const ColumnService = require('../services/columns.service');

class ColumnsController {
    columnService = new ColumnService();

    createColumn = async (req, res) => {
        const columnData = req.body;
        try {
            const createdColumn = await this.columnService.createColumn(columnData);
            res.status(201).json(createdColumn);
        } catch (error) {
            res.status(500).json({ error: 'Failed to create column.' });
        }
    };

    getColumnById = async (req, res) => {
        const { columnId } = req.params;
        try {
            const column = await this.columnService.getColumnById(columnId);
            if (column) {
                res.status(200).json(column);
            } else {
                res.status(404).json({ message: 'Column not found.' });
            }
        } catch (error) {
            res.status(500).json({ error: 'Failed to retrieve column.' });
        }
    };

    getAllColumns = async (req, res) => {
        try {
            const columns = await this.columnService.getAllColumns();
            res.status(200).json(columns);
        } catch (error) {
            console.error('Error retrieving columns:', error);
            res.status(500).json({ error: 'Failed to retrieve columns.' });
        }
    };

    updateColumn = async (req, res) => {
        const { columnId } = req.params;
        const updatedData = req.body;
        try {
            const updatedColumn = await this.columnService.updateColumn(columnId, updatedData);
            res.status(200).json(updatedColumn);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update column.' });
        }
    };

    deleteColumn = async (req, res) => {
        const { columnId } = req.params;
        try {
            await this.columnService.deleteColumn(columnId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete column.' });
        }
    };
}

module.exports = ColumnsController