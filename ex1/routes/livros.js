var express = require('express');
var router = express.Router();
var livros = require('../controllers/livros');
const { route } = require('../app');


/*
Desenvolve agora uma API de dados, que responde na porta 17000 e que responda às seguintes
rotas/pedidos:
GET /books: devolve uma lista com todos os registos;
GET /books/:id: devolve o registo com identificador id (em PR.md deves indicar o que vais usar
como id);
GET /books?charater=EEEE: devolve a lista dos livros em que EEEE faz parte do nome de um dos
personagens;
GET /books?genre=AAA: devolve a lista dos livros associados ao género (genre) AAA;
GET /books/genres: devolve a lista de géneros ordenada alfabeticamente e sem repetições;
GET /books/characters: devolve a lista dos personagens ordenada alfabeticamente e sem
repetições;
POST /books: acrescenta um registo novo à BD;
DELETE /books/:id: elimina da BD o registo com o identificador id;
PUT /books/:id: altera o registo com o identificador id.
*

/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.query.character){
        livros.findByCharacter(req.query.character)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
    }
    else if (req.query.genre){
        livros.findByGenre(req.query.genre)
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
    }
    else{
        livros.list()
        .then(dados => res.jsonp(dados))
        .catch(erro => res.status(500).jsonp(erro));
    }
});

router.get('/genres', function(req, res, next) {
    livros.genres()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
}
);


router.get('/characters', function(req, res, next) {
    console.log("characters")
    livros.characters()
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
}
);

router.get('/:id', function(req, res, next) {
    livros.findById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.post('/', function(req, res, next) {
    livros.insert(req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.delete('/:id', function(req, res, next) {
    livros.removeById(req.params.id)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

router.put('/:id', function(req, res, next) {
    livros.update(req.params.id, req.body)
    .then(dados => res.jsonp(dados))
    .catch(erro => res.status(500).jsonp(erro));
});

module.exports = router;