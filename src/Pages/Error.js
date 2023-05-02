import { Link } from "react-router-dom";
const Error = () => {
  return (
    <div>
      <h2>No such page exist!</h2>
      <Link to="/inbox">Back to home</Link>
    </div>
  );
};

export default Error;
