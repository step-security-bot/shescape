/**
 * @overview Provides instances of shescape for testing purposes.
 * @license MPL-2.0
 */

import { isStringable, toArrayIfNecessary } from "./src/reflection.js";

/**
 * A test stub of shescape that has the same input-output profile as the real
 * shescape implementation.
 *
 * In particular:
 * - Returns a string for all stringable inputs.
 * - Errors on non-stringable inputs.
 * - Converts non-array inputs to single-item arrays where necessary.
 */
export const shescape = {
  escape: (arg, _options) => {
    if (!isStringable(arg)) {
      throw new TypeError();
    } else {
      return arg.toString();
    }
  },
  escapeAll: (args, _options) => {
    args = toArrayIfNecessary(args);
    return args.map(shescape.escape);
  },
  quote: (arg, _options) => shescape.escape(arg),
  quoteAll: (args, _options) => shescape.escapeAll(args),
};
