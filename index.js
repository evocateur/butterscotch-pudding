'use strict';

const figgyPudding = require('figgy-pudding');

module.exports = butterscotchPudding;

function butterscotchPudding (options) {
  const spec = Object.keys(options).reduce((obj, key) => {
    const cfg = options[key];

    obj[key] = {};

    if ('default' in cfg) {
      // propagate explicit defaults
      obj[key].default = cfg.default;
    } else if (cfg.defaultDescription && cfg.type) {
      // default descriptions _without_ type must _remain_ undefined
      if (cfg.type === 'boolean' && /^(true|false)$/.test(cfg.defaultDescription)) {
        obj[key].default = JSON.parse(cfg.defaultDescription);
      } else if (cfg.type === 'number' && !isNaN(cfg.defaultDescription)) {
        obj[key].default = Number(cfg.defaultDescription);
      }
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
