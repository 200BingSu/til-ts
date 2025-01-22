# 타입 단언(Type Assertion)

- 타입스크립트에게 개발자가 정한 타입을 보증시킴.
- 컴파일러를 속이는 과정.

```ts
type Person = {
  name: string;
  age: number;
};

// 아래는 타입 추론에서 :{} 어노테이션으로 판단.
// 프로퍼티 name, age가 정의된 적이 없다고 오류.
let who = {};
who.name = "hong";
who.age = 100;

// 필수 프로퍼티가 할당 안됨.
let who2: { name: string; age: number } = {};

// 최종 책임을 개발자에게, 타입 검사 취소.
let who4 = {} as Person;
who4.name = "kim";
who4.age = 20;
```

## 1. any 타입을 명확한 타입으로 단언

```ts
let value = "hello";
let count = value.length;
```

## 2. DOM을 활용할 때

```ts
const root = document.getElementById("root") as HTMLInputElement;
const inputTag = document.querySelector("input");
(inputTag as HTMLInputElement).value = "hi";
```

## 3. 유니온 타입 중 하나를 지정하기

```ts
type User = { name: string };
type Admin = { name: string; role: string };

let person: User | Admin = { name: "hong", admin: true };
console.log((person as Admin).admin);
```

## 4. Null이 아닌 값으로 단언

- 절대 `null`이 아니라고 단언.

```ts
let tag = document.querySelector("div");
// 절대 null 아니라고 알려주기.
(tag as HTMLDivElement).innerHTML = "hello";
```

## 5. const 단언

- 편리

```ts
let num = 10 as const;
// as const 활용시 readonly 속성이 붙음.
let animal = {
  name: "cat",
  age: 3,
} as const;

animal.age = 4;

let animal2 = {
  name: "cat",
  age: 3,
};
```

## 6. 타입 좁히기(Type Narrowing)과 함께 활용

```ts
function show(value: string | number) {
  // 타입 좁히기
  if (typeof value === "string") {
    console.log((value as string).toUpperCase());
  } else {
    console.log((value as number).toFixed(2));
  }
}
```

## 7. 타입 단언 사용시 주의 유형.

- 모든 타입을 타입 단언으로 해결되지는 않는다.
- 수퍼 타입과 서브 타입을 고민해야 한다.

```ts
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
```
