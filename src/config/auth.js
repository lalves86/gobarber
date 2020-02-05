/*
  Arquivo de configuração do token de acesso
*/

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};
