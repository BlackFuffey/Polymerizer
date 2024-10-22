define i32 @main() {
    %1 = alloca i32, align 4
    store i3 2, i32* %1, align 4
    %2 = load i32, i32* %1, align 4
    ret i32 %2
}
