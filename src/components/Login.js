import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../api/axios";
const LOGIN_URL = "/auth";
const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(JSON.stringify(response?.data));
      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;
      console.log("roles", roles);
      setAuth({ user, pwd, accessToken, roles });
      setUser("");
      setPwd("");
      console.log("roles.includes(2002)", roles.includes(2002));
      if (roles.includes(2002)) {
        return navigate("/rolecrud", { replace: true });
      } else if (roles.includes(2003)) {
        return navigate("/usercrud", { replace: true });
      } else if (roles.includes(2001)) {
        return navigate("/bookappointment", { replace: true });
      } else {
        return navigate(from, { replace: true });

        return navigate("/bookappointment", { replace: true });
      }
      return navigate(from, { replace: true });
      //navigate to users component
    } catch (error) {
      if (!error?.response) {
        setErrMsg("Server is not reachable. Please try again later.");
      } else if (error?.response?.status === 401) {
        setErrMsg("Invalid username or password");
      } else if (error?.response?.status === 400) {
        setErrMsg("Missing username or password");
      } else {
        setErrMsg("An error occurred. Please try again later.");
      }
      errRef.current.focus();
    }
  };
  const togglePersist = () => {
    setPersist((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <p ref={errRef} className="text-center text-red-500">
          {" "}
          {errMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {errMsg && <span className="block sm:inline">{errMsg}</span>}
            </div>
          )}
        </p>
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-xl font-bold mb-6 text-center">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                username
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  {/* <FontAwesomeIcon icon={faUser} className="text-gray-400" /> */}
                </span>
                <input
                  className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Enter your username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                  // value={formData.username}
                  // onChange={handleChange}
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                  {/* <FontAwesomeIcon icon={faLock} className="text-gray-400" /> */}
                </span>
                <input
                  className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                  // value={formData.password}
                  // onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-purple-800 hover:bg-purple-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
              <div className="persistCheck">
                <input
                  type="checkbox"
                  id="persist"
                  name="persist"
                  value={persist}
                  onChange={() => togglePersist()}
                />
                <label htmlFor="persist">Trust this device</label>
              </div>
              <a
                className="inline-block align-baseline font-bold text-sm text-purple-800 hover:text-purple-900"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <Link to="/register">
            {" "}
            <h2 className="text-xl font-bold mb-6 text-center">Sign Up</h2>
          </Link>
          <form onSubmit="">
            {/* Similar form structure for signup */}
            {/* Replace input fields and buttons with appropriate signup fields */}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
