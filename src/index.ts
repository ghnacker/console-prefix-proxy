/*!
 * console-prefix-proxy
 * Copyright (c) 2024 Satoshi Nakagawa
 */

export type ConsolePrefixOptions = {
  console?: Console,
  methods?: string[],
  prefix?: ((prop: string) => string) | string,
};

const allMethods = ['debug', 'log', 'info', 'warn', 'error'];

export function ConsolePrefix(opt?: ConsolePrefixOptions) {
  const {
    console = globalThis.console,
    methods = allMethods,
    prefix = () => new Date().toISOString(),
  }: ConsolePrefixOptions = opt || {};
  const ms = methods.filter(m => allMethods.includes(m));
  return prefix && ms.length ? new Proxy(console, {
    get(target, prop, receiver) {
      const value = Reflect.get(target, prop, receiver);
      if (typeof prop === 'string' && ms.includes(prop) && typeof value === 'function') {
        return value.bind(target, typeof prefix === 'function' ? prefix(prop) : prefix);
      }
      return value;
    }
  }) : console;
}

export default ConsolePrefix;
