let num: number = 10 as never;
// 10은 number 타입이고
// never은 모든 타입의 서브 타입.
// 따라서 10이 super type이므로 타입 단언이 가능.

let num2: number = 10 as unknown;
// 10은 number 타입이고
// unknown은 모든 타입의 슈퍼 타입.
// 10은 unknown의 서브 타입이므로 타입 단언이 가능.

let num3 = 10 as string;
// 10은 number 타입이고
// string은 number와 연관성이 없는 타입이므로 타입 단언이 불가능.

// 아래는 좋지 않은 단언 샘플.
let num4 = 10 as unknown as string;
