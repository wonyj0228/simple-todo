import { atom, selector } from 'recoil';

/*

selector
: atom의 output을 변형시키는 도구 (derived state)
: selector(셀렉터 option)

selector option
  - key : <string> 키값
  - get : obj를 파라미터로 갖는 function. obj내부의 get function으로 atom state 값을 가져올 수 있다.

*/

export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}
// typescript 에게 toDoState에 들어갈 value들의 type을 지정해줌

export const categoryState = atom({ key: 'category', default: 'TO_DO' });

export const toDoState = atom<IToDo[]>({ key: 'toDo', default: [] });

export const toDoSelector = selector({
  key: 'toDoSelector',
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);

    return toDos.filter((toDo) => toDo.category === category);
  },
});
