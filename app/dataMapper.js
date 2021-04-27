const database = require('./database');

const dataMapper = {

  getAllCards: function (callback) {
    const query = {
      text : `SELECT * FROM "card"`
    };
    database.query(query, callback);
  },

  getOneCardById : (id, callback) => {
    const getOneCardQuery = 'SELECT * FROM "card" WHERE "id"=$1;';
    database.query(getOneCardQuery, [id], callback);
  },

  getCardsByElement: (element, callback) => {

    if(element == 'null'){
      const getCardsByElementQuery = 'SELECT * FROM "card" WHERE "element" IS NULL;';
      database.query(getCardsByElementQuery, callback);
    }
    else {
      getCardsByElementQuery = 'SELECT * FROM "card" WHERE "element"=$1;';
      database.query(getCardsByElementQuery, [element], callback);
    }

  },

  getCardsByLevel: (level, callback) => {
    const cardsByLevelQuery = 'SELECT * FROM "card" WHERE "level"=$1;';
    database.query(cardsByLevelQuery, [level], callback);
  },

  getCardsByIds: (id, callback) => {
    const cardsByIdsQuery = 'SELECT * FROM "card" WHERE "id"= ANY($1);';
    database.query(cardsByIdsQuery, [id], callback);
  },

  getCardsByName: (text, callback) => {
    const cardsByNameQuery = 'SELECT * FROM "card" WHERE "name" LIKE $1;';
    database.query(cardsByNameQuery, [`%${text}%`], callback);
  },

  getCardsByValue: (direction, value, callback) => {
    const cardsByValueQuery = `SELECT * FROM "card" WHERE "value_$1" = $2;`;
    database.query(cardsByValueQuery, [direction, value], callback);
  }
  
};


module.exports = dataMapper;