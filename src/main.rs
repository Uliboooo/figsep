use std::fmt::Display;

fn main() {
    let mut args = std::env::args();
    let mut w = String::new();
    let i = match args.nth(1) {
        Some(a) => a,
        None => {
            println!("please input section name.");
            std::io::stdin().read_line(&mut w).unwrap();
            w
        }
    };

    let s = std::process::Command::new("figlet")
        .args([i.as_str()])
        .output()
        .unwrap()
        .stdout;

    let sw = String::from_utf8_lossy(&s).to_string();
    let sep = BetterString::from("=") * 80;
    let f = format!("{}\n{}{}\n", sep, sw, sep);
    println!("{f}");
}

struct BetterString(String);

impl Display for BetterString {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(f, "{}", self.0)
    }
}

impl From<&str> for BetterString {
    fn from(value: &str) -> Self {
        Self(value.to_string())
    }
}

impl std::ops::Mul<usize> for BetterString {
    type Output = Self;

    fn mul(self, rhs: usize) -> Self::Output {
        BetterString(self.0.repeat(rhs))
    }
}
