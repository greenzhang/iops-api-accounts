'use strict';

const Hapi = require('hapi');
let server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.route({
  path: '/',
  method: 'GET',
  handler: (request, reply) => {
    reply.redirect('/docs');
  }
});

server.register([
  require('blipp'),
  require('inert'),
  require('vision'),
  require('tv'),
  require('hapi-async-handler'),
  require('./api/cache'),
  require('./api/accounts'),
  require('./api/users'),
  require('./api/claims'),
  require('./api/roles'),
  {
    register: require('good'),
    options: {
      requestHeaders: true,
      reporters: [
        {
          reporter: 'good-console',
          events: { response: '*', log: '*', error: '*' }
        }
      ]
    }
  },
  {
    register: require('hapi-swaggered'),
    options: {
      tags: {}, info: {
        title: 'iOps Accounts API',
        description: 'Account management',
        version: require('./package').version
      }
    }
  },
  {
    register: require('hapi-swaggered-ui'),
    options: {
      title: 'iOps Accounts API',
      path: '/docs'
    }
  }
], err => {
  if (err) throw err;

  if (!module.parent) {
    server.start(function () {
      console.log("Server started", server.info.uri);
    });
  }

});

module.exports = server;
