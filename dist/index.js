let age = 15;
age = 100;
age = "안녕";
let ageUnknown = 15;
ageUnknown = 100;
ageUnknown = "안녕";
// any와 unknown의 차이를 이해하자.
let anything = "Hello";
anything = 123;
anything.toUpperCase(); // any로 타입을 정해놔서 123인데도 오류가 안 뜬다.
anything.toFixed(2); // 숫자 적용
export {};
