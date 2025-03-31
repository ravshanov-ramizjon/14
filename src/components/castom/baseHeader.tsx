import { Link } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import LoginForm from "./formLogin";
import React from "react";

const Header: React.FC = () => {
  return (
    <header className="w-full flex fixed top-[0] z-999 items-center justify-between px-6 py-4 bg-black text-white h-16">
      <div className="flex items-center gap-6">
        <img
          onClick={() => (window.location.href = "/")}
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Green.png"
          alt="Spotify Logo"
          className="h-8 cursor-pointer"
        />
        <nav>
          <Link to="/" className="hover:text-green-500">
            <IoHome />
          </Link>
        </nav>
        <nav className="hidden md:flex gap-6 text-sm font-semibold">
          <Link to="https://www.spotify.com/us/premium/" className="hover:text-green-500">
            Premium
          </Link>
          <Link to="https://support.spotify.com/us/" className="hover:text-green-500">
            Help
          </Link>
          <Link to="https://www.spotify.com/us/download/" className="hover:text-green-500">
            Download
          </Link>
        </nav>
      </div>
      <div className="flex gap-4">
        <button className="text-sm font-semibold hover:text-green-500">
          <Link to="https://www.spotify.com/us/signup?forward_url=https%3A%2F%2Fopen.spotify.com%2F">
            Register
          </Link>
        </button>
        <LoginForm />
      </div>
    </header>
  );
};

export default Header;
