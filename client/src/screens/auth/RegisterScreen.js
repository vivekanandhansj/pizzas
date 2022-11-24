import React, { useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterAction } from "../../action/userAction";
import Error from "../../components/Error";
//import Success from "../components/Success";
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

export default function RegisterScreen() {
  AOS.init();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const dispatch = useDispatch();
  const registerdata = useSelector((state) => state.userRegisterReducer);
  const { loading, success, error } = registerdata;
  const navigate = useNavigate();
  function register() {
    if (pass.length === 4 && !isNaN(pass) && username !== "" && email !== "") {
      if (pass === cpass) {
        const user = {
          username: username,
          email: email,
          password: pass,
        };
        console.log(user);
        dispatch(userRegisterAction(user));
      } else {
        alert("Passwords doesn't matched!!");
      }
    } else {
      alert("Please check your Register Form again!!");
    }
  }
  function redirect() {
    navigate("/regtologin");
  }
  return (
    <div className="row justify-content-center register">
      <div className="col-md-5" data-aos="fade-up">
        <div className="userForm shadow-lg p-3 mb-5 bg-white rounded">
          {loading && (
            <img
              src="https://i0.wp.com/codemyui.com/wp-content/uploads/2019/01/Rotating-Pizza-Slice-Preloader.gif?w=880&ssl=1"
              alt="loading"
              style={{ width: "100px", height: "100px" }}
            />
          )}
          {success && redirect()}
          {error && (
            <Error
              heading="Oops,Wrong details"
              content="Username or Email already exists.Kindly go through it and register again.."
            />
          )}
          <h1 className="mb-3">
            <i>Register your details with us</i>
          </h1>
          <input
            type="text"
            placeholder="UserName"
            className="form-control mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password <4-digit>"
            className="form-control mb-4"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="ConfirmPassword"
            className="form-control mb-4"
            value={cpass}
            onChange={(e) => setCpass(e.target.value)}
            required
          />
          <Button variant="danger" onClick={register}>
            Register
          </Button>
          <h1>
            <Nav.Link href="/login" style={{ color: "black" }}>
              Login here
            </Nav.Link>
          </h1>
        </div>
      </div>
    </div>
  );
}
