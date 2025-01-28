import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	const Navigate = useNavigate();

	function handleLogout() {
		actions.logout();
		Navigate('/');
	};

	function handlePrivate() {
		Navigate('/private');
	};

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            store.auth = true;
        } else {
            store.auth = false;
        }
    }, [actions]);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container-fluid d-flex justify-content-between m-0">
				<h5>AUTENTICACION</h5>
				<div className="ml-auto">
					{store.auth === true ?
						<div>
							<button className="btn btn-danger me-3" onClick={() => handleLogout()}>Logout</button>
							<button className="btn btn-primary" onClick={() => handlePrivate()}>Private route</button>
						</div> : ""}
				</div>
			</div>
		</nav>
	);
};
