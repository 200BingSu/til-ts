# Primitive (기본 데이터형)

## js와 ts에 공통으로 존재하는 데이터형

```ts
// 기본 데이터형
// primitive( 기본 데이터형 6개)
const stringVar: string = "안녕";
const numberVar: number = 10;
const booleanVar: boolean = true;
const nullVar: null = null;
const undefinedVar: undefined = undefined;
const symbolVar: symbol = Symbol("안녕");
// const bigintVar: bigint = BigInt(9999999999);
```

## 타입스크립트에만 존재하는 데이터형

### any와 unknown

- any와 unknown은 모든 타입을 할당할 수 있습니다.
- any는 어느 곳에서나 값을 할당할 수 있지만,
- `unknown은 아무곳에서도 값을 할당할 수 없다.`.

```ts
/**
 * ## any
 *
 * 아무 타입이나 할당할 수 있습니다.
 * type 체크 안 합니다.
 * 과도하게 사용하면 곤란함.
 */
let anyVar: any;
anyVar = stringVar;
anyVar = numberVar;
anyVar = booleanVar;
anyVar = nullVar;
anyVar = undefinedVar;
anyVar = symbolVar;

/**
 * ## unknown
 *
 * 아무 타입이나 할당할 수 있습니다.
 * type 체크 합니다.
 */
let unknownVar: unknown;
unknownVar = stringVar;
unknownVar = numberVar;
unknownVar = booleanVar;
unknownVar = nullVar;
unknownVar = undefinedVar;
unknownVar = symbolVar;

/**
 * ### unknown과 any의 차이
 */

let newStringVar: string = anyVar; // ok
let newStringVar2: string = unknownVar; // 오류
```

# Object(배열, 객체)

## 배열 : 리스트 (list, array)

```ts
/**
 * # Object
 * ## Array
 *
 */
const numberArr: number[] = [1, 2, 3];
const stringArr: string[] = ["a", "b", "c"];
const booleanArr: boolean[] = [true, false, true];
const stringNumberArr: (string | number)[] = ["a", 1, "b", 5];
const stringNumberBooleanArr: (string | number | boolean)[] = ["a",1,true,"b",5,];

// 제네릭
const numberArrG: Array<number> = [1, 2, 3];
const stringArrG: Array<string> = ["a", "b", "c"];
const booleanArrG: Array<boolean> = [true, false, true];
const stringNumberArrG: Array<string | number> = ["a", 1, "b", 5];
const stringNumberBooleanArrG: Array<string | number | boolean> = = ["a",1,true,"b",5,];
```

## 오브젝트

```ts
/**
 * 오브젝트
 */
const obj: object = {};
const personObj: { name: string; age: number } = { name: "홍", age: 10 };
```

# type 별칭

- 개발자가 정의하는 데이터 타입
- TS에만 존재.

```ts
type StringType = string;
const stringT: StringType = "hello";

type NumberType = number;
const numberT: NumberType = 100;
```

- 유니온을 이용한 type 별칭 선언

```ts
type StringNumberType = string | number;
let stringNumberT: StringNumberType = 1;
stringNumberT = "hello";
stringNumberT = false; // 오류

type GenderType = "male" | "female";
let genderT: GenderType = "male";
genderT = "female";
genderT = "other"; // 오류
```

# interface

- 개발자가 정의하는 객체 모양의 데이터 타입

```ts
/**
 * # interface
 * type은 기본형 데이터를 사용가능하지만
 * interface는 무조건 객체 리터럴 형이다.
 */
// 타입 별칭
type IdolType = { name: string; age: number };

// 인터페이스
interface IdolInterface {
  name: string;
  age: number;
}
```

- 타입과는 다르게 interface는 무조건 `객체 리터럴`형태로만 들어간다.
- interface는 Primitive를 할당할 수 없다.

```ts
// 객체 속성의 옵션 `?` 살펴보기
type OptionalIdolType = { name: string; age: number; year?: number };

interface OptionalIdolInterface {
  name: string;
  age: number;
  year?: number;
}

const iuT: OptionalIdolType = { name: "아이유", age: 30 };
iuT.year = 100; // 좋지 않은 사용
const btsI: OptionalIdolInterface = { name: "BTS", age: 10 };
btsI.year = 2025; // 좋지 않은 사용
```

# Enum

- 여러 개의 상수를 정의하고 사용할 때 편리.
- 외부 연동시 활용 추천

