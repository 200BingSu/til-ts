# 타입스크립트

## 1. 타입스크립트란?

- 변수, 매개변수, 함수리턴 값에 데이터를 종류를 지정하는 도구
- 최종 결과물은 js 파일이 만들어진다.
- 장점: 버그를 많이 줄여준다.
- 단점: 알아야 하는 문법이 많다.

## 2. 참조 사이트

- https://www.typescriptlang.org/ko/
- https://www.typescriptlang.org/ko/docs/handbook/intro.html

## 3. 개발 환경 구성

- Node.js 버전을 18 이상으로 셋팅
  : `node -v` 명령어로 버전 확인
  : `npm -v` 명령어로 버전 확인

## 4. ts 실행을 위한 환경 구성

- `npm init`
  : pakage.json 파일이 생성됨(Node.js 프로젝트 생성)
- ts를 위한 npm 설치 필요
  : node.js를 사용하는 프로젝트이며 ts를 사용하고 싶다면 `npm i @types/node` 명령어를 사용해야 한다.
- ts를 js로 변환(트랜스파일링)해주는 도구 설치
  : `npm i -g typescript`
- ts 컴파일러 버전 확인
  : `tsc -v`

## 5. 샘플 작업

- `src 폴더` 생성
- `src 폴더` 안에 `index.ts` 파일 생성

```ts
console.log("Hello, World!");
const a: number = 10;
```

- 위의 ts 파일을 js 파일로 변환
  : `tsc src/index.ts`

```js
console.log("Hello, World!");
var a = 10;
```

- node에서 실행하기
  :`node src/index.js`

## 6. 한번의 명령으로 ts를 실행해 주는 도구 설치

- `npm i -g tsx` 실행
- `tsx -v` 명령어로 버전 확인
- `tsx src/index.ts`
