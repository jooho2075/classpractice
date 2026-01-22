
// 라우트(URL 요청)가 수행되기 전에 먼저 호출되는 함수
// ex. lh:3-/login, lh:3-/dashboard 등, 특정 라우트에 대한 렌더링 요청이 수행될 때

import { cookies } from "next/headers";
import { decrypt } from "./app/lib/session";
import { NextResponse } from "next/server";

// Public / Protected 라우트 목록
const protectedRoutes = ['/dashboard']; // 인증된 사용자만 접근 가능 경로
const publicRotes = ['/login', '/']; // 누구나 접근 가능 경로

export default async function proxy(req) {
    
    // 1.현재 요청된 경로(route)가 무엇인지 확인
    const path = req.nextUrl.pathname;
    console.log(path);

        // 해당 경로가 누구나 접근 가능한 public 경로인지, 
        // 인가된 사용자만 접근 가능한 protected 경로인지
        const isProtectedRoute = protectedRoutes.includes(path);
        const isPublicRoute = publicRotes.includes(path);

    // 2. 쿠키에서 JWT(session)을 추출, 토큰 내에 userId값 확인
    const token = (await cookies()).get("session")?.value; // 쿠키에서 토큰(session)을 추출
    const session = await decrypt(token); // JWT 복호화(userId값 확인하기 위해)
    
    // 3. 토큰이 유효한지에 따라 특정 라우트로 이동시킬지 말지 분기 처리
    if (isProtectedRoute && !session?.userId) { // 보호된 라우트이고, 인증되지 않은 사용자의 경우
        return NextResponse.redirect(new URL("/login", req.nextUrl));
      }

    if (isPublicRoute && session?.userId) { // 퍼블릭 라우트이고, userId가 존재할 경우
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

  return NextResponse.next();
}