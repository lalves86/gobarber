/*
  Configura a classe principal da API
  Importa o pacote express e o arquivo de rotas, estabelece uma classe App,
  instanciando o express no construtor, em seguida é criado um método que
  contém todos os middlewares e um método para instanciar as rotas.
  O único elemento a ser exportado é a própria instância do express, para que
  seja possível configurar a porta no arquivo server.js.

  O módulo sucrase permite utilizar a sintaxe do ES6+ no node.js, o que ainda
  não é suportado por padrão (também poderia utilizar o babel)
*/

import express from 'express';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
