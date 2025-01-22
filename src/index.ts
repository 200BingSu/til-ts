type Person = { name: string };
type Employ = { company: string };
type Sample = Person & Employ;

// 속성이 하나만 빠져도 오류다.
const hong: Sample = { name: "hong" }; //오류
const park: Sample = { company: "green" }; //오류

// Sample 타입은 Person 타입과 Employ를 모두 만족해야 한다.
const kim: Sample = { name: "kim", company: "green" }; //정상
