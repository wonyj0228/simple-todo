import { useSetRecoilState } from 'recoil';
import { IToDo, toDoState } from '../atoms';

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = e;

    // state를 업데이트할 때, array와 같은 주소가있는 데이터는 내부 데이터가 바뀌어도 같은 변수를 return 하면 같은 값으로 안다.
    // 따라서 새로운 배열을 return해줘야함. -> 기존의 state는 Immutability(불변)
    setToDos((toDos) => {
      const idx = toDos.findIndex((todo) => todo.id === id);
      const newToDo = { text, id, category: name as IToDo['category'] };
      return [...toDos.slice(0, idx), newToDo, ...toDos.slice(idx + 1)];
    });
  };

  return (
    <li>
      {text}
      {category !== 'DOING' && (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      )}
      {category !== 'TO_DO' && (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      )}
      {category !== 'DONE' && (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      )}
    </li>
  );
}

export default ToDo;
