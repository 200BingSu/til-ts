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
