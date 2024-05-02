import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="text-center">
            <h2 className="text-6xl font-bold">404</h2>
            <p className="text-2xl font-semibold mt-4 mb-10">Page not found!</p>
            <Link to="/"><button className="btn btn-primary">Back to Home</button></Link>
        </div>
    );
};

export default ErrorPage;