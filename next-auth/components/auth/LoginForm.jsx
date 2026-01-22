'use client';

// rafce
import { login } from '@/app/login/actions';
import React, { useActionState } from 'react'
import { useFormState, useFormStatus } from 'react-dom';

const LoginForm = () => {
  // 입력값에 대한 유효성 검증, 로그인 버튼 선택 시 동작할 함수 등에 필요한 훅(hook)
  const [state, loginAction] = useActionState(login, undefined);

  return (
    <div className="flex justify-center items-center mt-20">
        <form action={loginAction} className="flex flex-col gap-2">
          <input className="border-2 border-dashed w-80 h-10 outline-none" id="email" name="email" placeholder="Email" />
          {/* TODO: 입력폼 유효성 처리 */}{/*?.optional*/}
          {state?.errors && <p className='text-red-500'>{state.errors.email}</p>}
          <input
            className="border-2 border-dashed w-80 h-10 outline-none"
            id="password"
            name="password"
            type="password"
            placeholder="Password"
          />

        {/* TODO: 입력폼 유효성 처리 */}
        {state?.errors?.email &&
            <p className="text-red-500">{state.errors.password}
            </p>
        }
        
        <SubmitButton />
      </form>
    </div> 
  )
}

export default LoginForm

function SubmitButton() {
    // TODO: 
    const { pending } = useFormStatus();

    return (
      <button disabled={pending} type="submit" className="text-white font-sans bg-gray-800 text-lg px-5 py-2.5 me-2 mb-2">
        Login
      </button>
    );

}