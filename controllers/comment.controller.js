const CommentsService = require('../services/comment.service');

class CommentsController {
  commentsService = new CommentsService();

  // 댓글 조회
  findCardComment = async (req, res) => {
    const { cardId } = req.params;

    const { code, data } = await this.commentsService.findComment({ cardId });
    res.status(code).json({ data });
  };

  // 댓글 생성
  cerateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { cardId } = req.params;
    const { comment } = req.body;

    const { code, data } = await this.commentsService.createComment({
      userId,
      cardId,
      comment,
    });

    res.status(code).json({ data });
  };

  // 댓글 수정
  updateComment = async (req, res) => {
    const { userId } = res.locals.user;
    const { commentId } = req.params;
    const { comment } = req.body;

    const { code, data } = await this.commentsService.updateComment({
      userId,
      commentId,
      comment,
    });
    res.status(code).json({ data });
  };

  // 댓글 삭제
  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;

    const { code, data } = await this.commentsService.deleteComment({
      commentId,
      userId,
    });
    res.status(code).json({ data });
  };
}
module.exports = CommentsController;
