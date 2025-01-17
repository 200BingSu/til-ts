# 타입스크립트란

- `변수, 매개변수, 함수 리턴값의 데이터 종류를 작성`해주는 것.

## 어노테이션(Annotation)

- 주석, 부가정보
- 코드에 대한 설명, 추가적 정보를 제공한다.

### typescript 어노테이션

```ts
const 변수명: 데이터 타입 = 값;
function 함수명(매개변수: 데이터 타입): 리턴의 데이터 타입 {
  return 값;
}
```

### 메타데이터 어노테이션

- 일반적인 자바스크립트와 달리 NOde.js 또는 Spring에서 자주 봅니다.
- @기호를 어노테이션이라고 한다.
- 추가적인 정보를 제공하고 기능도 부여한다.

```java
@어노테이션
@Entity
@Table(name = "테이블명")
public void 함수명(){}
```

## ts 어노테이션을 이용한 기본 데이터(primitive) 종류 명시

### 1. 변수 어노테이션

- `const 변수명: 데이터종류= 값;`

```ts
let num: number = 1;
let num1: number = 1.5;
let num2: number = 0x10;
let num3: number = Infinity;
let num4: number = -Infinity;
let num5: number = NaN;

let str: string = "안녕하세요";

let bool: boolean = true;

let un: undefined = undefined;

let nu: null = null;

let hi: "안녕" = "안녕";
// hi = "안녕하세요"; // 오류

const age: 5 = 10; // 오류
```

### 2. 타입 추론을 확인하고 잘못된 추론이면 직접 관여한다.

- 일단 타입 추론을 적극적으로 반영한다.
- 필요시 어노테이션을 변경한다.

```ts
let num: number | string = 1;
const go = "안녕";
num = "hello";
```

### 3. ts의 데이터 종류

- unknown
- any
- null
- void
- undefined
- never
- number
- Number Enum
- bigint
- string
- String Enum
- symbol
- unique symbol
- object
- array
- tuple
- function
- constructor

## 객체 중 배열과 Tuple

### 1. 배열

- 배열을 만드는 법 1

```ts
const arr1 = [1, 2, 3];
console.log(arr);
```

- 배열을 만드는 법 2(어노테이션)

```ts
const arr2: number[] = [1, 2, 3];
```

- 배열을 만드는 법 3

```ts
const arr3: Array<number> = [1, 2, 3];
```

```ts
// 배열
const arr = [1, 2, 3];
console.log(arr);
const arr2: number[] = [1, 2, 3];
// `제네릭` 문법 활용시 <데이터 종류>
const arr3: Array<number | string> = [1, 2, 3];
arr3[0] = "반가워"; // 오류

// 배열
const arr4 = ["안녕", "반가워"];
const arr5: string[] = ["안녕", "반가워"];
// `제네릭` 문법 활용시
const arr6: Array<string | number> = ["안녕", "반가워"];
arr6[1] = 5000; // 오류

// 배열
const arr7 = [1000, "사과"];
const arr8: (number | string)[] = [1000, "사과"];
const arr9: Array<number | string | boolean> = [1000, "사과"];
arr9[1] = false;
```

```ts
// 객체 배열
const todos = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: false },
  { id: 3, title: "타입스크립트", complete: false },
];
const todos2: {
  id: number;
  title: string;
  complete: boolean;
}[] = [];

const todos3: Array<{
  id: number;
  title: string;
  complete: boolean;
}> = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: false },
  { id: 3, title: "타입스크립트", complete: false },
];
```

### 2. Tuple

- Tuple은 ts에만 있다.
- Tuple은 배열의 어노테이션입니다.
- Tuple은 배열의 길이와 데이터 종류를 고정해 버린다.
- Tuple은 배열의 요소를 추가, 삭제 못한다.

