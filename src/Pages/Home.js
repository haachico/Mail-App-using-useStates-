import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <button>
        <Link to="/inbox">Log in</Link>
      </button>
    </div>
  );
};

export default Home;
