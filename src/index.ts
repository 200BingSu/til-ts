/**
 * Partial Type
 * 가장 많이 사용하는 유틸리티 타입
 * 객체의 일부분만 수정하기
 */
interface Idol {
  name: string;
  age: number;
  groupName: string;
}
const suji: Idol = {
  name: "수지",
  age: 32,
  groupName: "에이..?핑크",
};
type IdolPartial = Partial<Idol>;

function updateIdol(origin: Idol, update: IdolPartial): Idol {
  return { ...origin, ...update };
}
const suji2 = updateIdol(suji, { age: 29 });

/**
 * Required Type
 * 모두 필수 속성으로 바꿈
 */
interface Cat {
  name: string;
  age?: number;
  breed?: string;
}
type CatRequired = Required<Cat>;

/**
 * Readonly Type
 * 모두 읽기 전용으로 바꿈
 */
interface Cat2 {
  name: string;
  age?: number;
  breed?: string;
}
type CatReadonly = Readonly<Cat2>;

/**
 * Pick Type
 * 속성을 선택해서 타입 사용
 */
interface Cat3 {
  name: string;
  age?: number;
  breed?: string;
}
type CatPick = Pick<Cat3, "age" | "breed">;

/**
 * Ommit Type
 * 속성을 제외해서 타입 사용
 */
interface Cat4 {
  name: string;
  age?: number;
  breed?: string;
}
type CatOmmit = Omit<Cat4, "name">;

/**
 * Exclude Type
 * 특정 타입을 제외하고 사용
 */
type NoString = Exclude<string | boolean | number, string>; // string만 제외
type Candy = "초코" | "딸기" | "바나나" | "사과";
type RemainingCandy = Exclude<Candy, "초코" | "바나나">; //type RemainingCandy = "딸기" | "사과"

/**
 * Extract Type
 * 특정 타입을 추출해서 사용
 */
type NoString2 = Extract<string | boolean | number, string>; // string만 뽑기
type Candy2 = "초코" | "딸기" | "바나나" | "사과";
type RemainingCandy2 = Extract<Candy, "초코" | "바나나">; // 초코, 바나나만 뽑기

/**
 * ParamType Type
 * 매개변수 타입을 사용
 */
function fun(x: number, y: number, z: boolean) {}
type Tparams = Parameters<typeof fun>; // type Tparams = [x: number, y: number, z: boolean]
type TParamsVoid = Parameters<(a: number) => void>; //type TParamsVoid = [a: number]

/**
 * ConstructorParameters Type
 * 생성자 함수의 타입을 사용
 */
class Idol {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}
type TSC = ConstructorParameters<typeof Idol>; // type TSC = [name: string, age: number]

/**
 * ReturnType Type(함수의 리턴타입)
 * 함수의 리턴타입을 사용
 */
type sFn = (a: number) => number;
type RT = ReturnType<sFn>; //type RT = number;
type RT2 = ReturnType<() => void>; //type RT2 = void;

/**
 * Template Literal Type
 */
type IU = "Iue";
type UIU = Uppercase<IU>; //type UIU = "IUE"
type sIU = Lowercase<IU>; //type sIU = "iue"
type cIU = Capitalize<IU>; //type cIU = "Iue"
type uIU = Uncapitalize<IU>; //type uIU = "iue"
