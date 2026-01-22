'use client'

import { logout } from "../login/actions";

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="text-xl mb-3">Dashboard 페이지(인증된 사용자만 접근 가능)</div>
      <button onClick={() => logout()} className="text-white font-sans bg-gray-800 text-lg px-5 py-2.5 me-2 mb-2">Logout</button>
    </div>
  );
}
