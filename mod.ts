export type OptionsType = {
  system?: string;
  username?: string;
  password?: string;
  filter?: string;
  tree?: boolean;
  force?: boolean;
};

async function taskkill(
  input: (number | string)[] = [],
  {
    system,
    username,
    password,
    filter,
    force = false,
    tree = false,
  }: OptionsType
): Promise<{ status: Deno.ProcessStatus; output: string }> {
  if (Deno.build.os !== "windows") {
    throw new Error("Windows only");
  }

  if (input.length === 0) {
    throw new Error("PID or image name required");
  }

  const args = [];

  if (system && username && password) {
    args.push("/s", system, "/u", username, "/p", password);
  }

  if (filter) {
    args.push("/fi", filter);
  }

  if (force) {
    args.push("/f");
  }

  if (tree) {
    args.push("/t");
  }

  for (const x of input) {
    args.push(typeof x === "number" ? "/pid" : "/im", x.toString());
  }

  let p = Deno.run({
    cmd: ["taskkill.exe", ...args],
    stdout: "piped",
    stderr: "piped",
  });

  let output = "";
  const decode = new TextDecoder();
  const status = await p.status();

  if (status.code === 0) {
    const rawOutput = await p.output();
    output = decode.decode(rawOutput);
  } else {
    const rawError = await p.stderrOutput();
    output = decode.decode(rawError);
  }

  p.stdout?.close()
  p.stderr?.close()
  p.close();

  return { status, output };
}

export { taskkill };
export default taskkill;
