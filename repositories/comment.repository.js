const { Comment, User } = require('../models');
const { Op } = require('sequelize');

class CommentsRepository {
  // 댓글 전체 조회
  findAllComment = async ({ cardId }) => {
    return await Comment.findAll({
      where: { cardId },
      include: [
        {
          model: User,
        },
      ],
    });
  };

  //댓글 조회
  findComment = async ({ commentId }) => {
    return await Comment.findOne({
      where: { commentId },
    });
  };

  // 댓글 생성
  createComment = async ({ userId, cardId, comment }) => {
    return await Comment.create({
      userId,
      cardId,
      comment,
    });
  };

  // 댓글 아이디 찾기
  findById = async ({ commentId }) => {
    return await Comment.findOne({ where: { commentId } });
  };

  // 댓글 수정
  updateComment = async ({ comment, userId, commentId }) => {
    await Comment.update(
      { comment }, // comment 수정
      {
        where: {
          [Op.and]: [{ commentId }, { UserId: userId }],
        },
      },
    );
  };

  // 댓글 삭제
  deleteComment = async ({ userId, commentId }) => {
    await Comment.destroy({
      where: {
        [Op.and]: [{ commentId }, { userId }],
      },
    });
  };
}
module.exports = CommentsRepository;
