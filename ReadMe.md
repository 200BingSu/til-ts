# 객체 타입 호환성

## 1. object 타입의 호환성

- `object`는 모든 객체 타입의 `super type`이다.
- `object`는 `any`와 `unknown`의 `sub type`이다.

```ts
let obj: {
  name: string;
} = { name: "hong" };

let obj2: object = { name: "hong" };

let a: any = obj;
let b: unknown = obj2;
```

## 2. Array 타입의 호환성

- `Array<any>`, `Array<unknown>` 타입은 모든 배열 타입의 `super type`이다.
- `Array<type>`은 더 구체적인 배열 타입의 `super type`이다.

## 3. 유니온 타입의 호환성

- 아래 문장은 기본형 타입의 `유니온`
- 문자열 또는 숫자형 데이터를 대입할 수 있다.
- ⨆ 합집합(서로 연관성이 전혀 없는 데이터 형을 조합한 새로운 타입 정의)

```ts
type StringNumber = string | number;
```

- `A | B`는 A 또는 B를 포함하는 두 타입의 수퍼타입이다.

```ts
type StringNumber = string | number;

// 문자열은 StringNumber 타입의 서브 타입이므로 업캐스팅된다.
let now: StringNumber = "hello";
// 숫자 데이터는 StringNumber 타입의 서브 타입이므로 업캐스팅된다.
now = 12;
```

### 3.1. 데이터를 변수에 담아서 `변수`로 전달할 때.

- 같은 종류의 데이터라고 인정해줘. (타입 호환성)

```ts
type Animal = {
  name: string;
  age: number;
};
type Cat = {
  name: string;
  age: number;
  color: string;
};

type Sample = Animal | Cat;

const cat1: Cat = { name: "hong", age: 3, color: "yellow" };
const ani3: Animal = cat1;
// Animal 타입은 name, age만 있어야 하는데, Cat type이 어떻게 담기는가?
// ts에서는 객체 값을 입력할 때 속성을 비교합니다.
// 프로퍼티 개수가 적은 타입에 프로퍼티 값이 많은 타입을 업캐스팅 해준다.
// (교집합을 만족하면 호환된다)
```

### 3.2. 데이터를 `객체 리터럴`로 전달할 때.

```ts
type Animal = {
  name: string;
  age: number;
};
type Cat = {
  name: string;
  age: number;
  color: string;
};

// 변수가 아닌 객체 리터럴은 프로퍼티 초과 에러가 발생.
const myCat: Animal = { age: 5, name: "고사리", color: "갈색" };
```

### 3.3. 데이터를 변수로 담아서 전달함.

```ts
const 동물: Animal = { name: "hong", age: 21 };
const ani4: Cat = 동물; //오류(필수조건 못 채움)
```

### 3.4. 유니온 샘플

```ts
type Animal = {
  name: string;
  age: number;
};
type Cat = {
  name: string;
  age: number;
  color: string;
};
type Sample = Animal | Cat;

const now: Sample = ani3;
const meow: Sample = cat1;
const who: Sample = { age: 5, name: "고사리", color: "갈색" };
// 실제 타입은 3가지가 나온다.
// {name:string, age: number}
// {name:string, age: number, color:string}
// {name:string, age: number, color:string}
```

## 4. 인터섹션 타입 (`A & B`)

- `A & B` 타입은 둘 다를 만족해야하는 `교집합`이다.
- `A & B` 타입은 `A`의 `서브타입`, `B`의 `서브타입`이다.

```ts
type Wow = number & string;
// 서로 교차하는 공통의 데이터 종류가 없기 때문에 결코 존재할 수 없는 타입이다.
// 그렇기 때문에 never로 된다.
const go: Wow = 1; //error
```

```ts
type Person = { name: string };
type Employ = { company: string };
type Sample = Person & Employ;

// 속성이 하나만 빠져도 오류다.
const hong: Sample = { name: "hong" }; //오류
const park: Sample = { company: "green" }; //오류

// Sample 타입은 Person 타입과 Employ를 모두의 서브타입이다.
const kim: Sample = { name: "kim", company: "green" }; //정상
```
