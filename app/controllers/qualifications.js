const { successfulMesages, errorsMessages } = require('../services/internals/constants');
const repository = require('../services/databases/qualification');
const userRepository = require('../services/databases/user');

const logger = require('../logger');

const createQualifyWeet = async (req, res) => {
  try {
    const weetScore = req.body.score;
    const findUser = req.decoded.id;
    const findWeet = req.params.id;
    const qualifyWeetFounded = await repository.getOne({ findUser, findWeet });
    const createQualify =
      qualifyWeetFounded === null
        ? await repository.store({ findUser, findWeet, weetScore })
        : qualifyWeetFounded;
    if (weetScore === createQualify.score) {
      return createQualify;
    }
    await repository.update({ findWeet, weetScore });
    const sumScore = await repository.sumScore();
    const checkPosition = position => {
      switch (true) {
        case position >= 50:
          return 'ceo';
        case position >= 30:
          return 'head';
        case position >= 20:
          return 'em';
        case position >= 10:
          return 'tl';
        case position >= 6:
          return 'lead';
        case position < 0 || position >= 0:
          return 'developer';
        default:
          return 'Not found';
      }
    };
    const findPosition = await userRepository.getById({ findUser });
    const comparePosition =
      checkPosition(sumScore) === findPosition.position
        ? findPosition
        : await userRepository.update({ findPosition });
    logger.info(successfulMesages.CREATED);
    return res.status(200).json({ weets: comparePosition });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  createQualifyWeet
};
