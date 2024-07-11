import { useForm } from 'react-hook-form';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from '../atoms';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const TodoInput = styled.input`
  margin-top: 20px;
  width: 70%;
  font-size: 20px;
  font-family: 'Noto Sans KR', sans-serif;
  border: none;
  border-bottom: 1px solid;
  padding: 10px 20px;

  &:focus {
    outline: none;
  }
`;

const Btn = styled.button`
  width: 15%;
  height: 40px;
  font-size: 20px;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const onValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => {
      const newToDos = [{ text: toDo, id: Date.now(), category }, ...oldToDos];
      localStorage.setItem('todo', JSON.stringify(newToDos));
      return newToDos;
    });

    setValue('toDo', '');
  };

  return (
    <Form onSubmit={handleSubmit(onValid)}>
      <TodoInput
        {...register('toDo', { required: 'Please Write a To-Do' })}
        placeholder="Write a to do"
      />
      <Btn>+</Btn>
    </Form>
  );
}

export default CreateToDo;
