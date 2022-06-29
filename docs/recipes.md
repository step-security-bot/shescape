# Shescape Recipes

This document provides examples, called _recipes_, for how to use Shescape in
practice.

## [`node:child_process`]

In this section you can find recipes of how to use Shescape with the Node.js
built-in module `node:child_process`.

### [`exec`] / [`execSync`]

#### `exec(command, callback)`

When using `child_process.exec` without the `options` argument, use
`shescape.quote` to escape all user input in the command string.

```js
import { exec } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
exec(`echo Hello ${shescape.quote(userInput)}`, (error, stdout) => {
  if (error) {
    console.error(`An error occurred: ${error}`);
  } else {
    console.log(stdout);
    // Output:  "Hello && ls"
  }
});
```

#### `exec(command, options, callback)`

When using `child_process.exec` with the `options` argument, use
`shescape.quote` to escape all user input in the command string. Provide the
`options` argument to `shescape.quote` as well.

```js
import { exec } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execOptions = {
  // Example configuration for `exec`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `exec`. DO NOT set
  // any keys from the child_process API here.
  ...execOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
exec(
  `echo Hello ${shescape.quote(userInput, shescapeOptions)}`,
  execOptions,
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello && ls"
    }
  }
);
```

#### `execSync(command)`

When using `child_process.execSync` without the `options` argument, use
`shescape.quote` to escape all user input in the command string.

