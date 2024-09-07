/* eslint-disable max-len */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/UserData';
import { signOut } from '../utils/auth';

export default function Profile() {
  const [userInfo, setUserInfo] = useState();
  const { user } = useAuth();

  const getUser = () => {
    getSingleUser(user.uid).then(setUserInfo);
  };

  useEffect(() => {
    getUser();
  }, [user.uid]);

  return (

    <section className="vh-100 bg-gray-100">
      <div className=" py-5 h-full">
        <div className="flex justify-center items-center h-full">
          <div className="lg:w-1/2 mb-4">
            <div className="bg-white rounded-lg shadow-md mb-3">
              <div className="">
                <div className=" p-4">
                  <img
                    src={userInfo?.image}
                    alt="sellers"
                    className="m-auto mb-4"
                    style={{
                      width: '140px',
                      height: '140px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginRight: '15px',
                    }}
                  />
                  <h6 className="text-3xl font-semibold text-center mb-3">About You</h6>
                  <hr className="border-gray-300 my-2" />
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <h6 className="text-sm font-semibold">First Name</h6>
                      <p className="text-gray-600">{userInfo?.firstName}</p>
                    </div>
                    <div className="w-1/2">
                      <h6 className="text-sm font-semibold">Last Name</h6>
                      <p className="text-gray-600">{userInfo?.lastName}</p>
                    </div>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="w-1/2">
                    <h6 className="text-sm font-semibold">Display Name</h6>
                    <p className="text-gray-600">{userInfo?.username}</p>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="w-1/2">
                    <h6 className="text-sm font-semibold">Email</h6>
                    <p className="text-gray-600">{userInfo?.email}</p>
                  </div>
                  <hr className="border-gray-300 my-2" />
                  <div className="w-1/2">
                    <h6 className="text-sm font-semibold">Address</h6>
                    <p className="text-gray-600">{userInfo?.address}</p>
                  </div>
                  <div className="flex mt-4">
                    <Link passHref href={`/profile/edit/${userInfo?.id}`}>
                      <svg className=" cursor-pointer" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M24.8992 22.5358L28.223 19.212L28.9301 19.9191L25.6063 23.2429L24.6305 23.5116L24.8992 22.5358ZM29.6372 17.7978L30.3443 18.5049L31.237 17.6122L31.2373 17.6069L31.2373 17.6067C31.2376 17.5991 31.2384 17.5779 31.2204 17.5332C31.2017 17.4864 31.1421 17.364 30.9601 17.182C30.7781 17 30.6557 16.9405 30.6089 16.9217C30.5642 16.9037 30.543 16.9045 30.5354 16.9048L30.5352 16.9048L30.5299 16.9051L29.6372 17.7978ZM29.285 15.3216C29.3175 15.2891 29.3514 15.2592 29.3901 15.2345C29.6716 15.0548 30.9675 14.3609 32.3743 15.7678C33.7812 17.1746 33.0873 18.4705 32.9076 18.752C32.8829 18.7907 32.853 18.8246 32.8205 18.8571L26.8336 24.844C26.7112 24.9665 26.559 25.055 26.392 25.101L23.4646 25.9071C22.7165 26.1131 22.029 25.4256 22.235 24.6775L23.0411 21.7501C23.0871 21.5831 23.1756 21.4309 23.2981 21.3085L29.285 15.3216ZM16 17C15.4477 17 15 17.4477 15 18V32C15 32.5523 15.4477 33 16 33H31C31.5523 33 32 32.5523 32 32V26C32 25.4477 31.5523 25 31 25C30.4477 25 30 25.4477 30 26V31H17V19H22.5C23.0523 19 23.5 18.5523 23.5 18C23.5 17.4477 23.0523 17 22.5 17H16Z" fill="#222222" />
                      </svg>
                    </Link>
                    <button type="button" className="logout" onClick={signOut}>Logout</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
