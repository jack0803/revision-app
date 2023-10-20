import React, { useState } from "react";
import "../UserCSS.css";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
// import { Link } from "react-router-dom"
const BaseURL = "http://localhost:5000/api/user";

const AddUser = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    const dataToSubmit = {
      // ...user, // Any additional form data object here
    };
    axios
      .post(`${BaseURL}/addUser`, user)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

      navigate('/');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
        <div className="row mb-4 ">
          <div className="col">
            <div className="form-outline">
              <input
                value={user.firstName}
                onChange={handleChange}
                name="firstName"
                type="text"
                id="form3Example1"
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example1">
                First Name
              </label>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <input
                value={user.lastName}
                onChange={handleChange}
                name="lastName"
                type="text"
                id="form3Example2"
                className="form-control"
              />
              <label className="form-label" htmlFor="form3Example2">
                Last Name
              </label>
            </div>
          </div>
        </div>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <input
            value={user.email}
            onChange={handleChange}
            name="email"
            type="email"
            id="form3Example3"
            className="form-control"
          />
          <label className="form-label" htmlFor="form3Example3">
            Email address
          </label>
        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <input
            value={user.mobile}
            onChange={handleChange}
            name="mobile"
            type="text"
            id="form3Example4"
            className="form-control"
          />
          <label className="form-label" htmlFor="form3Example4">
            Mobile Number
          </label>
        </div>

        {/* <!-- Submit button --> */}
        <button
          type="submit"
          onSubmit={handleSubmit}
          className="btn btn-primary btn-block mb-4"
        >
          Confirm
        </button>
      </form>
    </>
  );
};
export default AddUser;
