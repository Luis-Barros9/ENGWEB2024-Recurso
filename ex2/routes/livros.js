var express = require('express');
var router = express.Router();
var axios = require('axios');

/*
Tendo a API desenvolvida, desenvolve agora um novo serviço, que responde na porta 15031 e que irá
responder da seguinte forma:
. Se colocares no browser o endereço http://localhost:15031 deverás obter a página principal
constituída por:
Um cabeçalho com metainformação à tua escolha;
Uma tabela contendo a lista de registos, um por linha, com os campos: _id, Freguesia,
Espécie, Estado e Número de intervenções;
O campo _id deverá ser um link para a página do contrato com esse identificador;
O campo Espécie deverá ser um link para a página dessa espécie.
. Se colocares no browser o endereço http://localhost:15031/:id deverás obter a página do
registo com o identificador passado na rota:
Esta página deverá conter todos os campos do registo e um link para voltar à página principal.
. Se colocares no browser o endereço http://localhost:15031/especies/:id deverás obter a
página da espécie cujo nome corresponde ao parâmetro passado na rota (como fazes a associação
do parâmetro à espécie é contigo, usa a imaginação):
Na página de cada espécie deverá constar o nome e a designação científica da espécie e uma
tabela com a lista de registos dessa espécie (tabela com estrutura semelhante à da página
principal).
*/


const api_url = 'http://engweb2024-recurso-livros-api-1:17000';
/* GET users listing. */

/*
. Se colocares no browser o endereço http://localhost:17001 deverás obter a página principal
constituída por:
Um cabeçalho com metainformação à tua escolha;
Uma tabela contendo a lista de registos, um por linha, com os campos: id, title, author,
publishDate, pages;
O campo id deverá ser um link para a página do livro com esse identificador;
O campo author deverá ser um link para a página desse autor (arranja maneira de associar
um id ao autor).
. Se colocares no browser o endereço http://localhost:17001/:id deverás obter a página do
livro cujo identificador foi passado na rota:
Esta página deverá conter todos os campos do livro e um link para voltar à página principal;
Deverás também inluir a imagem referenciada no campo coverImg, se este existir no registo.
. Se colocares no browser o endereço http://localhost:17001/entidades/:idAutor deverás
obter a página do autor cujo id corresponde ao parâmetro passado na rota :
Na página de cada autor deverá constar este identificador e o respetivo nome;
Uma tabela com a lista de livros desse autor (tabela com estrutura semelhante à da página
principal);
O somatório do total de livros;
E um link para voltar à página principal.
*/

router.get('/', function(req, res, next) {
  axios.get(api_url + '/books')
    .then(dados => {
      res.render('livros', { books: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});

router.get('/entidades/:id', function(req, res, next) {
  console.log("nas entidades")
  axios.get(api_url + '/books')
    .then(dados => {
      fromAuthor = []
      dados.data.forEach(element => {
        if (element.author == req.params.id) {
          fromAuthor.push(element)
        }
      });
      if (fromAuthor.length == 0) {
        console.log("No books found for this author")
        throw new Error("No books found for this author")
      }
      else
      {
        res.render('autor', { id:req.params.id,books: fromAuthor });
      }
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});

router.get('/:id', function(req, res, next) {
  console.log("aqui")
  axios.get(api_url + '/books/' + req.params.id)
    .then(dados => {
      res.render('livro', { book: dados.data });
    })
    .catch(erro => {
      res.render('error', { error: erro });
    });
});


module.exports = router;
