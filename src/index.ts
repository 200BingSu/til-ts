// never은 절대 Super Type이 될 수 없다(어떤 값도 할당할 수 없다)
let value: void = "안녕";
let go: undefined = undefined;
value = go;
value = undefined;

// 값을 할당할 수 없음(any나 unknown이 아니기 때문에)
value = 5;
// void는 undefined의 서브 타입이 아님
go = function () {};

function say(_count: number) {
  return "hello" + _count;
}
let result: void;

// string은 void의 서브타입이 아니다.
result = say(100);
