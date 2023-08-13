const CommentsRepository = require('../repositories/comment.repository');

class CommentsService {
  commentsRepository = new CommentsRepository();

  // 댓글 전체 조회
  findAllComment = async ({ cardId }) => {
    try {
      const comment = await this.commentsRepository.findAllComment({ cardId });
      return { code: 200, data: comment };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  // 댓글 조회
  findComment = async ({ commentId }) => {
    try {
      const comments = await this.commentsRepository.findComment({ commentId });

      return { code: 200, data: comments };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  // 댓글 작성
  createComment = async ({ userId, cardId, comment }) => {
    if (!comment) return { code: 400, data: '댓글 내용을 입력해주세요' };

    try {
      const createdComment = await this.commentsRepository.createComment({
        userId,
        cardId,
        comment,
      });

      // 데이터가 정상적으로 전달되지 못한 경우
      if (!createdComment) return { code: 400, data: '데이터 형식이 올바르지 않습니다.' };

      return { code: 200, data: createdComment };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  // 댓글 수정
  updateComment = async ({ userId, commentId, comment }) => {
    try {
      const existsComment = await this.commentsRepository.findById({
        commentId,
      });

      if (!existsComment) {
        return { code: 404, data: ' 댓글이 존재하지 않습니다.' };
      } else if (existsComment.userId !== userId) {
        return { code: 401, data: '댓글을 수정할 권한이 없습니다.' };
      }
    } catch (error) {
      return { code: 500, data: error.message };
    }

    // 댓글의 권한을 확인하고, 게시글 수정
    try {
      await this.commentsRepository.updateComment({
        userId,
        commentId,
        comment,
      });
      return { code: 200, data: '댓글을 수정하였습니다.' };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };

  deleteComment = async ({ commentId, userId }) => {
    try {
      const existsComment = await this.commentsRepository.findById({
        commentId,
      });

      if (!existsComment) {
        return { code: 404, data: ' 댓글이 존재하지 않습니다.' };
      } else if (existsComment.userId !== userId) {
        return { code: 401, data: ' 댓글을 삭제할 권한이 없습니다.' };
      }
    } catch (error) {
      return { code: 500, data: error.message };
    }

    try {
      await this.commentsRepository.deleteComment({
        userId,
        commentId,
      });
      return { code: 200, data: '댓글을 삭제하였습니다.' };
    } catch (error) {
      return { code: 500, data: error.message };
    }
  };
}
module.exports = CommentsService;
