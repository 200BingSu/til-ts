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

```ts
/**
 * # 함수 오버로딩
 * 하나의 함수로 여러개의 처리를 진행하도록 구성
 *
 */
// 매개 변수 1개, 매개변수 3개만 받아서 출력하는 함수
// 그런데 함수의 이름은 같다.
function showString1(a: string): void {
  console.log(a);
}

function showString2(a: string, b: string, c: string): void {
  console.log(a, b, c);
}

// 옵션을 통해 3개의 매개변수로 처리하고 싶음
function showString3(a: string, b?: string, c?: string): void {
  if (b && c) {
    console.log(a, b, c);
  } else {
    console.log(a);
  }
}

showString3("A");
showString3("A", "B", "C");
showString3("A", "B"); //오류는 아닌데 원치않는 기능 오류

//함수 오버로딩
// 매개변수1개, 매개변수 3개만 받아서 출력하는 함수
// 함수의 이름이 같다.
function showString4(a: string): void;
function showString4(a: string, b: string, c: string): void;

// 오버로딩 구현체
function showString4(a: string, b?: string, c?: string): void {
  if (b && c) {
    console.log(a, b, c);
  } else {
    console.log(a);
  }
}
showString4("A");
showString4("A", "B", "C");
// showString4("A", "B"); // 오류 발생(오류는 오버로딩 정의에 없기 떄문에)
```

# Type Predicate(타입 프리디케이트)

- 어떤 종류의 데이터 타입인지를 확인해서 `데이터 타입 또는 boolean`을 리턴해줌.

```ts
/**
 * Type Predicate(타입 프리디케이트)
 */

// 숫자 데이터타입인지 아닌지 알아내는 함수
// true 또는 false 만 알수 있다.
// 리턴값의 타입은 알수 없다.
// 리턴값의 타입을 알아낼 수는 없을까?
function isNumber(변수명: any) {
  return typeof 변수명 === "number";
}
// let a: boolean
// 나는 a 가 number 라고 타입이 추론되기를 원했다.
// 그런데 a가 boolean 이다.
// 타입을 알아낼 수 없네.
let a = isNumber(123);

// let b: boolean
let b = isNumber("안녕");

// 나는 true / false 가 아니고
// 리턴되는 값의 타입을 알고 싶다.
// 그때 사용하는 게 타입 프리디케이트이다.
function isNumber2(변수명: any): 변수명 is number {
  return typeof 변수명 === "number";
}
// let a2: number
let a2 = 123;
if (isNumber2(a2)) {
  // let a2: number
  a2;
}

// let b2: string
let b2 = "안녕";

if (isNumber2(b2)) {
  // let b2: never;
  // 예는 원래 string 이었는데 never 로 변경되었다.
  // never 는 존재할 수 없는 타입이다.
  b2;
}

/**
 * interface 에서 타입알아내기
 */
interface Dog {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  breed: string;
}
type DogOrCat = Dog | Cat;

// 나는 Dog 타입인지, Cat 타입인지 정확히 타입을 좁히고 싶다.
// Dog 타입이라면 Dog 에 대한 코딩 처리
// Cat 이라면 Cat 에 대한 코딩 처리
// 여기서는 true/false 가 아닌 타입을 리턴 받고 싶다.

// boolean 리턴
function isDog(변수명: DogOrCat): boolean {
  return (변수명 as Dog).age !== undefined;
}

// type 리턴
function isDogTypeReturn(변수명: DogOrCat): 변수명 is Dog {
  return (변수명 as Dog).age !== undefined;
}

const doge: DogOrCat = { name: "강아지", age: 5 };
// true / false 체크 및 boolean
// 분명히 const doge: DogOrCat 라고 타입을 정의했다.
if (isDog(doge) === true) {
  // 타입 좁히기 성공
  // const doge: Dog
  doge;
  doge.age;
} else {
  // const doge: Dog 라고 나오면 이상한거 아닌가요?
  doge;
  doge.age;
}
// 타입 체크 및 타입 리턴
// 분명히 const doge: DogOrCat 라고 타입을 정의했다.
// 아래 구문에서는
// const doge: Dog 로 변환이 된다.
if (isDogTypeReturn(doge)) {
  // 정확히 Dog 타입이 확인 되었으므로 dog 에 대한 코딩 처리 가능..
  doge;
  doge.age;
} else {
  // const doge: never 로 추론됨
  doge;
  // doge.age; // 오류 정확히 타입 체크 했으므로 오류가 맞다.
}
```