```ts
import { stat } from "fs";

// 오타 발생 위험 회피
const initialState = "INITIAL";
const loadingState = "LOADING";
const doneState = "DONE";
const errorState = "ERROR";

/**
 * ## enum을 이용한 상수 처리
 * 관례상 속성은 대문자를 사용함.
 * 키와 값이 같다면 생략 가능
 */
enum Status {
  INITIAL,
  LOADING,
  DONE,
  ERROR,
}

// 외부 연결 상태
function runNetwork() {
  let status = Status.INITIAL;
  try {
    status = Status.LOADING;
    // 중간처리
    status = Status.DONE;
  } catch (error) {
    status = Status.ERROR;
  } finally {
    return status;
  }
}

if (runNetwork() === Status.DONE) {
  console.log("성공");
} else {
  console.log("실패");
} // 오타 발생 위험
```

# 타입 추론

- 타입 어노테이션 없이 타입 추론

```ts
/**
 * Type Inference(타입 추론)
 */
//  Array
// Let numberArr: number[]
let numberArr = [1, 2, 3];
numberArr[0] = 100; // 가능
numberArr.push(2500); // 가능
// numberArr.push("3000"); // 타입 오류

//let numberOrStringArr: (string | number)[]
let numberOrStringArr: (number | string)[] = [1, "2", 3, "4"];
numberOrStringArr[0] = "안녕하세요"; // 가능
numberOrStringArr.push("반갑습니다."); // 가능
// numberOrStringArr.push(false); // 타입 오류

/**
 * # Tuple
 * 배열의 요소의 개수와 각 요소의 데이터 타입 미리 정의
 */
const towNumberArr = [1, 2] as const; // readonly 형태 추가(이 후 배열에 추가할 수 없음)
// towNumberArr.push(3); // 타입 오류
// towNumberArr[0] = 100; // 타입 오류

let towNumberArr2 = [1, 2] as const;
// towNumberArr2[0] = 100; // 오류
```

# Casting(캐스팅)

- 타입 추론을 조금 더 개발자가 구체화하는 것.
- 특정 타입으로 지정하는 것.
- js에서는 없는 갠념(ts에만 존재)
- as는 타입을 강제로 변환하는데, 정말 조심해야함.
- ts에서는 오류가 아닌데, 런타임에서는 오류 발생 가능성이 높음.

```ts
/**
 * # Casting(캐스팅)
 */
const numberVar = 20;
//  타입 추론에 의해서  numberVar: 20으로 추론
//  아래는 '문자열'을 대문자로 고치는 함수이기 때문에 타입 오류로 실행되지 않는다.
numberVar.toUpperCase(); // 타입 오류

const sampleNumber: any = 5;
sampleNumber.toUpperCase(); // 런타임 오류) ts에서 타입 체크 못하고 런타임에 오류가 발생함.

const count = 20;
// 무수한 코드 진행 중 필요에 의해 아래 코드 진행
// ...
// 아래 코드는 개발자가 반드시 문자열로 변환해야 하는 경우.
let num = count as unknown as string; // as로 강제로 믿으라고 시킬 수는 있지만 큰 오류 가능성이 있음.
num.toUpperCase();
```

# Union 기초

- 타입들을 병합할 수 있는 여러 방법 중 하나이다.

```ts
/**
 * Union 기본
 */
type StringOrBoolean = string | boolean;
let sb: StringOrBoolean = "안녕";
sb = false;

type StringOrBooleanOrNull = string | boolean | null;
let sbn: StringOrBooleanOrNull = "안녕";
sbn = false;
sbn = null;

type StateType = "LOADING" | "DONE" | "ERROR" | "INIT";
let state: StateType = "DONE";
state = "GO"; //타입 오류

// 배열(리스트)의 Union
type StringArrOrBoolArr = string[] | boolean[];
let saoba: StringArrOrBoolArr = ["아이유", "블랙핑크"];
saoba = [true, false, false];
// saoba = ["아이유", false]; // 타입 오류

type StringOrBoolArr2 = (string | boolean)[];
let saoba2: StringOrBoolArr2 = ["아이유", "블랙핑크"];
saoba2 = [true, false, false];
saoba2 = ["아이유", false];

// 인터페이스 union
interface Animal {
  name: string;
  age: number;
}
interface Humana {
  name: string;
  age: number;
  address: string;
}

type AnimalOrHuman = Animal | Humana;
let aoh: AnimalOrHuman = { name: "아이유", age: 20, address: "서울" };

aoh; //let aoh: Humana
aoh.name;
aoh.age;
aoh.address;

aoh = { name: "댕댕이", age: 5 };
aoh; //let aoh: Animal
aoh.name;
aoh.age;
// aoh.address; // 타입 오류
(aoh as Humana).address; // 런타임 오류 발생함. 반듸 확인하는 것을 추천.

// 위의 내용과는 완전 다르게 겹치는 속성이 없는 경우
type Person = {
  name: string;
  age: number;
};
type Cat = {
  breed: string;
  country: string;
};

type PersonOrCat = Person | Cat;
let iu: PersonOrCat = { name: "아이유", age: 30 };
let cat: PersonOrCat = { breed: "스핑크스", country: "이집트" };
let who: PersonOrCat = {
  name: "아이유",
  age: 30,
  breed: "스핑크스",
  country: "이집트",
};
let who2: PersonOrCat = {
  name: "아이유",
  age: 30,
  // breed: "스핑크스",
  // country: "이집트",
};
let who3: PersonOrCat = {
  // name: "아이유",
  // age: 30,
  breed: "스핑크스",
  country: "이집트",
};
let who4: PersonOrCat = {
  name: "아이유",
  // age: 30,
  breed: "스핑크스",
  country: "이집트",
};
let who5: PersonOrCat = {
  // name: "아이유",
  age: 30,
  breed: "스핑크스",
  country: "이집트",
};
let who6: PersonOrCat = {
  name: "아이유",
  age: 30,
  // breed: "스핑크스",
  country: "이집트",
};
let who7: PersonOrCat = {
  name: "아이유",
  age: 30,
  breed: "스핑크스",
  // country: "이집트",
};
let who8: PersonOrCat = {
  name: "아이유",
  // age: 30,
  // breed: "스핑크스",
  country: "이집트",
}; // 오류 발생: 어떤 타입이라도 소속 필수 요소가 반드시 있어야 한다. 어떤 타입에도 필수 요소가 충족되지 않으면 오류가 발생한다.
```

