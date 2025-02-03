# 클래스

- 여러 개의 인스턴스를 만들기 위한 객체의 `설계도`
- Js, React, Next에서 클래스는 활용도가 엄청 낮음.
- 대개 함수를 기반으로 프로젝트 진행하므로,
- typescript를 기반으로 백엔드를 구축합니다(Node.js, Express.js, Nest.js)
- 예) java를 기반으로 백엔드를 구축합니다(JSP, Spring)
- 예) SQL 구문을 기반으로 DB를 제어한다(JPA, TypeORM)

## 1. 일반 객체로 생성하는 경우

```js
let car = {
  // Property(속성)
  name: "소나타",
  brand: "현대",
  price: 100,
  year: 50,
  //   Method(행동)
  move() {
    console.log();
  },
  stop() {
    console.log();
  },
};
let car2 = {
  // Property(속성)
  name: "그랜저",
  brand: "현대",
  price: 1000,
  year: 20,
  //   Method(행동)
  move() {
    console.log();
  },
  stop() {
    console.log();
  },
};
```

## 2. 클래스의 기본형

```js
class 클래스명 {
  // 속성 필드
  속성명1;
  속성명2;
  // 인스턴스 생성자(이름 변경 불가)
  constructor() {}
  // 메서드 필드
  메소드명1() {}
  메소드명2() {}
}
// 인스턴스 생성
let 인스턴스 = new 클래스명();
```

## 3. 클래스의 속성 필드 정의

- let, var, const 키워드 작성 못 함
- 객체 속성과는 다르게 `;`로 마감.
- 초기값 셋팅은 `constructor`에서 진행.

```js
// 클래스로 구현
class Car {
  // 속성 필드
  name;
  brand;
  price;
  year;
  // 인스턴스 생성자(이름 변경 불가)
  constructor(name, brand, price, year) {
    // this는 인스턴스를 말함.
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  // 메서드 필드
  move() {
    console.log("운전");
  }
  stop() {
    console.log("멈춤");
  }
}
// 인스턴스 생성
let 그랜저 = new Car("현대", "그랜저", 1000, 20);
// {name: "현대", brand: "그랜저", price: 1000, year: 20}
그랜저.move();
그랜저.stop();
let 아반떼 = new Car("현대", "아반떼", 100, 30);
// {name: "현대", brand: "아반떼", price: 100, year: 30}
```

## 4. 상속을 통한 클래스 확장

```js
class ElectricCar extends Car {
  // 속성 필드
  batteryLevel;
  // 인스턴스 생성자(이름 변경 불가)
  constructor(name, brand, price, year, batteryLevel) {
    super(name, brand, price, year);
    this.vatteryLevel = this.batteryLevel;
  }
  // 메서드 필드
  move() {
    console.log("운전");
  }
  stop() {
    console.log("멈춤");
  }
  level() {
    console.log(`${this.batteryLevel}입니다.`);
  }
}
let 캐스퍼 = new ElectricCar("캐스퍼", "현대", 1000, 5, 100);
캐스퍼.move();
캐스퍼.stop();
캐스퍼.level();
```

## 5. 최종 코드

```js
let car = {
  // Property(속성)
  name: "소나타",
  brand: "현대",
  price: 100,
  year: 50,
  //   Method(행동)
  move() {
    console.log();
  },
  stop() {
    console.log();
  },
};
let car2 = {
  // Property(속성)
  name: "그랜저",
  brand: "현대",
  price: 1000,
  year: 20,
  //   Method(행동)
  move() {
    console.log("운전");
  },
  stop() {
    console.log("멈춤");
  },
};
// 클래스로 구현
class Car {
  // 속성 필드
  name;
  brand;
  price;
  year;
  // 인스턴스 생성자(이름 변경 불가)
  constructor(name, brand, price, year) {
    // this는 인스턴스를 말함.
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  // 메서드 필드
  move() {
    console.log("운전");
  }
  stop() {
    console.log("멈춤");
  }
}
// 인스턴스 생성
let 그랜저 = new Car("현대", "그랜저", 1000, 20);
// {name: "현대", brand: "그랜저", price: 1000, year: 20}
그랜저.move();
그랜저.stop();
let 아반떼 = new Car("현대", "아반떼", 100, 30);
// {name: "현대", brand: "아반떼", price: 100, year: 30}

class ElectricCar extends Car {
  // 속성 필드
  batteryLevel;
  // 인스턴스 생성자(이름 변경 불가)
  constructor(name, brand, price, year, batteryLevel) {
    super(name, brand, price, year);
    this.vatteryLevel = this.batteryLevel;
  }
  // 메서드 필드
  move() {
    console.log("운전");
  }
  stop() {
    console.log("멈춤");
  }
  level() {
    console.log(`${this.batteryLevel}입니다.`);
  }
}
let 캐스퍼 = new ElectricCar("캐스퍼", "현대", 1000, 5, 100);
캐스퍼.move();
캐스퍼.stop();
캐스퍼.level();
```

## 6. TypeScript로 속성 필드 타입 정의하기

