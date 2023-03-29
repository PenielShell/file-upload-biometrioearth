import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from '../utilities/Forms'

import axiosInstance from "../axios";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
    const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [validate, setValidate] = useState({});
 
  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
        name: {
            value: name,
            isRequired: true,
        },
        email: {
            value: email,
            isRequired: true,
            isEmail: true
        },
        password: {
            value: password,
            isRequired: true,
            minLength: 6
        }
    });

    if (validator !== null) {
        setValidate({
            validate: validator.errors
        })

        isValid = false
    }
    return isValid;
}

  const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
  }


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

  const handleSubmit = async () => {
    try {
      let response = await fetch("http://localhost:7070/graphql/",{
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "query": `
              mutation {
                tokenAuth(
                  username: "admin",
                  password: "admin"
                ) {
                  token
                }
            }
          `
        })
      })
      let userTokens = await response.json();
      localStorage.setItem("access_token", userTokens.data.tokenAuth.token);
      axiosInstance.defaults.headers["Authorization"] =
      "JWT " + localStorage.getItem("access_token");
      navigate('/');
     
    } catch (error) {
      console.log({error})
    }

  };


  return (
     <div className="row g-0 auth-wrapper">
      <div className="col-12 col-md-6 col-lg-6 auth-main-col text-center">
        <div className="d-flex flex-column align-content-end">
          <div className="auth-body mx-auto">
            <p className='text-white fs-8'>Register below to get started</p>
            <div className="auth-form-container text-start">
              <form className="auth-form" autoComplete={"off"}>
              <div className="row">
                    <div className="col-md-6">
                     <div className="firstname mb-3">
                        <label htmlFor="firstname" className='form-label px-1'>Firstname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="firstname"
                            placeholder="firstname"
                        onChange={handleChange}
                        />
                        </div>
                    </div>
                    <div className="col-md-6">
                      <div className="lastname mb-3">
                        <label htmlFor="lastname" className='form-label px-1'>Lastname</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="lastname"
                            placeholder="lastname"
                        onChange={handleChange}
                        />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
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
                    </div>
                    <div className="col-md-6">
                    <div className="email mb-3">
                        <label htmlFor="email" className='form-label px-1'>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="lastname"
                        onChange={handleChange}
                        />
                        </div>
                    </div>

                </div> 
                <div className="row form-group">
                    <div className="col-md-4">
                        <label htmlFor="isSuperUser" className="form-label">Super User?</label>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label text-white" htmlFor="flexRadioDefault1">
                          Yes
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label text-white" htmlFor="flexRadioDefault1">
                          No
                        </label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="isStaff" className="form-label">Are you a Staff?</label>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label text-white" htmlFor="flexRadioDefault1">
                          Yes
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label text-white" htmlFor="flexRadioDefault1">
                          No
                        </label>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="isStaff" className="form-label">can you login</label>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label text-white" htmlFor="flexRadioDefault1">
                          Yes
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                        <label className="form-check-label text-white" htmlFor="flexRadioDefault1">
                          No
                        </label>
                        </div>
                    </div>

                </div>
                {/* <div className="row">
                    <div className="col-md-6"></div>
                    <div className="col-md-6"></div>

                </div> */}
            

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
