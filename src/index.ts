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
