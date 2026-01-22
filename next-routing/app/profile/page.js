// app/page.tsx
'use client'

import { useState } from 'react'

export default function HomePage() {
  const [throwError, setThrowError] = useState(false)
  console.log(throwError);
  

  if (throwError) {
    // 강제로 error boundary를 발생시킴
    throw new Error('Test error thrown from page')
  }

  return (
    <div style={{ padding: 24 }}>
      <h1>Next.js Error Boundary Reset Demo</h1>

      {/* 클릭하면 throwError가 true가 되어 error boundary trigger */}
      <button
        onClick={() => setThrowError(true)}
        style={{
          marginTop: 16,
          padding: '8px 16px',
          cursor: 'pointer',
        }}
      >
        Trigger Error
      </button>
    </div>
  )
}
