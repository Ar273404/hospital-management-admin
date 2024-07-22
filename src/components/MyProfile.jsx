import React, { useContext } from "react";
import { Context } from "../index";
import moment from "moment";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaIdCard,
  FaBirthdayCake,
  FaUserTie,
} from "react-icons/fa";
import { BiMaleFemale } from "react-icons/bi";

const MyProfile = () => {
  const { admin } = useContext(Context);
  console.log(admin);

  return (
    <div className="profile-container p-4 md:p-8">
      <div className="profile-card bg-white shadow-lg rounded-lg overflow-hidden max-w-sm mx-auto">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7nFdX1g_CVR4WyP5LgKOGytP0J8PE53_RQ&s"
          alt="Profile"
          className="w-full h-60 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl font-bold text-blue-900 mb-5 text-center">
            {admin.firstName} {admin.lastName}
          </h3>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <FaEnvelope className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">Email:</strong> {admin.email}
          </p>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <FaPhoneAlt className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">Phone:</strong> {admin.phone}
          </p>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <FaBirthdayCake className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">DOB:</strong>{" "}
            {moment(admin.dob).format("DD/MM/YYYY")}
          </p>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <FaIdCard className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">NIC:</strong> {admin.nic}
          </p>
          <p className="text-gray-700 text-base mb-3 flex items-center">
            <BiMaleFemale className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">Gender:</strong> {admin.gender}
          </p>
          <p className="text-gray-700 text-base mb-2 flex items-center">
            <FaUserTie className="mr-2 text-blue-500 text-xl" />
            <strong className="mr-2">Role:</strong> {admin.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
