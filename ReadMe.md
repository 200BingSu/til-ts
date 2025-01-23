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
