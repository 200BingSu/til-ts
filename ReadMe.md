# 함수

- 매개 변수의 데이터 타입 정의
- 함수 실행 후 결과값의 데이터 타입 정의

```ts
// 일반 js로 함수를 설명하는 경우
// 어떤 매개변수를 받고, 연산을 거치고, 최종 결과를 반환함.

// ts = 매개 변수의 타입은 어떤 것이고, 연산을  거치고 어떤 타입의 결과값을 리턴한다.
function add(a: number, b: number): number {
  return a + b;
}
```

## 함수의 매개변수 정의

### 1. 매개변수 기본값 정의

```ts
// ts에서는 매개변수의 타입은 추론 못함
// 아래와 같이 기본값을 통해 타입 추론 가능
function add(a = 1, b = 2) {
  return a + b;
}

add(1, 2);
```

### 2. 선택적 매개변수

- 매개변수를 생략하고 싶다.
- 즉, 있을 수도 없을 수도 있음.

```ts
// ts에서는 매개변수의 타입은 추론 못함
// 아래와 같이 기본값을 통해 타입 추론 가능
function add(a: number, b: number) {
  if (b) {
    return a + b;
  }
  return a;
}

add(5); // 오류: 매개 변수 부족
```

- 매개변수 뒤에 `?`를 통해서 옵션 처리 가능

```ts
// ts에서는 매개변수의 타입은 추론 못함
// 아래와 같이 기본값을 통해 타입 추론 가능
function add(a: number, b?: number) {
  if (b) {
    return a + b;
  }
  return a;
}

add(5);
```

### 3. 선택적 매개변수와 기본값을 혼용할 수 없다.

```ts
function add(a: number, b?: number = 5) {
  if (b) {
    return a + b;
  }
  return a;
}

add(5); // 오류: 매개 변수 부족
```

### 4. 선택적 매개변수와 객체 사용

```ts
type OrderOption = {
  name: string;
  topping?: string;
  size?: string;
};

function makeOrder(option: OrderOption) {
  const { name, topping, size } = option;
  console.log(`${name} ${topping ? topping : ""} ${size ? size : ""}`);
}

makeOrder({ name: "딸기", topping: "땅콩", size: "big" });
makeOrder({ name: "딸기" });
makeOrder({ name: "딸기", topping: "땅콩" });
```

### 5. 선택적 매개변수와 콜백 함수

```ts
type OrderOption = {
  name: string;
  //함수 정의
  callback?: (message: string) => void;
};

function makeOrder(option: OrderOption) {
  const { name, callback } = option;
  const message = `${name}을 구매했어요.`;
  if (callback) {
    callback(message);
  }
}

makeOrder({ name: "책", callback: (message) => console.log(message) }); //결과: 책을 구매했어요.
makeOrder({ name: "딸기" });
```

```ts
// 한번에 모아서 쓰기
type AsnycTask = {
  state: "LOADING" | "FAILED" | "SUCCESS";
  error?: { message: string };
  response?: { data: [] };
};
function result(task: AsnycTask) {
  switch (task.state) {
    case "LOADING":
      break;
    case "FAILED":
      task.error?.message;
      break;
    case "SUCCESS":
      task.response?.data;
      break;
  }
}

// 따로 따로 쓰기
type LoadingTask = {
  state: "LOADING";
};
type FailedTask = {
  state: "FAILED";
  error?: { message: string };
};
type SuccessTask = {
  state: "SUCCESS";
  response?: { data: [] };
};
type AsyncTask2 = LoadingTask | FailedTask | SuccessTask;
function result2(task: AsnycTask) {
  switch (task.state) {
    case "LOADING":
      break;
    case "FAILED":
      task.error?.message;
      break;
    case "SUCCESS":
      task.response?.data;
      break;
  }
}
```

### 6. rest 매개변수

- 일반적 상황

```ts
function add(a: number, b: number, ...rest: number[]) {
  console.log(rest);
}
add(1, 2, 3, 4, 5); //
```

- tuple

```ts
function add(a: number, b: number, ...rest: [number, number, number]) {
  console.log(rest);
}
add(1, 2, 3, 4, 5); // [3, 4, 5]
```

## 함수 타입 표현식

