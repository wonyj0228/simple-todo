import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import { categoryState, toDoSelector, toDoState } from '../atoms';
import ToDo from './ToDo';

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);

  // selector 처리된 recoil value 불러오기
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilState : atom의 value 와 value를 수정할 수 있는 함수를 반환
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value);
  };

  return (
    <div>
      <h1>To Dos</h1>
      <hr />

      <select value={category} onInput={onInput}>
        <option value="TO_DO">To Do</option>
        <option value="DOING">Doing</option>
        <option value="DONE">Done</option>
      </select>

      <CreateToDo />

      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}

export default ToDoList;
