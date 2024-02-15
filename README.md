# console-prefix-proxy

Adds prefix to message for JavaScript console

## Usage

```TypeScript
import ConsolePrefix from 'console-prefix-proxy';

const logger = ConsolePrefix({
  prefix: (method: string) => method.toUpperCase(),
});
```

## Options

### prefix

`string | (method: string) => string`

default: `() => (new Date().toISOString())`

### methods

`string[]`

default: `['debug', 'log', 'info', 'warn', 'error']`

### console

`Console`

default: `globalThis.console`