# type과 interface의 차이 2

- 1번. type과 interface는 만드는 법이 다르다.

```ts
type A = { age: 1 };
interface A {
  age: 1;
}
```

- 2번. type에는 데이터 타입 할당, interface는 할당 못함

```ts
type A = string;
interface string; //오류(문법 없음)
```

- 3번. type과 interface의 함수 시그니처(구조) 정의 차이

```ts
type A = (x: number) => number;
interface A {
  // 키명: 키값
  (x: number): number;
}
```

# type과 interface의 차이 4

```ts
/**
 * type 과 inteface 차이 4
 */

// type 에서만 가능해요.
type String = string;
type unionT = string | number;
type tupleT = [string, number];

// interface 에서만 가능해요.
// interface 합치기

// 같은 이름으로 정의가 가능하다.
interface Box {
  width: number;
}
interface Box {
  // 같은 이름은 사용가능하다.
  // 하지만 타입 변경은 불가능하다.
  // width: string; // 타입오류

  height: string;
}
// 합성된 예
const box: Box = { width: 10, height: "길다" };

// 타입은 같은 이름 안되요.
// type Go = {}
// type Go = {}

// 참고
class Review {
  // 속성: Property (인스턴스 에 소속)
  getX = (x: string) => {
    return x;
  };

  // 메소드 : Method (프로토타입 에 소속)
  getXY(x: string) {
    return x;
  }
}

// 프로퍼티 방식으로 Merging 하기
interface GetXnY {
  // 프로퍼티 형식
  getX: (x: number) => number;
  getY: (y: number) => number;
}
interface GetXnY {
  getX: (x: number) => number;
  // getY: (y: number) => number;
  // getY: (y: string) => number; // 오류 발생 (매개변수 타입 달라서)
  // getY: (y: number) => string; // 오류 발생 (리턴 타입 달라서)
}

// 메소드 방식으로 Merging 하기
interface GetXnYMethod {
  // 프로퍼티 형식
  // getXP: (x: number) => number;
  // getYP: (y: number) => number;

  // 메소드 형식
  getX(x: number): number;
  getY(y: number): number;
}

interface GetXnYMethod {
  // 메소드 형식
  // getX(x: number): number;
  // getY(y: number): number;
  // getY(y: string): number; // 매개변수 타입 바꿔도 됩니다.
  getY(y: string): string; // 리턴 타입 바꿔도 됩니다.
  // getY(y: string, z: number): string; // 매개변수 개수를 바꾸어도 된다.
}

const testM: GetXnYMethod = {
  // (parameter) x: number
  getX(x) {
    return x;
  },

  // (parameter) y: string | number
  // 아래 오류 해결 필요
  getY(y) {
    if (typeof y === "string") {
      return y; // string을 반환
    } else {
      return y; // number를 반환
    }
  },
};

// 아래 코드로 진행 요청 1

interface GetXnYMethod {
  getX(x: number): number;
  getY(y: number): number;
  getY(y: string): string;
}

const testM: GetXnYMethod = {
  getX(x) {
    return x;
  },

  getY(y: number | string) {
    return y as any;
  },
};

// 아래 코드로 진행 요청 2
interface GetXnYMethod {
  getX(x: number): number;
  getY(y: number): number;
  getY(y: string): string;
}

const testM2: GetXnYMethod = {
  getX(x) {
    return x;
  },

  getY(y: any): any {
    return y;
  },
};
```

# 타입 확장과 interface의 확장

- type 확장

```ts
// type의 확장
type TName = {
  name: string;
};
type TAge = TName & {
  age: number;
};
const bp: TAge = { age: 10, name: "아이유" };
```

- interface 확장

```ts
/**
 * type의 확장과 interface의 확장
 */
// interface 확장
interface IName {
  name: string;
}

interface IAge extends IName {
  age: number;
}
const iu: IAge = { age: 10, name: "아이유" };
```

- type과 interface 간 확장

```ts
// 인터페이스를 type을 이용해서 확장하기
interface INameAge extends TName {
  age: number;
}
const bts: INameAge = { age: 30, name: "bts" };

// type을 인터페이스를 이용해서 확장하기
type TNameAge = IName & {
  age: number;
};
```

