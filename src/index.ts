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
