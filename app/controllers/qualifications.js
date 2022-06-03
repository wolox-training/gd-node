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
    const compareScore =
      weetScore === createQualify.score ? createQualify : await repository.update({ findWeet, weetScore });
    const sumScore = await repository.sumScore(compareScore.weet_id);
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
    const findWeetUser = await weetRepository.getOne(findWeet);
    const findPosition = await userRepository.getById(findWeetUser.user_id);
    const updateUserPosition = await userRepository.updatePosition(
      findWeetUser.user_id,
      checkPosition(sumScore)
    );
    const comparePosition =
      checkPosition(sumScore) === findPosition.dataValues.position ? findPosition : updateUserPosition;
    logger.info(successfulMesages.QUALIFIED);
    return res.status(200).json({ position: comparePosition.dataValues.position });
  } catch (error) {
    logger.error(errorsMessages.FAIL);
    return res.status(500).json({ message: errorsMessages.FAIL, errors: error });
  }
};

module.exports = {
  createQualifyWeet
};
