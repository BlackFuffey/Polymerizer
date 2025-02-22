# Polymerizer
An LLVM based compiler for [Kevlar](https://github.com/BlackFuffey/Kevlar) \
\
This project is far from complete, and since I don't have any experience of writing compilers, it will probably remain so for some time. \
Feel free to check back once in a while!

# Roadmap
Here's an overview of where the compiler is at currently:

|  Feature | Lexer | CST | AST | Codegen |
|:--------:|:-----:|:---:|:---:|:-------:|
| int/uint |  yes  | yes | yes |    no   |
|  boolean |  yes  | yes | yes |    no   |
|   float  |  yes  | yes | yes |    no   |
|  if/else |  yes  | yes |  no |    no   |

No codegen functionalities has been implemented yet due to my lack of experience with C/C++. 

# Contribution
This project is in really early stage right now and is moving slowly due to the fact that I am a solo developer without much free time, so any contributions are appriciated. \
By contributing, you agree that your contributions will be licensed under the [GNU General Public License Version 3](https://www.gnu.org/licenses/gpl-3.0.en.html)

# Usage
```
polyc path/to/program.kev [--flag1] [--flag2] [--flag3] ...
```
For help page, run `polyc` without any arguments.

# Build
## Build Dependencies
```
node
```
## Instructions
Clone repo, cd in, and run:
```
npm install
npm run build-ts
```
You can find the launch script in bin/polyc \
To make polyc globally accessible, run
```
sudo npm link
```