```ts
/**
 * 타입 려어개를 상속 받아서 확장 하는 법.
 * &를 이용한다.
 */
type DogName = {
  name: string;
};
type DogAge = {
  age: number;
};
type DogBreed = {
  breed: string;
};

type Dog = DogName & DogAge & DogBreed;

/**
 * interface 여러개를 상속받아 확장하는 법.
 */
interface CatName {
  name: string;
}
interface CatAge {
  age: number;
}

interface Cat extends CatName, CatAge {
  breed: string;
}

/**
 * Orverriding
 */
type THeight = {
  height: number;
};
type TRectangle = THeight & {
  height: string;
  width: number;
};

// string과 number를 &하면 never type이 나온다.
// '존재할 수 없다'는 표현
const box: TRectangle = {
  height: "100", //  오류: height: never
  width: 100,
};

// 위와 같은 상황을 해결하려면
type TWidth = {
  width: string | number;
};
type TRectangle2 = TWidth & {
  width: number;
  height: number;
};
const box2: TRectangle2 = {
  height: 10,
  // 타입 좁히기로 해결.
  width: 10,
};

// 인터페이스의 예
interface IHeight {
  height: number;
}
interface IWidth {
  width: number;
}
interface IRectangle extends IHeight {
  //height: string; // 타입 오류 발생: 호환되지 않음
  height: number;
}
```

# Tuple

- js에는 존재하지 않음.

```ts
/**
 * Tuple
 * 요소의 데이터 타입과 개수를 지정할 수 있다.
 * 무조건 순서에 맞는 타입의 요소를 넣어야 한다.
 * Tuple도 배열임.
 */
let idolMembers: string[] = ["아이유", "핑클", "블랙핑크"];
// 튜블
let idolMembersTuple: [string, string, string] = ["아이유", "핑클", "블랙핑크"];
let iu: [number, string] = [30, "아이유"];
iu.push("소녀시대"); // tuple로 지정한 타입과 다르지만 오류 없음. [30, "아이유", "소녀시대"]

// Tuple의 배열의 요소 개수를 지켜주려면
let blackPink: readonly [number, string] = [30, "제시"];
// blackPink.push("홍길동"); // 오류: readonly에 의해 유지됨.

// 배열 값을 tuple로 정의하는 법
let idols = [30, "아이유"] as const;
// idols.push("소녀시대"); // readonly로 의해 유지됨
```

```ts
/**
 * Named Tuple
 * 요소 타입의 이름을 주는 문법
 */
let actors: [string, number] = ["이병헌", 50];
let actors2: [name: string, age: number] = ["이병헌", 50];

/**
 * Tuple과 Tuple을 할당
 */
let ages: [number, number] = [1, 2];
let sampleAges: [number, number] = ages;
let sampleAges2: [string, number] = ages; // 오류: 타입이 맞지 않음
let sampleAge3: [number, number, number] = ages; // 오류: 타입의 개수가 맞지 않음.
```

```ts
/**
 * Multi Dimenstion Tuple
 */
const idol2DTuple: [string, number][] = [
  ["아이유", 30],
  ["블랙핑크", 32],
];
```

# TS에서 `객체` 상세히 알아보기

```ts
/**
 * 객체
 */
let obj: {
  age: number;
  name: string;
} = {
  age: 30,
  name: "아이유",
};

interface IPerson {
  age: number;
  name: string;
}
type TPerson = {
  age: number;
  name: string;
};
```

```ts
/**
 * 속성 초과 검사
 * - 객체 리터럴로 값을 할당하는 경우에만 ts가 검사
 */
type TName = {
  name: string;
};

// 객체 리터럴로 정의한 객체
// 속성이 초과되었는지 ts가 검사.
// 아래의 예는 타입 정의가 없어서 실행하지 않고 있음.
const iu = { name: "아이유", age: 30 };

const iu2: TName = {
  name: "아이유",
  // age: 30, // 오류 발생(속성 초과)
};

type TAge = {
  age: number;
};
//객체 리터럴로 정의
const iu3: TAge = {
  age: 30,
  name: "아이유", // 오류 발생
};

// 아래부터 조심.
const bPink = {
  age: 32,
  name: "블랙핑크",
};
const bPink1: TAge = bPink; // 오류가 없음 !!! : 만들어진 변수로 전달할 경우 속성 검사를 하지 않는다. (초과 검사 안함)
bPink1.age; // 정상
// 실행시에 오류를 일으킴
bPink1.name; // 오류
```

