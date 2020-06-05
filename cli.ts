#!/usr/bin/env -S deno

import { parse } from "https://deno.land/std/flags/mod.ts";
import { taskkill } from "./mod.ts";

function getHelpText(): string {
  return `
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
--username,   - User specified by User or Domain\\User. 
--password,   - Password of the user account.
--filter,     - Types of processes to termination.

Examples:
  $ taskkill 1337
  $ taskkill 1337 --force
  $ taskkill --force --filter "USERNAME eq NT AUTHORITY\\SYSTEM"
  $ taskkill --system srvmain --force
  $ taskkill --system srvmain --username maindom\\hiropln --password p@ssW23
`;
}

function help(): void {
  const helpText = getHelpText();
  console.log(helpText);
}

async function cli() {
  const args = parse(Deno.args);

  if (args._.includes("help") || args._.includes("h") || args.h || args.help) {
    help();
  } else {
    try {
      console.log(
        await taskkill(
          [
            ...args._.map((a) => parseInt(a.toString(), 10)).filter(
              (a) => !isNaN(a)
            ),
          ],
          {
            system: args.system,
            username: args.username,
            password: args.password,
            filter: args.filter,
            force: args.force,
            tree: args.tree,
          }
        )
      );
    } catch (error) {
      console.log(error);
    }
  }
}

cli();
