const express = require('express');
const router = express.Router();

const mainController = require('./controllers/mainController');
const searchController = require('./controllers/searchController');


router.get('/', mainController.homePage);
router.get('/search', searchController.searchPage);
router.get('/card/:id', mainController.detailCard);
router.get('/search/element', searchController.searchByElement);
router.get('/search/level', searchController.searchByLevel);
router.get('/addtodeck/:id', mainController.addCardToDeck);
router.get('/deck', mainController.displayDeckPage);
router.get('/delete/:id', mainController.deleteFromDeck);
router.get('/search/name', searchController.searchByName);
router.get('/search/values', searchController.searchByValue);

module.exports = router;