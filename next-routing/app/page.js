import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href='/blog'>블로그</Link>
      <Link href="/products" className="text-2xl text-blue-500 underline">상품</Link>
    </div>
  );
}
