import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    const { store, actions } = useContext(Context);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();


    const handleLogin = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Todos los campos son requeridos.");
            return;
        }

        actions.loginUser(email, password)
            .then((data) => {
                console.log("Login exitoso:", data);
                if (data.access_token) {
                    
                    actions.checkAuth();
                    navigate('/private');
                } else {
                    setErrorMessage("No se recibió el token.");
                }
                
            })
            .catch((error) => {
                console.error("Error durante el login:", error);
                setErrorMessage(error.message);
            });
    };
    return (
        <>
                <div className="text-center mt-5">
                    <div className="container">
                        <h1>Ingresa tus datos de usuario</h1>
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}
                        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                        <form>
                            <div className="row mb-3">
                                <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                                <div className="col-sm-10">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="inputEmail3"
                                        placeholder="put your email here"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                                <div className="col-sm-10">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="inputPassword3"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-evenly">
                                <button onClick={handleLogin} type="button" className="btn btn-primary">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
};