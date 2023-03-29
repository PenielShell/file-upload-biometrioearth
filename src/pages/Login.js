import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from '../utilities/Forms'
import axiosInstance from "../axios";

const Login = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
        if (showPassword) {
            setShowPassword(false);
        } else {
            setShowPassword(true)
        }
  }

  const navigate = useNavigate();

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

  const getRefreshToken = async (token) =>{
    try {
      let response = await fetch("http://localhost:7070/graphql/",{
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "query": `
              mutation {
                refreshToken(
                  token: "${token}"
                ) {
                  token
                }
            }
          `
        })
      })
      let refreshTokens = await response.json();
      console.log({refreshTokens})
      localStorage.setItem("refresh_token", refreshTokens.data.refreshToken.token);
    } catch (error) {
      console.log({error})
    }
  }

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
                  username: "${formData.username}",
                  password: "${formData.password}"
                ) {
                  token
                }
            }
          `
        })
      })
      let userTokens = await response.json();
      localStorage.setItem("access_token", userTokens.data.tokenAuth.token);
      getRefreshToken(userTokens.data.tokenAuth.token)
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
                            className='form-control'
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={handleChange}
                        />

                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
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
