/**
 * Key와 Value 맵핑
 */
enum State {
  LOADING,
  SUCCESS,
  ERROR,
  INITIAL,
}
//api 타입1
type ApiState = {
  getUser: State;
  paginateUser: State | undefined;
  defenceUser: State | null;
  getPost: State;
};

// api 타입2
type UserApiState = {
  getUser: State;
  paginateUser: State | undefined;
  defenceUser: State | null;
};

// api 타입3
// 아래처럼 구성하면 타입이 변경이 일어나도 추가 작업이 없다.
// 속성이 변화가 일어나도 한번에 모두 일어남.
type UserApiState2 = {
  getUser: ApiState["getUser"];
  paginateUser: ApiState["paginateUser"];
  defenceUser: ApiState["defenceUser"];
};

// api 타입 4
type UserApiState3 = {
  [key in "getUser" | "paginateUser" | "defenceUser"]: ApiState[key];
};

// api 타입 5
// 유틸리티 타입
// Pick: 내가 원하는 것만 뽑을 경우
type UserApiState4 = Pick<ApiState, "getUser" | "paginateUser" | "defenceUser">;
// Omit: 내가 원하는 것만 제외
type UserApiState5 = Omit<ApiState, "getPost">;

/**
 * keyof
 */
type Allkeys = keyof ApiState;
const key1: Allkeys = "getUser";
const key2: Allkeys = "paginateUser";
const key3: Allkeys = "defenceUser";
const key4: Allkeys = "getPost";
// const key5: Allkeys = "gogo"; // 오류

// api타입 6
// 속성 모두 가져오기
type UserApiState6 = {
  [key in keyof ApiState]: ApiState[key];
};

// 유틸리티 사용해보기
// 항목 1개 빼기
type UserApiState7 = {
  // getPost만 제거해라
  [key in Exclude<keyof ApiState, "getPost">]: ApiState[key];
};

// 항목 1개 빼고 모두 옵션으로 바꾸기
type UserApiState8 = {
  [key in Exclude<keyof ApiState, "getPost">]?: ApiState[key];
};
