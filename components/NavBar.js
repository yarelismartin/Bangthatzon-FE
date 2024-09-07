/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/UserData';

export default function NavBar() {
  const [userInfo, setUserInfo] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    if (user.uid) {
      getSingleUser(user.uid)
        .then((u) => {
          setUserInfo(u);
        });
    }
  }, [user]);

  return (
    <div className="navbar bg-base-100">
      <div className="flex items-center w-full">
        {/* Logo */}
        <div className="flex-none">
          <Link passHref href="/">
            <img src="/z-removebg-preview.png" alt="logo" style={{ width: '44px', height: '44px' }} />
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <div className="flex-1 flex justify-center">
          <div className="flex space-x-4">
            <Link passHref href="/">
              <a className="btn btn-ghost">New</a>
            </Link>
            <Link passHref href="/products">
              <a className="btn btn-ghost">Shop</a>
            </Link>
          </div>
        </div>

        {/* Cart */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <Link passHref href={`/users/${userInfo.id}/orders?status=open`}>
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle" aria-label="Cart">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* User Menu */}
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={userInfo.image}
                />
              </div>
            </div>
            <ul
              role="menu"
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link className="justify-between" href="/profile">
                  Profile
                </Link>
              </li>
              <li><a href={`/users/${userInfo.id}/order_history`}>Purchases</a></li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
