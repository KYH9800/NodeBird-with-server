// immer가 internet exproler에서 지원이 안되서 해당 파일을 통해 함수를 만들고 켜준다
import { enableES5, produce } from 'immer'; // immer의 produce 함수를 확장한다(직접 만든다)

export default (...args) => {
  enableES5(); // enableES5 해준 뒤에
  return produce(...args); // produce 실행
}; // nextJS에서는 소스코드의 맨처음에 produce를 실행해 설정할 수 없기 때문에 권장하는 방법은 produce를 직접 만든다

/* 직접 만든 produce 함수가 없다면? 아래의 에러가 나옴 (googling: immer 6.0.1 with IE 11)
! error: SCRIPT5022: [Immer] minified error nr 19: ES5. Find the full error at: https://bit.ly/38PiBHb
해결 방법 참고: https://github.com/immerjs/immer/issues/610
*/
