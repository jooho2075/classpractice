// products/page.js, 상품 목록이 보여지는 페이지

import Link from "next/link";

const productList = [1, 2, 3, 4];

const ProductList = () => {
    return (
        <div>
            <h1>Product List</h1>
            {/* 하드코딩된 리스트 데이터를 배열을 통해 렌더링 */}            
            {productList.map(productId => (
                <h2 key={productId}>
                    <Link href={`products/${productId}`}>Product {productId}</Link>
                </h2>
            ))}
        </div>
    );
}
export default ProductList;