```ts
// 배열
const arr = [1, 2, 3];
let arrT: [number, number, number | string] = [1, 2, 3];
arrT = [1, 2, 3]; // 오류: 정해진 배열 길이 초과
arrT = [1, 3, "안녕"]; // 오류: 데이터 타입
const arr2: number[] = [1, 2, 3];
const arrT2: [number, number, number] = [1, 2, 3];
// `제네릭` 문법 활용시 <데이터 종류>
const arr3: Array<number | string> = [1, 2, 3];
const arrT3: [number | string, number, number] = [1, 2, 3];
arrT3[0] = "반가워"; // 오류

// 배열
const arr4: [string, string] = ["안녕", "반가워"];

const arr5: [string, string] = ["안녕", "반가워"];
// `제네릭` 문법 활용시
const arr6: [string, string | number] = ["안녕", "반가워"];
arr6[1] = 5000; // 오류

// 배열
const arr7: [number, string] = [1000, "사과"];
const arr8: (number | string)[] = [1000, "사과"];
const arr9: Array<number | string | boolean> = [1000, "사과"];
arr9[1] = false;

// 객체 배열
const todos: [
  {
    id: number;
    title: string;
    complete: boolean;
  },
  {
    id: number;
    title: string;
    complete: boolean;
  },
  {
    id: number;
    title: string;
    complete: boolean;
  }
] = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: false },
  { id: 3, title: "타입스크립트", complete: false },
];
const todos2: {
  id: number;
  title: string;
  complete: boolean;
}[] = [];

const todos3: Array<{
  id: number;
  title: string;
  complete: boolean;
}> = [
  { id: 1, title: "안녕", complete: false },
  { id: 2, title: "리액트", complete: false },
  { id: 3, title: "타입스크립트", complete: false },
];
```

### 3. 배열과 튜플의 메소드는 동일함.

- 배열임
- pop, push는 정상 작동 되어버린다.
- 그래서 튜플을 사용하는 경우가 적다.

```ts
let arrT: [number, number, number | string] = [1, 2, 3];
arrT.push(7); //메서드로 인한 추가는 오류가 뜨지 않는다.
```

## 객체 리터럴

```ts
let user: {
  name: string;
  age: number;
} = {
  name: "hong",
  age: 10,
};
let user2: {
  name: string;
  age: number;
} = {
  name: "kim",
  age: 20,
};

//  옵션 제공
let user3: {
  name: string;
  age: number;
  job?: string; // 옵션 적용
} = {
  name: "hong",
  age: 10,
};
user3.job = "학생"; // 오류

// 문제 발생
let user4: {
  readonly name: string; // 변경 금지
  age: number;
} = {
  name: "hong",
  age: 10,
};
user4.name = "배신자"; // 오류
```

## 타입 별칭

- 기존의 데이터 종류에 `새로운 이름으로 타입 만드는 문법`
- 작성법은 `type 파스칼케이스= 데이터형`로 선언함

```ts
type Member = {
  id: number;
  name: string;
  age: number;
  email: string;
  role: string;
  isAdmin: boolean;
  createAt: string;
};

const user_hong: Member = {
  id: 1,
  name: "홍길동",
  age: 10,
  email: "a@a.net",
  role: "guest",
  isAdmin: false,
  createAt: "2024-12-24",
};
const user_park: Member = {
  id: 2,
  name: "둘리",
  age: 10000,
  email: "d@a.net",
  role: "member",
  isAdmin: false,
  createAt: "0000-12-24",
};
```

### 1. 타입 별칭 주의사항

- 동일한 이름으로 type을 재정의할 수 없다.
- 인덱스 시그니처를 잘 이해하여야 한다.

```ts
export type Member = {
  id: number;
  name: string;
  age: number;
  email: string;
  role: string;
  isAdmin: boolean;
  createAt: string;
  phone?: string;
};
// 아래처럼 타입은 재정의하지 못한다.
export type Member = {}; //오류
```

- 인덱스 시그니처의 이해

### type의 내용 정리

- `/src/types 폴더`를 통상 생성합니다.
- 폴더 내에 type만 정의한 ts 파일들이 다수 존재함.

```ts
export type Todo = {
  id: number;
  title: string;
  content: string;
  complete: boolean;
  date: Date;
};

export type User = {
  nickName: string;
  role: string;
  follow: string[];
};

export type Cart = {
  goodId: string[];
  total: number;
  count: number;
};
```

## Enum

- `/src/constants 폴더` 생성
  : colors.ts, value.ts, country.ts ..

```ts
// 회원의 등급을 설정하려고 합니다.
// 특정 사항에 대해서 상수화 시켜서 코드를 관리하려는 의도

// 3은 관리자
// 2는 사장님
// 1은 회원
// 0은 방문객

// "admin" 관리자
// "owner" 사장님
// "member" 회원
// "guest" 방문객

const Admin = 3;
const Owner = 2;
const Member = 1;
const Guest = 0;

const user_hong = {
  nickName: "홍길동",
  role: Admin,
};
const user_park = {
  nickName: "둘리",
  role: Owner,
};
```

