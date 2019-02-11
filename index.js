'use strict';

const figgyPudding = require('figgy-pudding');

module.exports = butterscotchPudding;

function butterscotchPudding (options) {
  const spec = Object.keys(options).reduce((obj, key) => {
    const cfg = options[key];

    obj[key] = {};

    if (cfg.defaultDescription && cfg.type) {
      // default descriptions _without_ type must _remain_ undefined
      obj[key].default = cfg.type === 'boolean'
        ? JSON.parse(cfg.defaultDescription)
        : cfg.defaultDescription;
    } else if (cfg.default) {
      // propagate explicit defaults
      obj[key].default = cfg.default;
    } else if (cfg.type === 'array') {
      // yargs does this, but why not
      obj[key].default = [];
    }

    if (key.indexOf('-') > -1) {
      // back-compat for durable camelOptions
      obj[camelize(key)] = key;
    }

    return obj;
  }, {});

  return figgyPudding(spec);
}

function camelize (str) {
  return str.replace(/-(\w)/g, (m, p1) => p1.toUpperCase());
}
