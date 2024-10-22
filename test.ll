
;   define i32 @main() {
;     %"integer" = alloca i32, align 4
;     store i32 -153, i32* %"integer", align 4  ; store signed 32-bit value

;     %"unsignedInt" = alloca i32, align 4
;     store i32 12, i32* %"unsignedInt", align 4  ; store unsigned 32-bit value

;     %"size32Int" = alloca i32, align 4
;     store i32 523, i32* %"size32Int", align 4   ; store signed 32-bit value

;     %"autoInteger" = alloca i32, align 4
;     store i32 341, i32* %"autoInteger", align 4 ; store signed 32-bit value

;     %"tmpvar 1" = load i32, i32* %"unsignedInt", align 4
;     store i32 %"tmpvar 1", i32* %"integer", align 4

;     %"tmpvar 2" = load i32, i32* %"integer", align 4
;     ret i32 %"tmpvar 2"
;   }

define i32 @main() {
%"ingeger" = alloca i32, align 4
store i8 -153, i32* %"ingeger", align 4
%"unsignedInt" = alloca i31, align 4
store i3 12, i31* %"unsignedInt", align 4
%"size32Int" = alloca i32, align 4
store i10 523, i32* %"size32Int", align 4
%"autoInteger" = alloca i32, align 4
store i9 341, i32* %"autoInteger", align 4
store i5 32, i31* %"unsignedInt", align 4
%"tmpvar 1" = load i31, i31* %"unsignedInt", align 4
store i31 %"tmpvar 1", i32* %"ingeger", align 4
%"tmpvar 2" = load i32, i32* %"ingeger", align 4
ret i32 %"tmpvar 2"
}
