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
import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

// Iimportação de arquivos
import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

// Classe principal do projeto
class App {
  constructor() {
    // Instância do express
    this.server = express();

    Sentry.init(sentryConfig);

    // Inclusão dos métodos no construtor para que seja possível acessá-los através do this
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  /*
    Métdo para incluir todos os middlewares do projeto
    path é necessário para acessar arquivos e pastas dentro do servidor
  */
  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    );
  }

  // Referencia o arquivo de rotas
  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
