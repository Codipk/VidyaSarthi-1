// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth);
  return children;
  // if (token === null) {
  //   return children;
  // } else if (token !== null) {
  //   return children;
  //   //return <Navigate to="/dashboard/my-profile" />;
  //   //return <Navigate to="/about" />;
  // }
}

export default OpenRoute;
