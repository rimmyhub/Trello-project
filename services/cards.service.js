const CardRepository = require('../repositories/cards.repository');

class CardService {
  cardRepository = new CardRepository();

  //
  findAllCard = async (columnId) => {
    const findCard = await this.cardRepository.findAllCard(columnId);
    return findCard;
  };

  // 카드 조회
  findCard = async (columnId, cardId) => {
    const find = await this.cardRepository.findCard(columnId, cardId);
    return find;
  };

  // 카드 생성
  createCard = async ({ userId, columnId, name, color, description, startDate, dueDate }) => {
    await this.cardRepository.createOne({
      userId,
      columnId,
      name,
      color,
      description,
      startDate,
      dueDate,
    });
    return { code: 200, message: '카드 작성이 완료되었습니다.' };
  };

  // 카드 수정
  updateCard = async ({
    columnId,
    userId,
    cardId,
    name,
    color,
    description,
    startDate,
    dueDate,
  }) => {
    const findCard = await this.cardRepository.findCardId({ cardId });
    if (!findCard) throw { code: 400, message: '카드를 찾을 수 없습니다.' };

    const findCardUserId = findCard.userId;
    if (userId !== findCardUserId) throw { code: 400, message: '카드 작성자가 아닙니다.' };

    await this.cardRepository.updateOne({
      columnId,
      userId,
      cardId,
      name,
      color,
      description,
      startDate,
      dueDate,
    });
    return { code: 200, message: '카드를 수정했습니다.' };
  };

  deleteCard = async ({ columnId, cardId, userId }) => {
    const findCard = await this.cardRepository.findCardId({ cardId });
    if (!findCard) throw { code: 400, message: '카드를 찾을 수 없습니다.' };

    const findCardUserId = findCard.userId;
    if (userId !== findCardUserId) throw { code: 400, message: '카드 작성자가 아닙니다.' };

    await this.cardRepository.deleteOne({ columnId, cardId, userId });
    return { code: 200, message: '카드를 삭제했습니다.' };
  };

  // 칼럼 수정
  updateColumn = async ({ columnId, userId, cardId }) => {
    const findCard = await this.cardRepository.findCardId({ cardId });
    if (!findCard) throw { code: 400, message: '카드를 찾을 수 없습니다.' };

    const findCardUserId = findCard.userId;
    if (userId !== findCardUserId) throw { code: 400, message: '카드 작성자가 아닙니다.' };

    await this.cardRepository.updateColumn({ columnId, userId, cardId });
    return { code: 200, message: '카드의 칼럼을 수정했습니다.' };
  };
}

module.exports = CardService;
