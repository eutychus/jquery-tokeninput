import type { JQueryStatic } from "jquery";

declare global {
  const jQuery: JQueryStatic;
  const $: JQueryStatic;
}

export {};
