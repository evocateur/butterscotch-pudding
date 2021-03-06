'use strict';

const test = require('tap').test;
const bp = require('.');

test('basic options munging', t => {
  const makeOpts = bp({
    'answer': { default: 42 },
    'a-list': { type: 'array' },
    'bool-desc': { type: 'boolean', defaultDescription: 'true' },
    'bool-desc-no': { type: 'boolean', defaultDescription: 'a boolean' },
    'bool-default': { type: 'boolean', defaultDescription: 'a boolean', default: false },
    'num-desc': { type: 'number', defaultDescription: '3.14159' },
    'num-desc-no': { type: 'number', defaultDescription: 'a number' },
    'num-default': { type: 'number', defaultDescription: 'a number', default: 1 },
    'desc-default': { type: 'string', defaultDescription: 'desc' },
    'some-stuff': { type: 'string' }
  });
  const opts = makeOpts({ foo: 'bar', someStuff: 'yup' });

  t.is(opts.get('answer'), 42, 'untyped default propagated');
  t.is(opts.get('bool-desc'), true, 'boolean defaultDescription parsed');
  t.is(opts.get('bool-desc-no'), undefined, 'boolean defaultDescription skipped');
  t.is(opts.get('bool-default'), false, 'boolean default overrides description');
  t.is(opts.get('num-desc'), 3.14159, 'number defaultDescription parsed');
  t.is(opts.get('num-desc-no'), undefined, 'number defaultDescription skipped');
  t.is(opts.get('num-default'), 1, 'number default overrides description');
  t.is(opts.get('desc-default'), undefined, 'string defaultDescription not default');
  t.same(opts.get('a-list'), [], 'array type defaults to array');
  t.is(opts.get('someStuff'), 'yup', 'camel key from camelized argv');
  t.is(opts.get('some-stuff'), 'yup', 'dashed key from camelized argv');
  t.throws(() => opts.get('foo'), 'invalid', 'forbids ad-hoc prop access');

  t.done();
});
