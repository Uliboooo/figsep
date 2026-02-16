# figsep

Generate styled section banners for config files using [figlet](https://github.com/cmatsuoka/figlet).

```
================================================================================
  __ _                      
 / _(_) __ _ ___  ___ _ __  
| |_| |/ _` / __|/ _ \ '_ \ 
|  _| | (_| \__ \  __/ |_) |
|_| |_|\__, |___/\___| .__/ 
       |___/         |_|    
================================================================================



```

## Overview

`figsep` wraps `figlet` to produce eye-catching section separators — ideal for `.conf`, `.ini`, or any config file where readability matters.

## Requirements

- Rust (edition 2024)
- [`figlet`](https://github.com/cmatsuoka/figlet) installed and available in `$PATH`

## Usage

```bash
# Pass section name as an argument
figsep example

# Or run interactively (prompted for input)
figsep
```

### Output

```
================================================================================
                                _      
  _____  ____ _ _ __ ___  _ __ | | ___ 
 / _ \ \/ / _` | '_ ` _ \| '_ \| |/ _ \
|  __/>  < (_| | | | | | | |_) | |  __/
 \___/_/\_\__,_|_| |_| |_| .__/|_|\___|
                         |_|           
================================================================================

```

Paste the output directly into your config file as a section header.

## License

MIT
