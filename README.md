# figsep(AA strings config separator generator)

## Usage

```sh
nix develop
bun install
bun run figsep -- "Display" "Keybinds"
```

Horizontal borders are hidden by default. Use JavaScript-style comments or
enable either border as needed:

```sh
bun run figsep -- --style slash "Display"
bun run figsep -- --border "Display"
bun run figsep -- --top-border "Display"
bun run figsep -- --bottom-border "Display"
```

<img width="350" height="246" alt="image" src="https://github.com/user-attachments/assets/1d0b9cd7-a6b7-4ff3-aa06-62ef5725b796" />


## Requirements

- [Nix](https://nixos.org/)