```ts
// 일반적 화살표 함수
const add = (a: number, b: number) => a + b;
// 타입 추론으로 정의된 타입 어노테이션
const add2: (a: number, b: number) => number = (a: number, b: number) => a + b;
```

### 1. type으로 정의

- type 이란? 사용자가 이름을 정한 타입 별칭
- 개발자가 마음대로 이름 정한 타입 별칭

```ts
type Add = (a: number, b: number) => number;
const add3: Add = (a: number, b: number) => a + b;
```

### 2. Call Signature

- 함수의 타입을 별도로 지정하는 또다른 방법
- type을 객체로 생성.

```ts
type Add = (a: number, b: number) => number;
// Call Signature로 타입 정의하기
type AddSignature = {
  // 이름: 결과값 데이터형
  // 프로퍼티 명을 매개변수로 쓰고, 프로퍼티 키 값을 리턴 타입으로 작성
};
const add3: AddSignature = (a: number, b: number) => a + b;
```

## 함수의 타입 호환

### 1. 매개변수가 개수 기준

#### 1.1. 개수가 작은 경우 호환 가능

```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
add(2, 3); // 결과: 5

type Add2 = (a: number, b: number) => number;
// 함수 타입 정의에서 매개변수 수보다 적어도 호환된다.
const add2: Add2 = (a) => 10;
add2(5); // 오류: 매개변수 개수 부족
add2(5, 10); // 결과: 15
```

#### 1.2. 개수가 많은 경우 호환 불가능

```ts
// 함수 타입 정의에서 매개변수 수보다 많으면 호환되지 않는다.
const add3: Add2 = (a, b, c) => 10;
```

### 2. `매개변수 타입` 기준

#### 2.1. 매개변수 타입이 다른 경우 호환 안된다.

```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => a + b;
add(2, 3); // 결과: 5
add("2", "3"); // 오류
```

### 3. 반환값의 타입을 체크한다.

```ts
// 반환 값의 타입이 맞지 않으면 Error
const add5: Add = (a, b) => "문자";
type Add_10 = (a: number, b: number) => 10;
const add6: Add_10 = (a, b) => 100; // return 값이 10이 아니라서 Error
```

### 전체 예제 정리

```ts
type Add = (a: number, b: number) => number;
const add: Add = (a, b) => 10;

// 매개변수 개수가 적은 경우 호환된다.
const add2: Add = (a) => 10;

// 매개변수 개수가 많은 경우 호환되지 않는다.
const add3: Add = (a, b, c) => 10;

// 매개변수 타입이 맞지 않으면 Error
const add4: Add = (a, "") => 10;

// 반환 값의 타입이 맞지 않으면 Error
const add5: Add = (a, b) => "문자";
type Add_10 = (a: number, b: number) => 10;
const add6: Add_10 = (a, b) => 100; // return 값이 10이 아니라서 Error
```

## 매개 변수 타입이 만약 호환되는 타입이라면 어떻게 될까?

- 매개변수 타입을 기준으로 호환성을 체크한다.
- 매개변수 타입만은 우리가 아는 것과 `반대로 생각해야 한다`
  : Super 타입과 Sub 타입이 있으면 Sub 타입은 Super 타입에 호환된다.
  : 하지만 `함수를 호환하는 경우`, 반대로 생각해야한다(`Sub type에 Subper type이 호환된다.`)
- 호환 안되는 경우

```ts
type A = (value: number) => void;
type B = (value: 10) => void;
// 매개 변수 타입이 다름.
let a: A = (value) => console.log(value);
let b: B = (value) => console.log(value);

// number은 super type이고, 10은 sub type이다.
a = b; // number = 10 // 오류: 호환되지 않는다.
```

- 호환 되는 경우

```ts
type A = (value: number) => void;
type B = (value: 10) => void;
// 매개 변수 타입이 다름.
let a: A = (value) => console.log(value);
let b: B = (value) => console.log(value);

// number은 super type이고, 10은 sub type이다.
b = a; // 10 = number // 호환된다.
```

- 정리