- 위의 상수 정의는 관리가 모호함. (주석이 없을 경우 의미 전달이 어렵기 때문에)
- enum을 도입해서 상수를 묶어서 관리해보기
- = 같은 용도를 모아서 상수의집합을 만들어서 활용해 보기.
- 특정한 값이 없다면 0부터 숫자를 증가시켜 대입

```ts
enum MemberRole {
  Guest,
  Member,
  Owner,
  Admin,
}

const user_go = {
  nickName: "또치",
  role: MemberRole.Guest,
};
```

## any

- ts 안쓰려고 합니다. 즉, `어노테이션을 쓰지 않겠다`라고 선언함.
- 가능하면 any를 안 쓰려고 노력합니다.
- js 버전을 마이그레이션 하는 경우
- 해결이 안되는 경우의 어노테이션을 회피 용도

```ts
let age: any = 15;
age = 100;
age = "안녕";
```

## unknown

- any와 흡사하지만 차이가 있음.
- 타입을 `if 문`, `typeof`, `isArray` 등으로 좁혀가면서 검사를 개발자가 해주어야 한다.
  : 타입 좁히기, 타입 가드
- `타입 단언`(type assertion)
  : `이 타입이 맞다`라고 알려주는 문법

```ts
let age: unknown = "hello";
console.log((age as string).toUpperCase());
```

```ts
type User = {
  id: number;
  name: string;
};

function processAny(person: any): string {
  return person.name;
}
const result1 = processAny({ id: 1, name: "hong" });
const result2 = processAny({ id: 2 });

function processUnknown(person: unknown): string | null {
  if (typeof person === "object" && person !== null && "name" in person) {
    return (person as User).name;
  }
  return null;
}
const result3 = processUnknown({ id: 1, name: "hong" });
const result4 = processUnknown({ id: 2 });
```

### any와 unknownd의 차이

```ts
// any와 unknown의 차이를 이해하자.
let anything: any = "Hello";
anything = 123;
anything.toUpperCase(); // any로 타입을 정해놔서 123인데도 오류가 안 뜬다.
anything.toFixed(2); // 숫자 적용

let unknownItem: unknown = "Hello";

unknownItem = 123;
//  any 보다는 unknown을 사용하자.
unknownItem.toFixed(2); // any와 달리 값을 사용해 처리하려하면 오류 발생
// 단 타입을 검사하는 조건을 넣어서(타입 가드) 안전하게 사용하자.
if (typeof unknownItem === "string") {
  unknownItem.toUpperCase();
}
if (typeof unknownItem === "number") {
  unknownItem.toFixed(2);
}
```

```ts
// 변수 어노테이션
// 매개 변수 타입(학습 안함)
// 함수 리턴 타입(학습 안함)
function processAny(word: any) {
  console.log(word.toUpperCase());
}
processAny("hello");

function processUnknown(word: unknown) {
  // unknown은 type guard를 활용
  // 타입 좁히기
  if (typeof word === "string") {
    console.log(word.toUpperCase());
  } else {
    console.log("글자를 전달하세요.");
  }
}
processUnknown("hello");
processUnknown(123);
```

```ts
// 변수 어노테이션
// 매개 변수 타입(학습 안함)
// 함수 리턴 타입(학습 안함)
function processAny(person: any) {
  console.log(person.nickName.toUpperCase());
}
processAny({ nickName: "홍", age: 10 });
processAny({ age: 10 });

function processUnknown(person: unknown) {
  // unknown은 type guard를 활용
  // 타입 좁히기
  if (
    typeof person === "object" &&
    person !== null &&
    "nickName" in person &&
    typeof person.nickName === "string"
  ) {
    console.log(person.nickName.toUpperCase());
  } else {
    console.log("nickName 속성이 없거나 유효하지 않습니다.");
  }
  if (
    typeof person === "object" &&
    person !== null &&
    "age" in person &&
    typeof person.age === "number"
  ) {
    console.log(person.age.toFixed(2));
  } else {
    console.log("age 속성이 없거나 유효하지 않습니다.");
  }
}
processUnknown("hello");
processUnknown(123);
```

```ts
function processAny(person: any) {
  console.log(person[0].toUpperCase());
}
processAny(["hong", "doori"]);
processAny([123, 456]);

function processUnknown(person: unknown) {
  if (
    Array.isArray(person) &&
    person.length > 0 &&
    typeof person[0] === "string"
  ) {
    console.log(person[0].toUpperCase());
  } else {
    console.log("잘못된 인수 입력입니다.");
  }
}
processUnknown(["hong", "doori"]);
processUnknown([123, 456]);
```

## never

## void
