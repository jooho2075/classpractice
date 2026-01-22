// app/not-found.js
// lh:3000/{존재하지 않는 경로}

// nafe
const NotFound = () => {
    return (
        <div className="flex justify-center">
            <h2 className="italic font-bold text-red-500 underline text-7xl">404 Not Found!</h2>
        </div>
    );
}

export default NotFound;