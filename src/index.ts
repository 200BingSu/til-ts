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
const minus2: TwoMembers = (a, b) => a - b;
const multiple2: TwoMembers = (a, b) => a * b;
const divide2: TwoMembers = (a, b) => a / b;

// interface로 함수 타입 정의하기
interface ITwo {
  (a: number, b: number): number;
}

const add3: ITwo = (a, b) => a + b;
const minus3: ITwo = (a, b) => a - b;
const multiple3: ITwo = (a, b) => a * b;
const divide3: ITwo = (a, b) => a / b;
