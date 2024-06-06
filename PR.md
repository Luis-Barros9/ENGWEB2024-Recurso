# Exercício 1

## Setup

Primeiramente, comecei por analisar o dataset fornecido, com isto constactei que existem vários valores como listas que se encontravam em formato de string e era necessário converter os mesmos para lista.
Além disso tive a preocupação de converter todos os valores que podiam ser convertidos em inteiro ou em float.Por fim tive em atenção aos autores, transoformando este campo numa lista de strings, ignorando assim as funções que cada um toma, sendo que o primeiro elemento desta lista é sempre considerado o autor principal do livro.

Para este efeito, criei um script python que logo encontrou o seguinte erro:"json.decoder.JSONDecodeError: Expecting ',' delimiter: line 540001 column 6 (char 41822225)".Corrigi o manualmente, adicionando o fecho ']' do json array.


Para terminar subsitui o nome do identificador por "_id" para funcionar em conformancia com o mongoDB. Relativamente ao id, tive em atenção a remover todos os que nao seguiam o formato \id(conjunton de digitos)[.-]...\ ou seja, começam por um conjunto de digitos, seguido de um separador'-','_' '.' e seguido por um títulpo, removendo assim algum lixo do dataset.



## Queries

Tal como é pedido no enunciado, as queires encontram-se disponíveis no ficheiro queries.txt dentro do ex1

## Docker

Os exercícios foram todos desenvolvidos em docker, por isso para correr o código, basta utilizar o comando 
```docker compose up -d```