```ts
class Car {
  // 속성 필드
  name;
  brand;
  price;
  year;
  // 인스턴스 생성자(이름 변경 불가)
  constructor(name: string, brand: string, price: number, year: number) {
    // this는 인스턴스를 말함.
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  // 메서드 필드
  move() {
    console.log("운전");
  }
  stop() {
    console.log("멈춤");
  }
}
```

## 7. 타입스크립트로 속성 필드 초기값 정의하기

```ts
class Car {
  // 속성 필드
  name?: string = "";
  brand?: string = "";
  price?: number = 0;
  year?: number = 0;
  // 인스턴스 생성자(이름 변경 불가)
  constructor(name: string, brand: string, price: number, year: number) {
    // this는 인스턴스를 말함.
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  // 메서드 필드
  move() {
    console.log("운전");
  }
  stop() {
    console.log("멈춤");
  }
}
```

## 8. 클래스 상속을 통한 확장

```ts
class Car {
  // 속성필드 타입정의
  name: string = "";
  brand: string = "";
  price: number = 0;
  year: number = 0;
  constructor(name: string, brand: string, price: number, year: number) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  move() {
    console.log(`${this.name}을 운전합니다.`);
  }
  stop() {
    console.log(`${this.name}을 멈춥니다.`);
  }
}
// 상속
class ElectricCar extends Car {
  batteryLevel: number = 100;
  constructor(
    name: string,
    brand: string,
    price: number,
    year: number,
    batteryLevel: number
  ) {
    super(name, brand, price, year);
    this.batteryLevel = batteryLevel;
  }
  level() {
    console.log(`${this.batteryLevel} 입니다.`);
  }
}
```

## 9. 접근(속성 또는 메소드) 제어자

- `public`: 모든 곳에서 접근 가능
- `private`: 클래스 내부에서만 접근 가능
- `protected`: 클래스 내부 또는 상속된 클래스에서만 접근 가능

### 9.1. `public`

```ts
class Car {
  // 속성필드 타입정의
  name: string = "";
  brand: string = "";
  price: number = 0;
  year: number = 0;
  constructor(name: string, brand: string, price: number, year: number) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  move() {
    console.log(`${this.name}을 운전합니다.`);
  }
  stop() {
    console.log(`${this.name}을 멈춥니다.`);
  }
}
let 아반떼 = new Car("아반떼", "현대", 1000, 50);
아반떼.name;
아반떼.brand;
아반떼.price;
아반떼.year;
// 속성 값 변경
아반떼.price = 5000;
```

- 가능하면 메소드는 public으로 정의한다.
  - 외부에서 메소드를 통해서 속성에 접근하는 것이 정석임.

### 9.2. `private`

- 기본적으로 속성은 `private`을 추천합니다.

```ts
class Car {
  // 속성필드 타입정의
  name: string = "";
  brand: string = "";
  private price: number = 0;
  year: number = 0;
  constructor(name: string, brand: string, price: number, year: number) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  public move() {
    console.log(`${this.name}을 운전합니다.`);
  }
  public stop() {
    console.log(`${this.name}을 멈춥니다.`);
  }
}
let 아반떼 = new Car("아반떼", "현대", 1000, 50);
아반떼.name;
아반떼.brand;
아반떼.price; // 오류: private이라서 읽기 접근 금지
아반떼.year;
// 속성 값 변경
아반떼.price = 5000; // 오류: private이라서 쓰기 접근 금지
```

- private인 속성을 바꾸기 위해서 메서드를 만들어줌.
- 속성 읽기 및 수정은 메소드를 통해 `예외처리`하면서 접근함.

```ts
class Car {
  // 속성필드 타입정의
  name: string = "";
  brand: string = "";
  private price: number = 0;
  year: number = 0;
  constructor(name: string, brand: string, price: number, year: number) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  public move() {
    console.log(`${this.name}을 운전합니다.`);
  }
  public stop() {
    console.log(`${this.name}을 멈춥니다.`);
  }
  // private 속성 읽기 메서드
  public getPrice() {
    console.log(this.price);
  }
  // private 속성 쓰기 메서드
  public setPrice(p: number) {
    if (p < 0) {
      console.log("가격은 0보다 커야합니다.");
    }
    this.price = p;
  }
}
let 아반떼 = new Car("아반떼", "현대", 1000, 50);
아반떼.name;
아반떼.brand;
아반떼.getPrice(); // private이라서 읽기 접근 금지
아반떼.year;
// 속성 값 변경
아반떼.setPrice(10000); // private이라서 쓰기 접근 금지
```

### 9.3. `protected`

- 클래스에서 직접 접근하거나 상속된 클래스에서는 접근 가능