# Intersection Type

- 모든 타입을 만족하는 타입

```ts
/**
 * # Intersection Type
 * Union은 하나만 만족하면 된다.
 * Intersection은 모두 만족해야한다.
 */
// Interface
interface Human {
  name: string;
  age: number;
}
interface Contact {
  phone: string;
  address: string;
}

type HumanAndContact = Human & Contact; // 모든 타입을 만족해야한다.

let iu: HumanAndContact = {
  name: "아이유",
  age: 30,
  address: "서울",
  phone: "123-1234-1234",
};

// 예외 사항(기본형에서는 사용하지 않는다.)
type StringAndNumber = string & number; // never 타입이 된다: `절대로 존재할 수 없다`
let iu2: StringAndNumber = "아이유"; // 오류 발생
let iu3: StringAndNumber = 30; // 오류 발생
```

# Narrowing(타입 좁히기)

- union을 이용해서 만들어진 타입을 구체적인 타입으로 변환

```ts
/**
 * # Narrowing(타입 좁히기)
 */
let numberOrString: number | string;
numberOrString = "아이유";
numberOrString; // narrowing에 의해서 타입이 string으로 추론된다.

// 특정 값을 할당해서 타입 좁히기
let numberOrString2: number | string = "아이유";
numberOrString2; // 타입 좁히기로 인해 string으로 추론된다.

// typeof 연산자를 사용해서 타입 좁히기
// js 런타임 중 값이 결정되는 상황을 만들어 봄.
let numberOrString3: number | string = Math.random() > 0.5 ? 123 : "아이유";
// numberOrString3.toUpperCase(); // 오류 발생: Math.random()의 값이 때에 따라 다르기 때문에 타입에 따라 오류가 발생할 수 있다.
if (typeof numberOrString3 === "string") {
  numberOrString3.toUpperCase();
} else {
  numberOrString3;
}

// 조건문에서 특정 값을 할당해서 타입 좁히기
let nullOrString: null | string[] =
  Math.random() > 0.5 ? null : ["아이유", "블랙핑크"];

if (nullOrString) {
  nullOrString.push("트와이스"); //let nullOrString: string[]
} else {
  nullOrString; //let nullOrString: null
}

// 비교문을 이용해서 타입 좁히기
// Js에서는 불가능하지만 TS에서는 타입 비교를 사용할 수 있다.
let numberOrString4: number | string = Math.random() > 0.5 ? 123 : "아이유";
let stringOrBool: string | boolean = Math.random() > 0.5 ? "아이유" : true;
if (numberOrString4 === stringOrBool) {
  // 타입 추론에 의해서 numberOrString4: string, stringOrBool: string
  numberOrString4;
  stringOrBool;
} else {
  // let numberOrString4: string | number
  // let stringOrBool: string | true
  numberOrString4;
  stringOrBool;
}

let numberOrStringOrNull: number | string | null =
  Math.random() > 0.5 ? 123 : Math.random() > 0.5 ? "아이유" : null;

if (typeof numberOrStringOrNull === "number") {
  numberOrStringOrNull; // let numberOrStringOrNull: number
} else {
  numberOrStringOrNull; // let numberOrStringOrNull: string | null
}

// im 연산자로 타입 좁히기
interface Human {
  age: number;
}
interface Dog {
  name: string;
  type: string;
}
let human: Human = { name: "아이유", age: 30 };
let dog: Dog = { name: "뽀삐", type: "강아지" };
let humanOrDog: Human | Dog = Math.random() > 0.5 ? human : dog;
if ("age" in humanOrDog) {
  humanOrDog; // let humanOrDog: Human
} else {
  humanOrDog; // let humanOrDog: Dog
}

// instanceof 연산자로 타입 좁히기
let dateOrString: Date | string = Math.random() > 0.5 ? new Date() : "아이유";
if (dateOrString instanceof Date) {
  dateOrString; // let dateOrString: Date
} else {
  dateOrString; // let dateOrString: string
}

// Discripminated Union
// 특정 속성에 상수로 문자열을 배치해서 비교하여 타입 좁히기
interface Animal {
  type: "dog" | "human";
  height?: number;
  breed?: string;
}
let animal: Animal =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "스핑크스" };

if (animal.type === "human") {
  animal.height;
} else {
  animal.breed;
}
// 위의 코드는 타입 좁히기를 실행해도 인터페이스 설계로 인해 타입이 모호함.
interface Human2 {
  type: "human";
  height: number;
}
interface Dog2 {
  type: "dog";
  breed: string;
}
type HumanOrDog2 = Human2 | Dog2;
let animal2: HumanOrDog2 =
  Math.random() > 0.5
    ? { type: "human", height: 180 }
    : { type: "dog", breed: "스핑크스" };
if (animal2.type === "human") {
  animal2; //let animal2: Human2
} else {
  animal2; //let animal2: Dog2
}

// switch문을 이용해서 타입 좁히기
switch (animal2.type) {
  case "human":
    animal2; //let animal: Human
    break;
  case "dog":
    animal2; //let animal2: Dog2
    break;
}
```