```js
import { execSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "&& ls";

/* 2. Execute shell command */
try {
  const stdout = execSync(`echo Hello ${shescape.quote(userInput)}`);
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

#### `execSync(command, options)`

When using `child_process.execSync` with the `options` argument, use
`shescape.quote` to escape all user input in the command string. Provide the
`options` argument to `shescape.quote` as well.

```js
import { execSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execOptions = {
  // Example configuration for `execSync`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `execSync`. DO NOT
  // set any keys from the child_process API here.
  ...execOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
try {
  const stdout = execSync(
    `echo Hello ${shescape.quote(userInput, shescapeOptions)}`,
    execOptions
  );
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

### [`execFile`] / [`execFileSync`]

> **Warning**: When using Shescape with `execFile` / `execFileSync`, certain
> characters are unnecessarily escaped if no shell is explicitly configured.
> This leads to potentially unexpected arguments. It is recommended to set the
> shell option to a non-falsy value. See [#286] for more details.

#### `execFile(file, args, callback)`

When using `child_process.execFile` without the `options` argument, use
`shescape.escapeAll` to escape all `args`.

```js
import { execFile } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "\x00world";

/* 2. Execute shell command */
execFile(
  "echo",
  shescape.escapeAll(["Hello", userInput, "!"]),
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello world !"
    }
  }
);
```

#### `execFile(file, args, options, callback)`

When using `child_process.execFile` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `shescape.quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `shescape.escapeAll` to escape all
`args`.

```js
import { execFile } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execFileOptions = {
  // Example configuration for `execFile`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `execFile`. DO NOT
  // set any keys from the child_process API here.
  ...execFileOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
execFile(
  "echo",
  execFileOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput], shescapeOptions)
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput], shescapeOptions),
  execFileOptions,
  (error, stdout) => {
    if (error) {
      console.error(`An error occurred: ${error}`);
    } else {
      console.log(stdout);
      // Output:  "Hello && ls"
    }
  }
);
```

#### `execFileSync(file, args)`

When using `child_process.execFileSync` without the `options` argument, use
`shescape.escapeAll` to escape all `args`.

```js
import { execFileSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "\x00world";

/* 2. Execute shell command */
try {
  const stdout = execFileSync(
    "echo",
    shescape.escapeAll(["Hello", userInput, "!"])
  );
  console.log(`${stdout}`);
  // Output:  "Hello world !"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

#### `execFileSync(file, args, options)`

When using `child_process.execFile` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `shescape.quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `shescape.escapeAll` to escape all
`args`.

> **Warning**: Using `execFileSync` with a shell may result in `args` not being
> passed properly to the `command`, depending on the shell being used. See
> [nodejs/node#43333].

```js
import { execFileSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const execFileOptions = {
  // Example configuration for `execFileSync`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `execFileSync`. DO
  // NOT set any keys from the child_process API here.
  ...execFileOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
try {
  const stdout = execFileSync(
    "echo",
    execFileOptions.shell
      ? // When the `shell` option is configured, arguments should be quoted
        shescape.quoteAll(["Hello", userInput], shescapeOptions)
      : // When the `shell` option is NOT configured, arguments should NOT be quoted
        shescape.escapeAll(["Hello", userInput], shescapeOptions),
    execFileOptions
  );
  console.log(`${stdout}`);
  // Output:  "Hello && ls"
} catch (error) {
  console.error(`An error occurred: ${error}`);
}
```

### [`fork`]

> **Warning**: When using Shescape with `fork`, certain characters are
> unnecessarily escaped. This leads to potentially unexpected arguments. See
> [#286] for more details.

#### `fork(modulePath, args)`

When using `child_process.fork` without the `options` argument, use
`shescape.escapeAll` to escape all `args`.

```js
// echo.js

import { fork } from "node:child_process";
import { argv } from "node:process";
import * as shescape from "shescape";

if (argv[2] === "Hello") {
  console.log(`${argv[2]} ${argv[3]} ${argv[4]}`);
  // Output:  "Hello world !"
} else {
  /* 1. Collect user input */
  const userInput = "\x00world";

  /* 2. Execute a Node.js module */
  const echo = fork("echo.js", shescape.escapeAll(["Hello", userInput, "!"]));
  echo.on("error", (error) => {
    console.error(`An error occurred: ${error}`);
  });
}
```

#### `fork(modulePath, args, options)`

When using `child_process.fork` with the `options` argument, use
`shescape.escapeAll` to escape all `args`.

```js
// echo.js

import { fork } from "node:child_process";
import { argv } from "node:process";
import * as shescape from "shescape";

if (argv[2] === "Hello") {
  console.log(`${argv[2]} ${argv[3]} ${argv[4]}`);
  // Output:  "Hello world !"
} else {
  /* 1. Set up configuration */
  const forkOptions = {
    // Example configuration for `fork`
    detached: true,
  };
  const shescapeOptions = {
    // Set options for Shescape first, then add the options for `fork`. DO NOT set
    // any keys from the child_process API here.
    ...forkOptions,
  };

  /* 2. Collect user input */
  const userInput = "\x00world";

  /* 3. Execute a Node.js module */
  const echo = fork(
    "echo.js",
    shescape.escapeAll(["Hello", userInput, "!"], shescapeOptions),
    forkOptions
  );
  echo.on("error", (error) => {
    console.error(`An error occurred: ${error}`);
  });
}
```

### [`spawn`] / [`spawnSync`]

> **Warning**: When using Shescape with `spawn` / `spawnSync`, certain
> characters are unnecessarily escaped if no shell is explicitly configured.
> This leads to potentially unexpected arguments. It is recommended to set the
> shell option to a non-falsy value. See [#286] for more details.

#### `spawn(command, args)`

When using `child_process.spawn` without the `options` argument, use
`shescape.escapeAll` to escape all `args`.

```js
import { spawn } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "\x00world";

/* 2. Execute shell command */
const echo = spawn("echo", shescape.escapeAll(["Hello", userInput, "!"]));
echo.on("error", (error) => {
  console.error(`An error occurred: ${error}`);
});
echo.stdout.on("data", (data) => {
  console.log(`${data}`);
  // Output:  "Hello world !"
});
```

#### `spawn(command, args, options)`

When using `child_process.spawn` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `shescape.quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `shescape.escapeAll` to escape all
`args`.

```js
import { spawn } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const spawnOptions = {
  // Example configuration for `spawn`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `spawn`. DO NOT
  // set any keys from the child_process API here.
  ...spawnOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
const echo = spawn(
  "echo",
  spawnOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput], shescapeOptions)
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput], shescapeOptions),
  spawnOptions
);
echo.on("error", (error) => {
  console.error(`An error occurred: ${error}`);
});
echo.stdout.on("data", (data) => {
  console.log(`${data}`);
  // Output:  "Hello && ls"
});
```

#### `spawnSync(command, args)`

When using `child_process.spawnSync` without the `options` argument, use
`shescape.escapeAll` to escape all `args`.

```js
import { spawnSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Collect user input */
const userInput = "\x00world";

/* 2. Execute shell command */
const echo = spawnSync("echo", shescape.escapeAll(["Hello", userInput, "!"]));
if (echo.error) {
  console.error(`An error occurred: ${echo.error}`);
} else {
  console.log(`${echo.stdout}`);
  // Output:  "Hello world !"
}
```

#### `spawnSync(command, args, options)`

When using `child_process.spawnSync` with the `options` argument, always provide
the `options` argument to Shescape as well. If `options.shell` is set to a
truthy value, use `shescape.quoteAll` to escape all `args`. If `options.shell`
is set to a falsy value (or omitted), use `shescape.escapeAll` to escape all
`args`.

```js
import { spawnSync } from "node:child_process";
import * as shescape from "shescape";

/* 1. Set up configuration */
const spawnOptions = {
  // Example configuration for `spawn`
  shell: "/bin/bash",
};
const shescapeOptions = {
  // Set options for Shescape first, then add the options for `spawnSync`. DO
  // NOT set any keys from the child_process API here.
  ...spawnOptions,
};

/* 2. Collect user input */
const userInput = "&& ls";

/* 3. Execute shell command */
const echo = spawnSync(
  "echo",
  spawnOptions.shell
    ? // When the `shell` option is configured, arguments should be quoted
      shescape.quoteAll(["Hello", userInput], shescapeOptions)
    : // When the `shell` option is NOT configured, arguments should NOT be quoted
      shescape.escapeAll(["Hello", userInput], shescapeOptions),
  spawnOptions
);
if (echo.error) {
  console.error(`An error occurred: ${echo.error}`);
} else {
  console.log(`${echo.stdout}`);
  // Output:  "Hello && ls"
}
```

[#286]: https://github.com/ericcornelissen/shescape/issues/286
[`exec`]: https://nodejs.org/api/child_process.html#child_processexeccommand-options-callback
[`execfile`]: https://nodejs.org/api/child_process.html#child_processexecfilefile-args-options-callback
[`execsync`]: https://nodejs.org/api/child_process.html#child_processexecsynccommand-options
[`execfilesync`]: https://nodejs.org/api/child_process.html#child_processexecfilesyncfile-args-options
[`fork`]: https://nodejs.org/api/child_process.html#child_processforkmodulepath-args-options
[`node:child_process`]: https://nodejs.org/api/child_process.html
[`spawn`]: https://nodejs.org/api/child_process.html#child_processspawncommand-args-options
[`spawnsync`]: https://nodejs.org/api/child_process.html#child_processspawnsynccommand-args-options
[nodejs/node#43333]: https://github.com/nodejs/node/issues/43333