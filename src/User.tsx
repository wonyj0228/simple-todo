import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

/*
React-Hook-Form
: React 기반의 폼 관리 라이브러리.
    - form의 state와 validation 을 간편하게 처리할 수 있는 방법을 제공한다.
    - 이벤트 핸들러 작성이 아닌, 단순한 Hook을 사용해 관련 데이터를 추적하고 업데이트 한다.

register
: name, onBlur, onChange, ref를 return 하는 함수
: element의 props로 사용한다.

watch
: input의 변화를 감지하고 해당 값을 반환하는 함수

handleSubmit (onValid, onInValid)
: 함수를 return하는 submit관련 함수

    - onValid : submit발생 시 validation 체크가 통과됐을 경우, onValid함수 실행. parameter로 form 데이터 전달 받음
    - onInvalid : validation 체크에서 걸린 경우, onInvalid 함수 발생.

setError
: form validation과 별개로 error를 발생시키고 싶은 경우에 사용. errorFiled를 interface로 따로 만들어두고 option으로 생성한다.(필수 X)
: setError(name, errorObj)

setValue
: element의 값을 수정할 때 사용. 주로 초기화할 때 사용한다.
: setValue(name, newValue)   

reset
: 전체 form state와 value 재설정. 혹은 일부를 재설정 할 수도 있다.
    - reset()   ->  form 전체 리셋
    - reset({ email: "" });    ->   form에서 특정 필드만 리셋
*/

// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setToDoError('');
//     setToDo(value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(toDo);
//     if (toDo.length < 10) {
//       // error
//       return setToDoError('To-do should be longer');
//     }
//     console.log('submit');
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder="Write a to do" />
//         <button>Add</button>
//         {toDoError !== '' ? toDoError : null}
//       </form>
//     </div>
//   );
// }
interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

function User() {
  // useForm을 사용하면 각각 input에 대한 이벤트와, state관리를 하지 않아도 된다.
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<IForm>({
    defaultValues: {
      email: '@naver.com',
    },
  });

  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError('password1', { message: 'Password are not the same' });
    }
    setError('extraError', { message: 'Server offline.' });
  };

  const onInvalid = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.email?.message} </span>
        <input
          {...register('firstName', { required: 'FirstName is Required' })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
        <input
          {...register('lastName', { required: 'Last Name is Required' })}
          placeholder="Last Name"
        />
        <span>{errors?.lastName?.message}</span>
        <input
          {...register('username', {
            required: 'Username is Required',
            minLength: 5,
            validate: {
              noNico: (value) =>
                value.includes('nico') ? 'no nicos allowed' : true,
              noYejin: (value) =>
                value.includes('yejin') ? 'no yejins allowed' : true,
            },
          })}
          placeholder="Username"
        />
        <span>{errors?.username?.message}</span>
        <input
          {...register('password', {
            required: 'Password is Required',
            minLength: 5,
          })}
          placeholder="Password"
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register('password1', {
            required: 'Password is Required',
            minLength: {
              value: 5,
              message: 'Your password is too short',
            },
          })}
          placeholder="Password1"
        />
        <span>{errors?.password1?.message}</span>
        <button>Add</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </div>
  );
}

export default User;
