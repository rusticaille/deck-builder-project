const dataMapper = require("../dataMapper");

const searchController = {
  searchPage: (req, res) => {
    res.render('search');
  },

  searchByElement: (req,res) => {
    const elementFromForm = req.query.element;
    console.log(elementFromForm);
    dataMapper.getCardsByElement(elementFromForm, (error, result) => {
      if(error){
        console.log('erreur dans searchElement :', error);
      }else {
        const cardsWithElementsFromDatabase = result.rows;
        console.log('cardsWithElementsFromDatabase :', cardsWithElementsFromDatabase)
        const elementName = req.query.element == 'null' ? "aucun" : req.query.element;
        res.render('cardList', {
          cards : cardsWithElementsFromDatabase,
          title : 'Liste des cartes - Element: ' + elementName
        });
      }
    });
  },

  searchByLevel: (req,res) => {
    const levelFromForm = req.query.level;
    console.log(levelFromForm);
    dataMapper.getCardsByLevel(levelFromForm, (error, result) => {
      if(error){
        console.log('erreur dans searchByLevel :', error);
      }else {
        const cardsByLevelFromDatabase = result.rows;
        res.render('cardList', {
          cards : cardsByLevelFromDatabase,
          title : 'Liste des cartes - niveau: ' + req.query.level
        })
      }
    })
  },

  searchByName: (req,res) => {
    const nameToSearch = req.query.name;
    dataMapper.getCardsByName(nameToSearch,(error, result) => {
      if(error){
        console.log('erreur dans searchByName :', error);
      }else {
        res.render('cardList', {
          cards : result.rows,
          title: 'liste des cartes contenant "' + req.query.name +'"'
        });
      }
    });
  },

  searchByValue: (req, res) => {
    const directionToSearch = req.query.direction;
    const valueToSearch = req.query.value;
    console.log(directionToSearch, valueToSearch);
    dataMapper.getCardsByValue(directionToSearch, valueToSearch, (error, result) => {
      if(error){
        console.log('erreur dans searchByValue :', error);
      }else {
        const cardsByValue = result.rows;
        res.render('cardList', {
          cards : cardsByValue,
          title : 'Liste des cartes'
        })
      }
    })
  }

};

module.exports = searchController;