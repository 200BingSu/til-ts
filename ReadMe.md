# 인터페이스

- type 문법이 먼저 정의됨.
- type 문법으로 사용자 정의 타입을 하다보니 부족함.
- type 문법에서 추가적으로 나오게 된 것이 `interface`임.
- 많은 개발자들이 type과 interface를 혼란스러워함.
- 거의 90% 이상은 type을 사용하는 것이나 interface를 적용하는 곳이 같다.
- interface는 type에 기능을 좀 더 확장시키고, 원활하게 쓰도록 해주는 추가 문법이다.

## 1. 인터페이스와 타입 정의에서의 공통점

```ts
// 타입은 우리가 원하는 데이터 모양을 만들기 위한 것
type Animal = {
  readonly name: string;
  age?: number;
};
// 아래는 헝가리언 표기법
// C++, Java에서는 I를 붙여서 interface로 컨벤션
interface IAnimal {
  readonly name: string;
  age?: number;
}

const cat: IAnimal = {
  name: "야옹이",
  // age: 10,
};
cat.name = "고사리"; // 오류: 읽기 전용

const dog: IAnimal = {
  name: "멍멍이",
  // age: 10,
};
dog.name = "심바"; // 오류: 읽기 전용
```

### 2. 인터페이스의 문법을 정의

- 데이터의 타입 종류가 기본형이 아니어야 한다.
- 데이터의 타입 종류가 `객체형`이면 `interface`로 정의하자.

```ts
// 기본형은 type
type A = string | number;
// 객체형은 interface
interface B {}
```

#### 2.1. 확장

- 데이터의 타입에 `확장(상속)`이 필요하다면 `interface`로 정의하자.
- 단계 1.

```ts
interface Animal {
  name: string;
  age: number;
}

interface Dog {
  name: string;
  age: number;
}
interface Aniaml {
  name: string;
  age: number;
}
interface Aniaml {
  name: string;
  age: number;
}
```

- 단계2.
- interface는 데이터 모양에 대한 약속

```ts
interface Animal {
  name: string;
  age: number;
}

interface Dog extends Animal {}
interface Cat extends Animal {}
interface Chicken extends Animal {}
```

- 규칙을 지키면서 추가(확장) 속성 정의
  - 속성의 재정의는 가능하지만 `호환이 가능해야`한다.

```ts
// 정의되어져야 하는 속성에 대한 약속
interface Animal {
  name: string;
  age: number;
}
// 확장(상속)을 통한 기본 규칙을 지키고,
// 별도의 속성을 추가로 정의함.
interface Dog extends Animal {
  isBark: boolean; // 추가속성
}
interface Cat extends Animal {
  isScratch: boolean; // 추가속성
}
interface Chicken extends Animal {
  isFly: boolean; // 추가속성
}
```

- 기본 인터페이스 속성의 재정의 가능

```ts
// 정의되어져야 하는 속성에 대한 약속
interface Animal {
  name: string;
  age: number;
}
// 확장(상속)을 통한 기본 규칙을 지키고,
// 별도의 속성을 추가로 정의함.
interface Dog extends Animal {
  isBark: boolean; // 추가속성
  name: "DOG"; // 속성의 재정의(호환 가능할 것!)
  age: "10"; // 오류: 타입 호환이 안된다.
}
interface Cat extends Animal {
  isScratch: boolean; // 추가속성
  name: "CAT"; // 속성의 재정의(호환 가능할 것!)
}
interface Chicken extends Animal {
  isFly: boolean; // 추가속성
  name: "CHICKEN"; // 속성의 재정의(호환 가능할 것!)
}
```

- 다중 확장(상속)이 가능하다.

```ts
// 다중 상속
interface DogCat extends Dog, Cat {}
const ani: DogCat = {
  name: "개냥이",
  age: 10,
  isBark: false,
  isScratch: true,
};
```

- 선언을 합치기는 `interface`에서 `가능`함

```ts
// 아래 상황은 Person이 2번 정의됨으로 판단
interface Person {
  name: string;
  age: number;
}
type Person = { name: string; age: number };
```

```ts
// interface는 최종적으로 하나로 합쳐진다.
interface Person {
  name: string;
  age: number;
}
interface Person {
  hobby: string;
}
const who: Person = {
  name: "홍길동",
  age: 10,
  hobby: "코딩",
};
```

- 주의사항

```ts
// interface는 최종적으로 하나로 합쳐진다.
interface Person {}

interface Person {
  name: string;
  age: number;
}

interface Male extends Person {
  name: "MALE";
}

const who: Male = {
  name: "홍", // 오류 발생 "MALE"을 정의해뒀기 때문에
  age: 10,
};
```

## 3. interface와 type 구분(차이점)

- 인터페이스는 객체의 구조를 정의함.
- 타입은 다양한 타입(유니온, 튜플 등) 정의 가능.
- 인터페이스는 확장이 가능함.(`entends`)
- 타입은 `& 연산자`로 확장 가능함.
- `interface`는 `중복 선언 가능`(자동 병합)
- 타입은 중복 선언 불가능
- 인터페이스는 `컴파일`시 `최적화 자동` 진행됨.
- 타입은 최적화 안되고 코드가 길어짐.

## 4. interface를 이해하여야 함.

- `class`에 반드시 구현해야 되는 기능을 사전에 정의함.

## 5. 정리

- `객체 데이터 모양`은 일단 인터페이스로 정의한다고 생각.
- 추후 Promise에 데이터 모양은 Type이 아니라 `interface`를 활용하자.
  - axios, fetch, XMLHTtpRequest 등은 모두 Promise를 리턴한다.
  - `function acync 함수():Promise<인터페이스>`
