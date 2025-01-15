let user: {
  name: string;
  age: number;
} = {
  name: "hong",
  age: 10,
};
let user2: {
  name: string;
  age: number;
} = {
  name: "kim",
  age: 20,
};

//  옵션 제공
let user3: {
  name: string;
  age: number;
  job?: string; // 옵션 적용
} = {
  name: "hong",
  age: 10,
};
user3.job = "학생"; // 오류

// 문제 발생
let user4: {
  readonly name: string; // 변경 금지
  age: number;
} = {
  name: "hong",
  age: 10,
};
user4.name = "배신자"; // 오류
