/**
 * @overview Contains fuzz tests for using Shescape with the child_process
 * function `fork`.
 * @license Unlicense
 */

const assert = require("node:assert");
const { fork } = require("node:child_process");

const common = require("./_common.cjs");

const shescape = require("../../index.cjs");

function check(arg) {
  const preparedArg = common.prepareArg(arg, false);

  const echo = fork(common.ECHO_SCRIPT, shescape.escapeAll([preparedArg]), {
    silent: true,
  });

  echo.stdout.on("data", (data) => {
    const result = data.toString();
    const expected = common.getExpectedOutput(arg);
    assert.strictEqual(result, expected);
  });
}

function fuzz(buf) {
  const arg = buf.toString();

  // Skipped because of a bug with fork in shescape, see:
  // - https://github.com/ericcornelissen/shescape/issues/286
  //check(arg);
}

module.exports = {
  fuzz,
};