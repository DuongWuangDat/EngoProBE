const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createVocabulary = {
  body: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
    englishWord: Joi.string().required(),
    definition: Joi.string().required(),
    wordType: Joi.string().required(), // valid('noun', 'verb', 'adjective', 'adverb', 'preposition', 'conjunction', 'interjection')
    example: Joi.array().items(Joi.string()),
    subject: Joi.object().allow(null)
  })
};

const updateVocabulary = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  }),
  body: Joi.object().keys({
    englishWord: Joi.string(),
    definition: Joi.string(),
    wordType: Joi.string(),
    example: Joi.array().items(Joi.string()),
    subject: Joi.object().allow(null)
  }).min(1)
};

const deleteVocabulary = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId).required()
  })
};

const getVocabularies = {
  query: Joi.object().keys({
    userId: Joi.string().custom(objectId).required()
  })
};

module.exports = {
  createVocabulary,
  updateVocabulary,
  deleteVocabulary,
  getVocabularies
};