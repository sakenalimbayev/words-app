import { Link } from "react-router-dom";

function Home() {
    return (
        <div>
            <h2>Home page</h2>
            <Link to={`challenge`}>Start</Link>
        </div>
    );
}

export default Home;
