import { useRecoilState, useSetRecoilState } from 'recoil';
import { Categories, IToDo, toDoState } from '../atoms';
import styled from 'styled-components';

const Container = styled.li`
  list-style-type: disc;
  margin: 7px;
`;

const Btn = styled.button`
  margin-left: 10px;
`;

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
      const newToDo = { text, id, category: name as Categories };
      const upDateVal = [
        ...toDos.slice(0, idx),
        newToDo,
        ...toDos.slice(idx + 1),
      ];
      localStorage.setItem('todo', JSON.stringify(upDateVal));
      return upDateVal;
    });
  };

  const onDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((toDos) => {
      const newToDos = toDos.filter((toDo) => toDo.id !== id);
      localStorage.setItem('todo', JSON.stringify(newToDos));
      return newToDos;
    });
  };

  return (
    <Container>
      {text}
      {category !== Categories.DOING && (
        <Btn name={Categories.DOING} onClick={onClick}>
          진행중
        </Btn>
      )}
      {category !== Categories.TO_DO && (
        <Btn name={Categories.TO_DO} onClick={onClick}>
          진행예정
        </Btn>
      )}
      {category !== Categories.DONE && (
        <Btn name={Categories.DONE} onClick={onClick}>
          완료
        </Btn>
      )}
      <Btn onClick={onDelete}>❌</Btn>
    </Container>
  );
}

export default ToDo;
