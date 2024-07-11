import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import { Categories, categoryState, toDoSelector, toDoState } from '../atoms';
import ToDo from './ToDo';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0 auto;
  font-family: 'Noto Sans KR', sans-serif;

  width: 450px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 100px;
  text-align: center;
  padding: 20px 40px;
`;

const CategorySelect = styled.select`
  margin-top: 20px;
  height: 50px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const ToDosBox = styled.div`
  margin-top: 70px;
  padding: 30px 20px;
  border: 1px solid gray;
  border-radius: 10px;
`;

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);

  // selector 처리된 recoil value 불러오기
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilState : atom의 value 와 value를 수정할 수 있는 함수를 반환
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as Categories);
  };

  return (
    <Container>
      <Title>To Dos</Title>

      <CategorySelect value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>진행예정</option>
        <option value={Categories.DOING}>진행중</option>
        <option value={Categories.DONE}>완료</option>
      </CategorySelect>

      <CreateToDo />
      <ToDosBox>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDosBox>
    </Container>
  );
}

export default ToDoList;
