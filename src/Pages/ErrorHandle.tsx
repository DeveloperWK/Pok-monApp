import { Link } from "react-router";

const ErrorHandle = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <h1 style={{ color: "red" }}>Something went wrong</h1>
      <Link to="/">Go back to home page</Link>
    </div>
  );
};

export default ErrorHandle;
