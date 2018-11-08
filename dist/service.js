"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Module dependencies.
 */
const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression"); // compresses requests
const articleUpdate_1 = require("./endpoints/articleUpdate");
const articleUpdateErrors_1 = require("./endpoints/articleUpdateErrors");
const generator_1 = require("./endpoints/generator");
const db_1 = require("./endpoints/db");
const upload_1 = require("./endpoints/upload");
const path_1 = require("path");
/**
 * Create Express server.
 */
const server = express();
exports.server = server;
/**
 * Express configuration.
 */
server.set('host', process.env.HOST || '0.0.0.0');
server.set('port', process.env.PORT || 3000);
server.use(compression());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path_1.join(__dirname, 'public'), { maxAge: 31557600000 }));
/**
 * Routing
 */
server.get('/article-updates/report', articleUpdateErrors_1.articleUpdateReport);
server.get('/article-updates/:articleId', articleUpdate_1.articleUpdate);
server.get('/db/generate', generator_1.generatorEndpoint);
server.put('/upload', upload_1.uploadEndpoint);
server.get('/db', db_1.dbEndpoint);
/**
 * Start Express server.
 */
server.listen(server.get('port'), server.get('host'), () => {
    console.log(('  App is running at http://%s:%d in %s mode'), server.get('host'), server.get('port'), server.get('env'));
    console.log('  Press CTRL-C to stop\n');
});
//# sourceMappingURL=service.js.map