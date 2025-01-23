type A = (value: number) => 10;
type B = (value: number) => number;

let a: A = (value) => 10;
let b: B = (value) => value;

a = b; // 오류
b = a; // OK
// 결론: 티런 타입의 호환은 Super타입과 Sub 타입의 호환이 유지된다.
