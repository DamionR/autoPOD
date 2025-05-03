// Minimal utility file for shadcn/ui compatibility

/**
 * A no-operation function (does nothing).
 */
export function noop() {}

/**
 * Concatenate class names conditionally (shadcn/ui convention).
 * @param {...(string|boolean|undefined|null)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
