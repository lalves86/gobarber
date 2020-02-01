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

// Importação de pacotes
import express from 'express';
import path from 'path';

// Iimportação de arquivos
import routes from './routes';

import './database';

// Classe principal do projeto
class App {
  constructor() {
    // Instância do express
    this.server = express();

    // Inclusão dos métodos no construtor para que seja possível acessá-los através do this
    this.middlewares();
    this.routes();
  }

  /*
    Métdo para incluir todos os middlewares do projeto
    path é necessário para acessar arquivos e pastas dentro do servidor
  */
  middlewares() {
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Referencia o arquivo de rotas
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
