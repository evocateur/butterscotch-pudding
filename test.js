'use strict';

const test = require('tap').test;
const bp = require('.');

test('basic options munging', t => {
  const makeOpts = bp({
    'answer': { default: 42 },
    'a-list': { type: 'array' },
    'bool-desc': { type: 'boolean', defaultDescription: 'true' },
    'bool-default': { type: 'boolean', defaultDescription: 'a boolean', default: false },
    'desc-default': { type: 'string', defaultDescription: 'desc' },
    'some-stuff': { type: 'string' }
  });
  const opts = makeOpts({ foo: 'bar', someStuff: 'yup' });

  t.is(opts.get('answer'), 42, 'untyped default propagated');
  t.is(opts.get('bool-desc'), true, 'boolean defaultDescription parsed');
  t.is(opts.get('bool-default'), false, 'boolean default overrides description');
  t.is(opts.get('desc-default'), 'desc', 'string defaultDescription raw');
  t.same(opts.get('a-list'), [], 'array type defaults to array');
  t.is(opts.get('someStuff'), 'yup', 'camel key from camelized argv');
  t.is(opts.get('some-stuff'), 'yup', 'dashed key from camelized argv');
  t.throws(() => opts.get('foo'), 'invalid', 'forbids ad-hoc prop access');

  t.done();
});