# 함수

```ts
/**
 * # 함수
 * 기본적으로 함수 파라메터는 `any`로 추론된다.
 * 가능하면 배제하고, 그래도 모르겠으면 차라리 `unknown`으로 추론하는 것이 좋다.(Narroiwing)
 */
//
function showName(name) {
  console.log(name);
}

function showName2(name: string) {
  console.log(name);
}

// 옵션 파라메터
function showMember(name: string, age?: number) {
  console.log(name, age);
}

showMember("John", 20);
showMember("John");

// Rest 파라메터
function showInfo(...args: string[]) {
  console.log(args);
}
function showInfo2(age: number = 0, ...args: string[]) {
  console.log(args);
}

// 함수의 리턴타입
// 추론) function add(a: number, b: number): number;
function add(a: number, b: number) {
  return a + b;
}
function add2(a: number, b: number): number {
  return a + b;
}

// 추론) function ran(): "아이유" | 123
function ran() {
  return Math.random() > 0.5 ? "아이유" : 123;
}
function ran2() {}

// void 반환 타입
// 아무것도 돌려주지 않음
// 추론) function notReturn(): void;
function notReturn() {
  // ...
  // ...
  // ...
  // ...
}

// never 반환 타입
// 존재할 수 없음.
// 추론) function neverReturn(): never;
function throwError(): never {
  throw new Error("내가 던지는 에러");
}

// 무한반복 절대로 결과값 안나오는 케이스
function loop():never{
  while(true)
    // 실행
}
```

# 함수 시그니처로 타입 선언

- 시그니처란? `선언 구조`
- 타입으로 함수 타입 정의하기

```ts
/**
 * 함수 시그니처로 타입 구성
 */
// type으로 함수의 타입 정의하기
const runner = () => {
  return ["아이유", "블랙핑크"].map((x) => x);
};

type Mapper = (x: string) => string;

const runner2 = (callback: Mapper) => {
  return ["아이유", "블랙핑크"].map(callback);
};

runner2((x) => `${x}입니다`);

type TwoMembers = (a: number, b: number) => number;

//const twoFun: (a: number, b: number) => number
const twoFun = (a: number, b: number): number => a + b;
const twoFunT: TwoMembers = (a, b) => a + b;

const add2: TwoMembers = (a, b) => a + b;
const minus: TwoMembers = (a, b) => a - b;
const multiple: TwoMembers = (a, b) => a * b;
const divide: TwoMembers = (a, b) => a / b;

// interface로 함수 타입 정의하기
interface ITwo {
  (a: number, b: number): number;
}

const add3: ITwo = (a, b) => a + b;
const minus3: ITwo = (a, b) => a - b;
const multiple3: ITwo = (a, b) => a * b;
const divide3: ITwo = (a, b) => a / b;
```

# 함수 오버로딩
