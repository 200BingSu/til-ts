// 리터럴은 실제 값을 말한다.
// 아래는 "hello"는 "hello" 라는 리터럴이다.
let str: string = "hello";
// const 상수로 만들면 값은 "hello"로 고정이 됩니다.
const constStr: "hello" = "hello";
// 그러나 어찌되었든 "hello"는 string이다.

// "hello" 리터럴은 문자열에 포함된다((업캐스팅된다.))
str = constStr;

// 리터럴로 표현하면
let num: 100 = 100;
// 100 리터럴은 숫자형에 포함된다. (업캐스팅된다)
let num2: number = num;
