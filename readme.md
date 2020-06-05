# win_taskkill ![Build status](https://github.com/rjoydip/win_taskkill/workflows/ci/badge.svg)

> Wrapper for the Windows [`taskkill`](https://technet.microsoft.com/en-us/library/bb491009.aspx) command. Ends one or more tasks or processes.

**Port of [taskkill](https://github.com/sindresorhus/taskkill)**

> Note: **Test is incomplete (Welcome for PR)** due to "Bad resourse ID" <https://github.com/denoland/deno/issues/4830> <https://github.com/denoland/deno/issues/2703> <https://github.com/denoland/deno/issues/2692>

## Install

```sh
deno install --allow-run -f --name taskkill "deno.land/x/win_taskkill/cli.ts"
```

## Usage CLI

```sh
$ taskkill --help

Usage
  $ taskkill [<pid> …]

Description:

Wrapper for the Windows command. Ends one or more tasks or processes.

Options:

--help -h,    - Show this help.
--force       - Forcefully stop process.
--tree,       - Terminate all child processes.
--system,     - Name or IP address of a remote computer.
--username,   - User specified by User or Domain\User.
--password,   - Password of the user account.
--filter,     - Types of processes to termination.

Examples:
  $ taskkill 1337
  $ taskkill 1337 --force
  $ taskkill --force --filter "USERNAME eq NT AUTHORITY\SYSTEM"
  $ taskkill --system srvmain --force
  $ taskkill --system srvmain --username maindom\hiropln --password p@ssW23
```

## Usage API

```ts
import { win_taskkill } from "deno.land/x/win_taskkill/mod.ts";
// or
import win_taskkill from "deno.land/x/win_taskkill/mod.ts";

(async () => {
 await taskkill([4970, 4512]);
})();
```

## API

See the [`taskkill` docs](https://technet.microsoft.com/en-us/library/bb491009.aspx) for more.

### taskkill(input, [options])

Returns a `Promise`.

#### input

Type: `number[] | string[]`

One or more process IDs or image names, but not mixed.

#### options

The `system`, `username`, `password` options are mutually inclusive.

##### system

Type: `string`

Name or IP address of a remote computer (do not use backslashes). The default is the local computer.

##### username

Type: `string`

User specified by User or Domain\User. The default is the permissions of the current logged on user on the computer issuing the command.

##### password

Type: `string`

Password of the user account for the specified `username`.

##### filter

Type: `string`

Types of processes to include or exclude from termination.

See the [`taskkill` docs](https://technet.microsoft.com/en-us/library/bb491009.aspx) for supported filters.

##### force

Type: `boolean`

Forcefully terminate processes. Ignored for remote processes as all remote processes are forcefully terminated.

##### tree

Type: `boolean`

Terminate all child processes along with the parent process, commonly known as a tree kill.

## Inspired

- [taskkill](https://github.com/sindresorhus/taskkill) - Wrapper for the Windows `taskkill` command. Ends one or more tasks or processes.
