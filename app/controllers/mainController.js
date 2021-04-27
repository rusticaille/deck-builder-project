const dataMapper = require('../dataMapper.js');

const mainController = {
  homePage: (req, res) => {
    dataMapper.getAllCards( (err, results) => {
      if(err) {
        console.error(err);
        return;
      } 
      res.render('cardList', {
        cards: results.rows,
        title: 'Liste des cartes'
      })
    });
  },

  detailCard: (req, res) => {
    const idCard = req.params.id;
    dataMapper.getOneCardById(idCard, (error, result) => {
      if(error){
        console.log('erreur detailCard :', error);
      } else {
        console.log('je suis ici');
        const cardFromDatabase = result.rows[0]; 
        res.render('card', {
          card : cardFromDatabase,
        });
      }
    })
  },

  addCardToDeck: (req, res) => {
    const cardIdToadd = req.params.id;
    const isIdAllreadyInDeck = req.session.deck.find(currentId => (currentId == cardIdToadd));
    if(isIdAllreadyInDeck || req.session.deck.length > 4){
      res.redirect('/deck');
    }else {
    req.session.deck.push(cardIdToadd);
    console.log(req.session.deck);
    res.redirect('/');
    }
    
  },

  displayDeckPage: (req,res) => {
    dataMapper.getCardsByIds(req.session.deck, (error, result) => {
      if(error){
        console.log('erreur displayDeckPage :', error);
      } else {
        const cardsInDeck = result.rows;
        res.render('deck', {
          cards : cardsInDeck,
          title: 'Cartes du deck'
        });
      }
    });
  },

  deleteFromDeck: (req, res) => {
    idToDelete = req.params.id;
    req.session.deck = req.session.deck.filter((currentId) => currentId !== idToDelete);
    res.redirect('/deck');
  }

};

module.exports = mainController;