```ts
type A = (value: number) => void;
type B = (value: 10) => void;

let a: A = (value) => {
  console.log(value);
};
let b: B = (value) => {
  console.log(value);
};

// 안되는 이유는 서브타입으로 변경되므로
a = b;
// 되는 이유는 수퍼타입으로 변경되므로
b = a;
```

## 리턴 타입이 만약 호환되는 타입이라면 어떻게 될까?

```ts
type A = (value: number) => 10;
type B = (value: number) => number;

let a: A = (value) => 10;
let b: B = (value) => value;

a = b; // 오류
b = a; // OK
// 결론: 티런 타입의 호환은 Super타입과 Sub 타입의 호환이 유지된다.
```

## 함수 오버로딩

- 우리는 ts 작업에서 외부 라이브러리 (모듈) 활용 많이함.
- 많은 라이브러리들이 함수사용하는 여러가지 형태를 제공합니다.
- 직접 `함수 오버로딩` 을 제작하기 보다는 라이브러리 이해를 위해서 알아야 함.
- 동일한 이름의 함수이고, 구분은 매개변수 갯수 차이, 매개변수 타입 차이를 활용.
- 타입스크립트, java, c#, c++에 있는 문법(js 기준)

```js
function go() {}
function go(a: number) {}
function go(a: number, b: number) {}
go();
go(1);
go(1, 2);
```

### 함수 오버로딩 작성법

- 오버로딩 시그니처의 정의(함수 몸체 없음)
- 함수 몸체를 별도로 정의
  - 함수 이름이 동일해야함.
  - 매개변수는 옵션(`?`)을 적용한 가변 매개변수
  - 함수 몸체에 타입 좁히기로 마무리한다.

```ts
// 오버로딩 시그니처를 먼저 생성
// 함수 몸체가 없음
function go(a: number): void;
function go(a: number, b: number): void;
function go(a: number, b: number, c: number): void;
// 함수 몸체를 작성하는 문법(구현 시그니처)
// 오버로딩을 구현하는 문법은 매개변수에 옵션을 적용한다.
// 함수 몸체에서 타입 좁히기를 작성한다.
function go(a: number, b?: number, c?: number): void {
  if (typeof b === "number" && typeof c === "number") {
    console.log(a + b + c);
  } else if (typeof b === "number") {
    console.log(a + b);
  } else {
    console.log(a);
  }
}

go(); // 오류 발생(매개변수가 없음)
go(1); // 매개변수 1개 처리
go(1, 2); // 매개변수 2개 처리
go(1, 2, 3); // 매개변수 3개 처리
go(1, 2, 3, 4); // 오류 발생(매개변수 4개짜리 없음)
```

## Custom Type Guard(사용자 정의 타입가드-타입을 명확히 함)

- 사용자 정의 타입가드(타입을 명확히 함)
- 외부 개발자 또는 라이브러리에서 만들어
- 정확한 타입을 지정하는 경우 활용

```ts
// 안타깝게도 팀장님이 작성한 타입이라서
// 우리가 고쳐서 활용하기는 어렵다.
// 원본을 수정할 수 없는데, 우리는 타입을 구분해야 하는 경우다.
type Dog = {
  name: string; // 이름
  isBark: boolean; // 짖는다.
};
type Cat = {
  name: string; // 이름
  isScratch: boolean; // 할퀸다.
};

// 정의되어진 타입을 활용한다. (타입을 사용하려는 개발자)
type Animal = Dog | Cat;

function go(ani: Animal) {
  // 타입가드
  if ("isBark" in ani) {
    console.log(ani + "는 강아지구나");
  } else if ("isScratch" in ani) {
    console.log(ani + "는 고양이구나");
  }
}

// 우리가 타입가드를 적용한 함수생성
// 참인지 아닌지에 따라서 타입 리턴하여 타입 좁히기 적용
function isDog(ani: Animal): ani is Dog {
  return (ani as Dog).isBark !== undefined;
}
function isCat(ani: Animal): ani is Cat {
  return (ani as Cat).isScratch !== undefined;
}
// 타입 추론이 정확하게 되도록 잡아준다.
function goType(ani: Animal) {
  // 타입가드
  if (isDog(ani)) {
    console.log(ani + "는 강아지입니다.");
  } else if (isCat(ani)) {
    console.log(ani + "는 고양이입니다.");
  }
}
```