```ts
class Car {
  // 속성필드 타입정의
  name: string = "";
  brand: string = "";
  private price: number = 0;
  // 클래스 내부 또는 상속된 클래스에서만 접근 가능
  protected year: number = 0;
  constructor(name: string, brand: string, price: number, year: number) {
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.year = year;
  }
  public move() {
    console.log(`${this.name}을 운전합니다.`);
  }
  public stop() {
    console.log(`${this.name}을 멈춥니다.`);
  }
  // private 속성 읽기 메서드
  public getPrice() {
    console.log(this.price);
  }
  // private 속성 쓰기 메서드
  public setPrice(p: number) {
    if (p < 0) {
      console.log("가격은 0보다 커야합니다.");
    }
    this.price = p;
  }
  // protected 속성 year 접근
  getYear() {
    console.log(this.year);
  }
}

let 아반떼 = new Car("아반떼", "현대", 1000, 50);
아반떼.name;
아반떼.brand;
아반떼.getPrice(); // 오류:private이라서 읽기 접근 금지
아반떼.year; // 오류: protected라서 외부에서 접근 금지
// 속성 값 변경
아반떼.setPrice(5000); // 오류:private이라서 쓰기 접근 금지

// 상속
class ElectricCar extends Car {
  batteryLevel: number = 100;
  constructor(
    name: string,
    brand: string,
    price: number,
    year: number,
    batteryLevel: number
  ) {
    super(name, brand, price, year);
    this.batteryLevel = batteryLevel;
  }
  level() {
    console.log(`${this.batteryLevel} 입니다.`);
  }
  // 부모 protected 속성에 접근
  showYear() {
    console.log(this.year);
  }
}

let EV5 = new ElectricCar("EV5", "현대", 1000, 5, 100);
EV5.price; // 오류: private라서
EV5.getYear; // 오류: protected라서 외부 접근 에러
```

## 10. 혹시 이럴 수도 있음(문법 및 라이브러리 소스 볼 때 자주 나옴.)

- 속성 필드, constructer의 셋팅이 단축될 수 있음

```ts
class Car {
  constructor(
    public name: string,
    public brand: string,
    private price: number,
    protected year: number
  ) {}
  public move() {
    console.log(`${this.name}을 운전합니다.`);
  }
  public stop() {
    console.log(`${this.name}을 멈춥니다.`);
  }
  // private 속성 읽기 메서드
  public getPrice() {
    console.log(this.price);
  }
  // private 속성 쓰기 메서드
  public setPrice(p: number) {
    if (p < 0) {
      console.log("가격은 0보다 커야합니다.");
    }
    this.price = p;
  }
  // protected 속성 year 접근
  getYear() {
    console.log(this.year);
  }
}

// 상속
class ElectricCar extends Car {
  constructor(
    name: string = "",
    brand: string = "",
    price: number = 0,
    year: number = 0,
    public batteryLevel: number = 0
  ) {
    super(name, brand, price, year);
  }
  level() {
    console.log(`${this.batteryLevel} 입니다.`);
  }
  // 부모 protected 속성에 접근
  showYear() {
    console.log(this.year);
  }
}
```

## 11. 전체 코드

```ts
class Car {
  constructor(
    public name: string,
    public brand: string,
    private price: number,
    protected year: number
  ) {}
  public move() {
    console.log(`${this.name}을 운전합니다.`);
  }
  public stop() {
    console.log(`${this.name}을 멈춥니다.`);
  }
  // private 속성 읽기 메서드
  public getPrice() {
    console.log(this.price);
  }
  // private 속성 쓰기 메서드
  public setPrice(p: number) {
    if (p < 0) {
      console.log("가격은 0보다 커야합니다.");
    }
    this.price = p;
  }
  // protected 속성 year 접근
  getYear() {
    console.log(this.year);
  }
}

let 아반떼 = new Car("아반떼", "현대", 1000, 50);
아반떼.name;
아반떼.brand;
아반떼.getPrice(); // 오류:private이라서 읽기 접근 금지
아반떼.year; // 오류: protected라서 외부에서 접근 금지
// 속성 값 변경
아반떼.setPrice(5000); // 오류:private이라서 쓰기 접근 금지

// 상속
class ElectricCar extends Car {
  constructor(
    name: string = "",
    brand: string = "",
    price: number = 0,
    year: number = 0,
    public batteryLevel: number = 0
  ) {
    super(name, brand, price, year);
  }
  level() {
    console.log(`${this.batteryLevel} 입니다.`);
  }
  // 부모 protected 속성에 접근
  showYear() {
    console.log(this.year);
  }
}

let EV5 = new ElectricCar("EV5", "현대", 1000, 5, 100);
EV5.price; // 오류: private라서
EV5.getYear; // 오류: protected라서 외부 접근 에러
```

## 12. 인터페이스

- `약속`을 지켜서 클래스를 만드시오.
- 클래스를 만드는 것은 좋은데, 이러한 속성 필드와 이러한 속성 메서드는 `반드시` 구현하라. (`implements`)

```ts
// 구현 약속하기 (implements)
interface CarInterface {
  name: string;
  brand: string;
  price: number;
  stop(): void;
  move(): void;
}
interface ElectricInterface {
  batterry: number;
  isBatterry: boolean;
}

class ElectricCar implements CarInterface, ElectricInterface {
  constructor(
    public name: string,
    public brand: string,
    public price: number,
    public batterry: number,
    public isBatterry: boolean
  ) {}
  stop() {
    console.log("멈춰");
  }
  move() {
    console.log("움직여");
  }
}
let 자동차 = new ElectricCar("캐스퍼", "현대", 1000, 100, true);
자동차.stop();
자동차.move();
```
