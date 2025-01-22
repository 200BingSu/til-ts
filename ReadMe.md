# 타입 좁히기(Type Narrowing)

- 값의 타입을 조금씩 구체적으로 좁혀서 사용하는 것.
- 예를 들면, `string | number`가 있는데, `string`과 `number`에 따라 기능을 별도로 구현.
- 조건문과 타입 체크를 사용해서 좁혀나갑니다.
- if 조건문을 이용해서 타입을 좁히는 과정을 흔히 `타입 가드`라고 합니다.

## 1. `typeof`로 타입 좁히기

- 값의 타입을 확인하고 조건에 따라서 실행.

```ts
function func(value: string | number | Date) {
  if (typeof value === "string") {
    value.toUpperCase();
  } else if (typeof value === "number") {
    value.toFixed(2);
  } else if (typeof value === "object") {
    // 위험: 배열을 넣을 경우 에러 발생
    value.getTime();
  }
}
const obj = {};
func(obj); // 에러 발생
```

## 2. `instanceof`로 타입 좁히기

```ts
function func(value: string | number | Date) {
  if (typeof value === "string") {
    value.toUpperCase();
  } else if (typeof value === "number") {
    value.toFixed(2);
  } else if (value instanceof Date) {
    //Date라는 것을 보장 받음
    value.getTime();
  }
}
```

## 3. `in`으로 타입 좁히기

```ts
type Person = {
  name: string;
  age: number;
};

function func(value: string | number | Date | null | Person) {
  if (typeof value === "string") {
    value.toUpperCase();
  } else if (typeof value === "number") {
    value.toFixed(2);
  } else if (value instanceof Date) {
    //Date라는 것을 보장 받음
    value.getTime();
  } else if ("age" in (value as Person)) {
    console.log((value as Person).age);
  }
}
```

```ts
type Person = {
  name: string;
  age: number;
};

function func(value: string | number | Date | null | Person) {
  if (typeof value === "string") {
    value.toUpperCase();
  } else if (typeof value === "number") {
    value.toFixed(2);
  } else if (value instanceof Date) {
    //Date라는 것을 보장 받음
    value.getTime();
  }
  //else if (value instanceof Person) {}
  //else if ("age" in value) {} //오류
  // else if (value && "age" in value) {
  //   console.log((value as Person).age);
  // }  // 성공
  else if (value as Person) {
    console.log((value as Person).age);
  }
}
```
