#!/usr/bin/env bun

import CFonts from "cfonts";
import stringWidth from "string-width";

const labels = Bun.argv.slice(2);

if (labels.length === 0) {
  console.error("Usage: figsep <label> [label ...]");
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
  const border = "#".repeat(maxWidth + 5);

  console.log(border);

  for (const line of lines) {
    const padding = " ".repeat(maxWidth - stringWidth(line) + 1);
    console.log(`# ${line}${padding} #`);
  }

  console.log(`${border}\n`);
}
