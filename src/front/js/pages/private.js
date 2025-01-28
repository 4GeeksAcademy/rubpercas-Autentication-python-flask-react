import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [privateData, setPrivateData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Usuario no registrado, volviendo a home");
            navigate('/');
        }
        const fetchData = async () => {
            const data = await actions.getPrivateData();
            if (data) setPrivateData(data);
        };

        fetchData();
        
    }, []);

    return (
        <div className="jumbotron">
            <h1 className="display-4">Ruta privada</h1>
            {privateData ? (
                <div>
                    <h2>{privateData.msg}</h2>
                </div>
            ) : (
                <p>Cargando datos...</p>
            )}

            <hr className="my-4" />

            <Link to="/">
                <span className="btn btn-primary btn-lg" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};

Private.propTypes = {
    match: PropTypes.object
};