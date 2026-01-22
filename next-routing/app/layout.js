import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="bg-lime-200">Header</header>
        {/*children props를 통해 app/page.js 컴포넌트가 전달됨*/}
        {children}
        <footer className="bg-orange-50">Footer</footer>
        {/*
          최상위 경로인 app/layout.js에 작성했기 때문에
          모든 하위 라우트 경로들의 레이아웃으로 결정됨

          ex.
          1h:3-/profile
          lh:3-/dashboard 등 테스트
        */}
      </body>
    </html>
  );
}
