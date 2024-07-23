import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FaBars } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../API";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const { isAuthenticated, setIsAuthenticated, admin } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${url}/user/admin/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <>
      {isAuthenticated && (
        <>
          <div className="fixed top-0 left-0 z-50 p-4 lg:hidden">
            <button
              aria-label="Toggle Sidebar"
              className="text-gray-700 hover:text-gray-900 focus:outline-none"
              onClick={() => setShowSidebar(!showSidebar)}>
              {showSidebar ? (
                <ImCross className="font-bold text-2xl text-white" />
              ) : (
                <FaBars className="ml-2 font-bold text-2xl" />
              )}
            </button>
          </div>

          {/* Sidebar */}
          <nav
            className={`bg-[#121e31] h-screen fixed top-0 left-0 py-6 font-[sans-serif] overflow-auto ${
              showSidebar ? "block" : "hidden"
            } lg:block w-34`}>
            <div className="flex flex-col flex-wrap items-center cursor-pointer px-1 mt-4">
              <Link to={"/profile"}>
                <img
                  src="https://readymadeui.com/profile_2.webp"
                  className="w-12 h-12 rounded-full border-2 border-white"
                  alt="Profile"
                />
              </Link>
              <div className="mt-2 text-center">
                <p className="text-sm font-bold text-white mt-2">
                  {admin.firstName} {admin.lastName}
                </p>
                <p className="text-xs text-white mt-0.5">{admin.email}</p>
              </div>
            </div>

            <ul className="space-y-1 mt-10">
              <li onClick={() => navigateTo("/")} className="cursor-pointer">
                <a
                  aria-label="Home"
                  className="text-white text-sm flex flex-col items-center bg-[#22284f] rounded px-4 py-5 transition-all">
                  <TiHome className="text-xl" />
                  <span>Home</span>
                </a>
              </li>
              <li
                onClick={() => navigateTo("/doctors")}
                className="cursor-pointer">
                <a
                  aria-label="Doctors"
                  className="text-white text-sm flex flex-col items-center hover:bg-[#22284f] rounded px-4 py-5 transition-all">
                  <FaUserDoctor className="text-xl" />
                  <span>Doctors</span>
                </a>
              </li>
              <li
                onClick={() => navigateTo("/admin/addnew")}
                className="cursor-pointer">
                <a
                  aria-label="Add New Admin"
                  className="text-white text-sm flex flex-col items-center hover:bg-[#22284f] rounded px-4 py-5 transition-all">
                  <MdAddModerator className="text-xl" />
                  <span>Add New Admin</span>
                </a>
              </li>
              <li
                onClick={() => navigateTo("/doctor/addnew")}
                className="cursor-pointer">
                <a
                  aria-label="Add New Doctor"
                  className="text-white text-sm flex flex-col items-center hover:bg-[#22284f] rounded px-4 py-5 transition-all">
                  <MdAddModerator className="text-xl" />
                  <span>Add New Doctor</span>
                </a>
              </li>
              <li
                onClick={() => navigateTo("/messages")}
                className="cursor-pointer">
                <a
                  aria-label="Messages"
                  className="text-white text-sm flex flex-col items-center hover:bg-[#22284f] rounded px-4 py-5 transition-all">
                  <AiFillMessage className="text-xl" />
                  <span>Messages</span>
                </a>
              </li>
              <li onClick={handleLogout} className="cursor-pointer">
                <button
                  aria-label="Logout"
                  className="text-white ml-7 text-sm flex flex-col items-center hover:bg-[#22284f] rounded px-4 py-5 transition-all bg-transparent border-none outline-none">
                  <RiLogoutBoxRLine className="text-xl font-bold text-yellow-400" />
                  <span>Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </>
  );
};

export default Sidebar;
