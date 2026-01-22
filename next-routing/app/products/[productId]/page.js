// 특정 상품의 디테일 페이지에 보여질 내용
export default async function Page({ params }) {
    
    const { productId } = await params;

    return (
        <div>
            상품 {productId} 페이지입니다.
        </div>
    );
}