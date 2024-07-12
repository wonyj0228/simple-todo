import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import { categoryState, toDoSelector } from '../atoms';
import ToDo from './ToDo';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

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

const Form = styled.form`
  width: 100%;
`;
const CreateCategory = styled.input`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  box-sizing: border-box;

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

interface IForm {
  newCategory: string;
}

function ToDoList() {
  // const toDos = useRecoilValue(toDoState);

  // selector 처리된 recoil value 불러오기
  const toDos = useRecoilValue(toDoSelector);
  // useRecoilState : atom의 value 와 value를 수정할 수 있는 함수를 반환
  const [category, setCategory] = useRecoilState(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory((prev) => {
      const newCategory = { list: prev.list, category: e.currentTarget.value };
      return newCategory;
    });
  };

  const onValid = ({ newCategory }: IForm) => {
    setCategory((prevCategory) => {
      const newObj = {
        list: { ...prevCategory.list },
        category: newCategory,
      };
      newObj.list[Date.now()] = newCategory;
      return newObj;
    });
    setValue('newCategory', '');
  };

  return (
    <Container>
      <Title>To Dos</Title>

      <CategorySelect value={category.category} onInput={onInput}>
        {Object.keys(category.list).map((categoryKey) => {
          return (
            <option key={categoryKey} value={categoryKey}>
              {category.list[categoryKey]}
            </option>
          );
        })}
      </CategorySelect>
      <Form onSubmit={handleSubmit(onValid)}>
        <CreateCategory
          {...register('newCategory', { required: 'Please Write a Category' })}
          placeholder="Custom Category"
        />
      </Form>

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
