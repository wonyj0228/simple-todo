import { atom } from 'recoil';

export interface IToDo {
  text: string;
  id: number;
  category: 'TO_DO' | 'DOING' | 'DONE';
}

// typescript 에게 toDoState에 들어갈 value들의 type을 지정해줌
export const toDoState = atom<IToDo[]>({ key: 'toDo', default: [] });