```ts
/**
 * 중첩 속성 객체
 * - 중첩 속성을 가능하면 정의하지 않기.
 * - 별도의 정의를 진행하는 것이 좋음
 */

// 속성을 중첩한 예
type Person = {
  identity: {
    name: string;
    age: number;
  };
  country: string;
};
const iu: Person = {
  identity: { name: "아이유", age: 30 },
  country: "한국",
};

// 중첩을 배제한 예
type TIdentity = {
  name: string;
  age: number;
};
type TPerson = {
  identity: TIdentity;
  country: string;
};
const iu2: TPerson = {
  identity: {
    name: "아이유",
    age: 30,
  },
  country: "한국",
};
```

```ts
/**
 * 객체끼리의 union
 */
const dogCat =
  Math.random() > 0.5
    ? { name: "멍멍이", age: 3 }
    : { name: "야옹이", breed: "샴" };

/**
 * dogCat의 데이터 타입
 * const dogCat: {
name: string;
age: number;
breed?: undefined;
} | {
name: string;
breed: string;
age?: undefined;
}
     */
dogCat;
dogCat.name; // (property) name: string
dogCat.age; // (property) age?: number | undefined
dogCat.breed; // (property) breed?: string | undefined

// 타입스크립트는 가능하면 타입 유추에 의해서 오류가 발생하는 것을 제거 가능하면 해줘야한다.
interface Dog {
  name: string;
  age: number;
}
interface Cat {
  name: string;
  breed: string;
}

type DocCat = Dog | Cat;
const dogCat2: DocCat =
  Math.random() > 0.5
    ? { name: "멍멍이", age: 3 }
    : { name: "야옹이", breed: "샴" };

dogCat2;
dogCat2.name; // (property) name: string
// dogCat2.age; // 오류
// dogCat2.breed; // 오류
if ("age" in dogCat2) {
  dogCat2; // Dog
} else if ("breed" in dogCat2) {
  dogCat2; // Cat
}
```

```ts
/**
 * 객체끼리의 인터섹션 &
 * 참고(never)
 * type A = number & string
 */
type PersonT = {
  name: string;
  age: number;
};
type CompanyT = {
  company: string;
  comNumber: number;
};
type PersonAndCompany = PersonT & CompanyT; // 모두 만족해야한다.
const iu: PersonAndCompany = {
  name: "아이유",
  age: 30,
  company: "소속사",
  comNumber: 111,
};
```

# Key Value 맵핑

- Key와 Value 값을 자동으로 맵핑시키는 법.

```ts
/**
 * Key와 Value 맵핑
 */
enum State {
  LOADING,
  SUCCESS,
  ERROR,
  INITIAL,
}
//api 타입1
type ApiState = {
  getUser: State;
  paginateUser: State | undefined;
  defenceUser: State | null;
  getPost: State;
};

// api 타입2
type UserApiState = {
  getUser: State;
  paginateUser: State | undefined;
  defenceUser: State | null;
};

// api 타입3
// 아래처럼 구성하면 타입이 변경이 일어나도 추가 작업이 없다.
// 속성이 변화가 일어나도 한번에 모두 일어남.
type UserApiState2 = {
  getUser: ApiState["getUser"];
  paginateUser: ApiState["paginateUser"];
  defenceUser: ApiState["defenceUser"];
};

// api 타입 4
type UserApiState3 = {
  [key in "getUser" | "paginateUser" | "defenceUser"]: ApiState[key];
};

// api 타입 5
// 유틸리티 타입
// Pick: 내가 원하는 것만 뽑을 경우
type UserApiState4 = Pick<ApiState, "getUser" | "paginateUser" | "defenceUser">;
// Omit: 내가 원하는 것만 제외
type UserApiState5 = Omit<ApiState, "getPost">;

/**
 * keyof
 */
type Allkeys = keyof ApiState;
const key1: Allkeys = "getUser";
const key2: Allkeys = "paginateUser";
const key3: Allkeys = "defenceUser";
const key4: Allkeys = "getPost";
// const key5: Allkeys = "gogo"; // 오류

// api타입 6
// 속성 모두 가져오기
type UserApiState6 = {
  [key in keyof ApiState]: ApiState[key];
};

// 유틸리티 사용해보기
// 항목 1개 빼기
type UserApiState7 = {
  // getPost만 제거해라
  [key in Exclude<keyof ApiState, "getPost">]: ApiState[key];
};

// 항목 1개 빼고 모두 옵션으로 바꾸기
type UserApiState8 = {
  [key in Exclude<keyof ApiState, "getPost">]?: ApiState[key];
};
```
