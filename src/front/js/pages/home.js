import React, { useState, useEffect, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Home = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/login");
        }

    }, [navigate, store]);
    const navigate = useNavigate();
    return (
        <>
            <div className="row col-12 d-flex flex-column align-items-center text-center my-3">
                <h1>Bienvenido a la página de inicio. Resgístrate aquí o haz login!</h1>
                <button className="btn btn-primary w-25 my-3" onClick={() => navigate('/signup')}>Registrate</button>
                <button className="btn btn-primary w-25" onClick={() => navigate('/login')}>Login</button>
            </div>
        </>
    );
}