/**
 * Module dependencies.
 */
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';  // compresses requests
import { articleUpdate } from './endpoints/articleUpdate';
import { articleUpdateErrors } from './endpoints/articleUpdateErrors';
import { join } from 'path';

/**
 * Create Express server.
 */
const server = express();

/**
 * Express configuration.
 */
server.set('host', process.env.HOST || '0.0.0.0');
server.set('port', process.env.PORT || 3000);
server.use(compression());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Routing
 */
server.get('/article-updates/:articleId', articleUpdate);

server.get('/article-updates/report', articleUpdateErrors);

/**
 * Start Express server.
 */
server.listen(server.get('port'), server.get('host'), () => {
  console.log(('  App is running at http://%s:%d in %s mode'), server.get('host'), server.get('port'), server.get('env'));
  console.log('  Press CTRL-C to stop\n');
});

export { server };
