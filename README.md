# butterscotch-pudding [![version][]](https://npm.im/butterscotch-pudding) [![travis][]](https://travis-ci.org/evocateur/butterscotch-pudding)

> Create [figgy-pudding][] instances from [yargs][] options

One day, long ago, it was Talk Like A Pirate Day _and_ Butterscotch Pudding Day.

[![pudding](/pudding.png)][doodle]

## Install

```sh
$ npm install butterscotch-pudding
```

## Usage

```javascript
const bp = require('butterscotch-pudding');
const yargs = require('yargs/yargs');

const opts = {
    ships: {
        type: 'number',
        default: 3,
    },
    distance: {
        type: 'number',
    },
    color: {
        type: 'string',
        defaultDescription: 'butterscotch',
    },
};

const CommandOptions = bp(opts);
const argv = yargs().options(opts).parse('--distance 100 --color chartreuse --cutlass');
const opts = CommandOptions(argv);

opts.get('ships'); // => 3
opts.get('color'); // => 'chartreuse'
opts.get('cutlass'); // => Error: CommandOptions does not define 'cutlass'
```

## API



[version]: https://img.shields.io/npm/v/butterscotch-pudding.svg
[travis]: https://img.shields.io/travis/evocateur/butterscotch-pudding.svg
[figgy-pudding]: https://github.com/zkat/figgy-pudding#readme
[yargs]: https://github.com/yargs/yargs#readme
[doodle]: http://holidaydoodles.com/?p=1708
