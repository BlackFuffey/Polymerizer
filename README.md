# Polymerizer
An LLVM based compiler for [Kevlar](https://github.com/BlackFuffey/kevlar) \
\
This project is incomplete, and since I don't have any experience of writing compilers, it will probably remain so for a while. \
Feel free to check back once in a while!

# Usage
`polyc path/to/program.kev`

# Build
## Build Dependencies
```
node
clang
```
## Instructions
Clone repo, cd in, and run:
```
npm install
npm run build
```
You can find the entry script in bin/polyc \
To make polyc a globally executable command, run
```
sudo npm link
```
