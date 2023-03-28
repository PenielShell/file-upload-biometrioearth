import { useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validate, setValidate] = useState({});

  

  const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
  }

  const history = useNavigate();

  const initialFormData = Object.freeze({
    username: "",
    password: "",
  });

  const [formData, updateFormData] = useState(initialFormData);

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axiosInstance
      .post(`tokenAuth/`, {
        username: formData.username,
        password: formData.password,
      })
      .then((res) => {
        console.log({res})
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh_token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + localStorage.getItem("access_token");
        history.push("/");
        //console.log(res);
        //console.log(res.data);
      }).catch((error) =>{
          console.log((error));
      });
  };


  return (
     <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-6 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p className='text-white fs-8'>Login below to get started</p>
            <div className="auth-form-container text-start">
              <form className="auth-form" autoComplete={"off"}>
                <div className="username mb-3">
                <label htmlFor="username" className='form-label px-1'>Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    name="username"
                    placeholder="Username"
                   onChange={handleChange}
                  />
                </div>

                <div className="password mb-3">
                    <div className="input-group">
                        <input type={showPassword ? 'text' : 'password'}
                            className={`form-control ${validate.validate && validate.validate.password ? 'is-invalid ' : ''}`}
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>

                        <div className={`invalid-feedback text-start ${(validate.validate && validate.validate.password) ? 'd-block' : 'd-none'}`} >
                            {(validate.validate && validate.validate.password) ? validate.validate.password[0] : ''}
                        </div>
                    </div>

                </div>
                <div className="text-center">
                  <button
                    type="button"
                    className="btn btn-primary w-50 py-2 theme-btn mx-auto btn-text"
                    onClick={handleSubmit}
                  >
                    Login
                  </button>
                </div>
              </form>
              {/* <i className='fas fa-chevron-down mr-2'></i> */}
              <hr />
              <div className="auth-option text-center">
                  <p className='text-white fs-7 mt-5'>
                   Copyright &copy; biometrioearth {new Date().getFullYear()}
                  </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-6 col-lg-6 h-100 auth-background-col">
        <div className="auth-background-holder"></div>
        <div className="auth-background-mask"></div>
      </div>
    </div>
  );
};

export default Login;
