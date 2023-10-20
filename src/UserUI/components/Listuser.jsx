import { useState, useEffect } from "react";
import "../UserCSS.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { Link } from "react-router-dom"
const BaseURL = "http://localhost:5000/api/user";
const ListUser = () => {
  const [userList, setUserList] = useState(null);
  const [pageOption, setPageOption] = useState({
    page: 1,
    limit: 8,
  });
  const [userUpdate, setUserUpdate] = useState({});
  const navigate = useNavigate();

  const deleteUser = (e, id) => {
    e.preventDefault();
    axios.delete(`${BaseURL}/delete?id=${id}`).then((response) => {
      console.log(response.data);
    });
  };

  const fetchUserList = () => {
    axios
      .get(`${BaseURL}/list?page=${pageOption.page}&limit=${pageOption.limit}`)
      .then((response) => {
        setUserList(response.data);
        return (response.data);
      });
  }
  const handleSubmit = (e , id) => {
    e.preventDefault();
    console.log("inside submit");
    axios
      .put(`${BaseURL}/update?id=${id}`, userUpdate)
      .then((response) => {
        console.log("success" + response);
      })
      .catch((error) => {
        console.log(error);
      });

    navigate("/");
  };

  useEffect( () => {
    fetchUserList();
  }, [handleSubmit]);

  const handleChange = (event) => {
    setUserUpdate({ ...userUpdate, [event.target.name]: event.target.value });
  };

  
  const handlePreviousPage =  () => {
    setPageOption({ ...pageOption, page: --pageOption.page });
    fetchUserList();

  };
  const handleNextPage =  () => {
    setPageOption({ ...pageOption, page: ++pageOption.page });
    fetchUserList();
  };

  if (!userList) return null;

  return (
    <>
      <div className="d-flex align-content-around flex-wrap">
        {userList.data.rows.map((user) => (
          <div className="card m-6 w-25" key={user.id}>
            <div className="card-header">
              <h4>
                {user.firstName} <span></span> {user.lastName}
              </h4>
            </div>
            <div className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">{user.mobile}</li>
                <li className="list-group-item">{user.email}</li>
              </ul>
              {/* <Link to='/updateuser'> */}
              <button
                className=" m-2 btn btn-info"
                type="button"
                data-toggle="modal"
                data-target="#exampleModalLong"
              >
                Update
              </button>
              <div
                className="modal fade"
                id="exampleModalLong"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLongTitle"
                aria-hidden="true"
              >
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLongTitle">
                        Update Info
                      </h5>
                    </div>
                    <div className="modal-body">
                      <form onSubmit={(e) => handleSubmit(e,user.id)}>
                        {/* <!-- 2 column grid layout with text inputs for the first and last names --> */}
                        <div className="row mb-4 ">
                          <div className="col">
                            <div className="form-outline">
                              <input
                                defaultValue={user.firstName}
                                value={userUpdate.firstName}
                                onChange={handleChange}
                                name="firstName"
                                type="text"
                                id="form3Example1"
                                className="form-control"
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example1"
                              >
                                First Name
                              </label>
                            </div>
                          </div>
                          <div className="col">
                            <div className="form-outline">
                              <input
                                defaultValue={user.lastName}
                                value={userUpdate.lastName}
                                onChange={handleChange}
                                name="lastName"
                                type="text"
                                id="form3Example2"
                                className="form-control"
                              />
                              <label
                                className="form-label"
                                htmlFor="form3Example2"
                              >
                                Last Name
                              </label>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Email input --> */}
                        <div className="form-outline mb-4">
                          <input
                            defaultValue={user.email}
                            value={userUpdate.email}
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
                            defaultValue={user.mobile}
                            value={userUpdate.mobile}
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
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-dismiss="modal"
                            onClick={() => {navigate("/");}}
                          >
                            Close
                          </button>
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              {/* </Link> */}
              <button
                className=" m-2 btn btn-warning"
                onClick={(e) => deleteUser(e, user.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="d-flex justify-content-center">
        <button
          className=" m-2 btn btn-info"
          onClick={handlePreviousPage}
          disabled={pageOption.page === 1 ? true : false}
        >
          Previous
        </button>
        <button 
          className=" m-2 btn btn-warning" 
          onClick={handleNextPage}
          disabled={pageOption.page === userList.data.totalPages ? true : false}  
        >
          Next
        </button>
      </div>
    </>
  );
};

export default ListUser;
