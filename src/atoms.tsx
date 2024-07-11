import { atom, selector } from 'recoil';

/*

selector
: atom의 output을 변형시키는 도구 (derived state)
: selector(셀렉터 option)
: selector 내부에서 get으로 state를 불러올 경우 해당 state가 변경될 대 마다 selector는 다시 실행됨

selector option
  - key : <string> 키값
  - get : obj를 파라미터로 갖는 function. obj내부의 get function으로 atom state 값을 가져올 수 있다.

Enums
: typescript가 제공하는 기능
: 여러 값들의 이름을 미리 정의해 열거해두고 사용하는 것. 반복해서 사용되는 text를 문서화시킬 수 있다.
: 객체는 key, value값이 변경될 수 있지만, Enum은 외부에서 변경이 불가능하다.

: 숫자 열거형 (default)
  enum Direction {
    Up = 0, ---> 값을 할당하지 않으면 위에서부터 0,1,2,3,4순으로 숫자값이 할당된다.
    Down,
    Left,
    Right,
  }


*/

export enum Categories {
  'TO_DO' = 'TO_DO',
  'DOING' = 'DOING',
  'DONE' = 'DONE',
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

export const categoryState = atom<Categories>({
  key: 'category',
  default: Categories.TO_DO,
});

export const toDoState = atom<IToDo[]>({ key: 'toDo', default: [] });

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
