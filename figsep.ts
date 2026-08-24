#!/usr/bin/env bun

import CFonts from "cfonts";
import stringWidth from "string-width";

type Style = "hash" | "slash" | "hyphen";

const VERSION = "0.2.0";

const usage = `Usage: figsep [options] <label> [label ...]

Options:
  --style <hash|slash|hyphen>  Comment style (default: hash)
  --border             Show both the top and bottom borders
  --top-border         Show the top border
  --bottom-border      Show the bottom border
  --no-top-border      Hide the top border
  --no-bottom-border   Hide the bottom border
  -h, --help           Show this help
  --version            Show version`;

let style: Style = "hash";
let topBorder = false;
let bottomBorder = false;
const labels: string[] = [];
const args = Bun.argv.slice(2);

for (let index = 0; index < args.length; index += 1) {
  const arg = args[index];

  if (arg === "--") {
    labels.push(...args.slice(index + 1));
    break;
  }

  if (arg === "-h" || arg === "--help") {
    console.log(usage);
    process.exit(0);
  }

  if (arg === "--border") {
    topBorder = true;
    bottomBorder = true;
    continue;
  }

  if (arg === "--top-border") {
    topBorder = true;
    continue;
  }

  if (arg === "--bottom-border") {
    bottomBorder = true;
    continue;
  }

  if (arg === "--no-top-border") {
    topBorder = false;
    continue;
  }

  if (arg === "--no-bottom-border") {
    bottomBorder = false;
    continue;
  }

  if (arg === "--style") {
    const value = args[index + 1];

    if (value !== "hash" && value !== "slash" && value !== "hyphen") {
      console.error("--style must be either 'hash' or 'slash' or 'hyphen'");
      process.exit(1);
    }

    style = value;
    index += 1;
    continue;
  }

  if (arg === "--version") {
    console.log(VERSION);
    process.exit(0);
  }

  if (arg.startsWith("--style=")) {
    const value = arg.slice("--style=".length);

    if (value !== "hash" && value !== "slash" && value !== "hyphen") {
      console.error("--style must be either 'hash' or 'slash' or 'hyphen'");
      process.exit(1);
    }

    style = value;
    continue;
  }

  if (arg.startsWith("-")) {
    console.error(`Unknown option: ${arg}`);
    process.exit(1);
  }

  labels.push(arg);
}

if (labels.length === 0) {
  console.error(usage);
  process.exit(1);
}

for (const label of labels) {
  const rendered = CFonts.render(label, {
    font: "chrome",
    align: "left",
    colors: ["system"],
    background: "transparent",
    letterSpacing: 1,
    lineHeight: 1,
    space: true,
    maxLength: 0,
  });

  const output = typeof rendered === "object" ? rendered.string : label;

  const lines = output
    .replaceAll("\r", "")
    .split("\n")
    .filter((line) => line.trim().length > 0);

  const maxWidth = Math.max(0, ...lines.map((line) => stringWidth(line)));
  const border = () => {
    switch (style) {
      case "hash":
        return "#".repeat(maxWidth + 2);
      case "slash":
        return `//${"=".repeat(maxWidth + 1)}`;
      case "hyphen":
        return "-".repeat(maxWidth + 2);
    }
  };

  if (topBorder) {
    console.log(border());
  }

  for (const line of lines) {
    // if (style === "hash") {
    //   console.log(`# ${line}`);
    // } else {
    //   console.log(`// ${line}`);
    // }

    switch (style) {
      case "hash":
        console.log(`# ${line}`);
        break;
      case "slash":
        console.log(`// ${line}`);
        break;
      case "hyphen":
        console.log(`-- ${line}`);
        break;
    }
  }

  if (bottomBorder) {
    console.log(border());
  }

  console.log();
}
