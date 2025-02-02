import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Navigate } from "react-router-dom";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const { store, actions } = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        actions.checkAuth();
        if (store.auth) {
            navigate("/private");
        }
    }, []);

    const handleSignup = (e) => {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Todos los campos son requeridos.");
            return;
        }

        actions.createUser(email, password)
            .then(() => {
                setSuccessMessage("Cuenta creada exitosamente.");
                setEmail("");
                setPassword("");
                setErrorMessage("");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            })
            .catch((error) => {
                console.error("Error creando cuenta:", error);
                if (error.message.includes("email already exists")) {
                    setErrorMessage("Este email ya está registrado. Por favor, prueba con otro.");
                } else {
                    setErrorMessage("Este email ya está registrado. Por favor, prueba con otro.");
                }
                setSuccessMessage("");
            });
    };

    return (
        <>
                <div className="text-center mt-5">
                    <div className="container">
                        <h1>Formulario de registo</h1>
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
                                <button onClick={handleSignup} type="button" className="btn btn-primary">Sign up</button>
                            </div>
                        </form>
                    </div>
                </div>
        </>
    );
};