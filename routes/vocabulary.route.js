const express = require("express");
const router = express.Router();
const vocabularyController = require("../controller/vocabulary.controller");
const validate  = require("../middleware/validate");
const { getVocabularies, createVocabulary, updateVocabulary, deleteVocabulary } = require("../validations/vocabulary.validation");

router.get("/", validate(getVocabularies), vocabularyController.getAllVocabulariesByUserIdController);
router.post("/", validate(createVocabulary), vocabularyController.createVocabularyController);
router.put("/:id", validate(updateVocabulary), vocabularyController.updateVocabularyController);
router.delete("/:id", validate(deleteVocabulary), vocabularyController.deleteVocabularyController);

module.exports = router;
