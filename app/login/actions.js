'use server'; // server에서 실행되도록

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createSession, deleteSession } from '../lib/session';

// 테스트에 사용할 로그인용 임시 계정 정보
const testUser = {
    id: '1',
    email: 'gugu@gm.com',
    password: '12345678'
}

// 입력값 유효성 검증해주는 코드(zod 라이브러리 활용)
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }).trim(),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .trim(),
});

// 사용자가 로그인 버튼을 클릭했을 때 동작시킬 함수(로그인 로직)
export async function login(prevState, formData) {
    console.log('login()호출됨');
    
    // 1. 사용자가 입력한 값이 유효한지 확인(주로 회원가입할 때)
    const result = loginSchema.safeParse(Object.fromEntries(formData));

    if(!result.success) { // 입력값이 유효하지 않을 경우, 에러 메시지 반환
        return {
            errors: result.error.flatten().fieldErrors,
            // error라는 프로퍼티에 유효성 실패 메시지를 <LoginForm />
        }
    }

    const { email, password } = result.data;
    console.log(email, password);

    // 2. 실제 인증을 수행하는 백엔드 서버로 전송(했다고 가정하고 skip)
        // 백엔드 서버 검증 로직을 간단하게 코드로 구현
    if (email !== testUser.email || password !== testUser.password) {
        return {
            errors: {
                email: ["Invalid email or password"],
            },
        };
    }

    // 3. 인증이 성공했을 경우, 자체적으로 세션 정보(JWT)를 생성 후 쿠키에 저장
    // (실제로는 백엔드 서버를 통해 응답받은 토큰을 적절한 곳에 저장하는 처리를 수행하는 곳)
    await createSession(testUser.id);

    // 4. 사용자를 적절한 페이지로 이동시킴(리다이렉트)
    redirect('/dashboard');
    // /dashbord 경로는 인증된 사용자만 접근할 수 있는 private 경로(route)

}

// 로그아웃 처리 함수
export async function logout() {
    // 1. 쿠키에서 세션 정보 제거(JWT 토큰 제거)
    await deleteSession();
    redirect('/login');

    // 2. 사용자를 로그인 페이지 or 메인 페이지(퍼블릭 경로)로 이동(리다이렉트)
}