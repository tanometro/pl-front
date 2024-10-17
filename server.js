const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const httpsLocalhost = require('https-localhost');

const https = httpsLocalhost();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https.getCerts().then(({ key, cert }) => {
    createServer({ key, cert }, (req, res) => {
      const parsedUrl = parse(req.url, true);
      handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on https://localhost:3000');
    });
  });
});