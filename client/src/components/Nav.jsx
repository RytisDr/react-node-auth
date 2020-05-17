import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ isAuth, logout }) => {
  return (
    <nav>
      <NavLink exact to="/">
        Home
      </NavLink>
      {isAuth ? (
        <>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <a onClick={() => logout()} href="#logout">
            Logout
          </a>
        </>
      ) : (
        <>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Signup</NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
