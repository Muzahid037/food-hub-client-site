import React from 'react';
import './Login.css';
import { useForm } from "react-hook-form";
import loginImg from './../../images/login.jpg'
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useHistory, useLocation } from "react-router";
import { SocialIcon } from 'react-social-icons';

const Login = () => {

    const { error, setIsLoading, signInWithGoogle, processLogin } = useAuth();
    const history = useHistory();
    const location = useLocation();
    const redirect_uri = location.state?.from || "/";
    console.log(location.state?.from);

    const handleGoogleSignIn = () => {
        signInWithGoogle()
            .then((result) => {
                //const user = result.user;
                history.push(redirect_uri)
            })
            .finally(() => setIsLoading(false));
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data);
        processLogin(data.email, data.password);
    }

    //console.log(watch("example")); // watch input value by passing the name of it
    return (
        <div id="login" className="row row-cols-1 row-cols-sm-1 row-cols-md-2">

            <div className="col">
                <img className="img-fluid w-100" src={loginImg} alt="" />
            </div>

            <div className="col d-flex justify-content-center align-items-center">

                <div>
                    <div className="d-flex justify-content-center align-items-center my-5">
                        <h3>Please Login</h3>
                    </div>

                    <div className="d-flex justify-content-center  mb-3">
                        <button onClick={handleGoogleSignIn} className="google-btn">
                            <SocialIcon network="google" fgColor="#EFF3FF" />
                            Continue With Google
                        </button>
                    </div>
                </div>



            </div>
        </div>
    );
};

export default Login;