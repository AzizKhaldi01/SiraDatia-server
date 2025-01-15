const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Middleware function to sanitize input
const sanitizeInput = (req, res, next) => {
  if (req.body) {
    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        req.body[key] = purify.sanitize(req.body[key]);
      }
    }
  }

  if (req.query) {
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key)) {
        req.query[key] = purify.sanitize(req.query[key]);
      }
    }
  }

  if (req.params) {
    for (const key in req.params) {
      if (req.params.hasOwnProperty(key)) {
        req.params[key] = purify.sanitize(req.params[key]);
      }
    }
  }

  next();
};

module.exports = sanitizeInput;
