# Polymerizer
An LLVM based compiler for [Kevlar](https://github.com/BlackFuffey/Kevlar) \
\
This project is incomplete, and since I don't have any experience of writing compilers, it will probably remain so for some time. \
Feel free to check back once in a while!

# Usage
`polyc path/to/program.kev [--flag1] [--flag2] [--flag3] ...` \
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
