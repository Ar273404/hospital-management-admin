import React, { useContext, useState } from "react";
import { Context } from "../index";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {FaUserTie} from "react-icons/fa";
import { url } from "../API";

const AddDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState(null);
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };

    reader.readAsDataURL(file);
  };

  const handleNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);

      const response = await axios.post(
        `${url}/user/doctor/addnew`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigateTo("/");
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div className="font-sans">
      <div className="mt- text-center bg-gradient-to-r from-gray-600 to-gray-900 min-h-40 sm:p-6 ">
        <h4 className="sm:text-3xl text-2xl font-bold text-white mt-1">
          Register New Doctor Here👩‍⚕️👨‍⚕️
        </h4>
      </div>

      <div className="mx-4 mb-4 -mt-20">
        <form
          onSubmit={handleNewDoctor}
          className="max-w-4xl mx-auto bg-white shadow-md sm:p-8 p-4 rounded-md">
          <div>
            <img
              src={docAvatarPreview ? docAvatarPreview : <FaUserTie/>}
              alt="🧑‍⚕️doctor"
              className="w-20 h-auto mb-5"
            />
            <input type="file" onChange={handleAvatar} />
          </div>
          <div className="grid md:grid-cols-2 gap-2">
            <div>
              <label className="text-gray-900 font-semibold mb-2 mt-2 block">
                First Name
              </label>
              <input
                name="name"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="bg-gray-600 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="text-gray-900 font-semibold mb-2 block">
                Last Name
              </label>
              <input
                name="lname"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="bg-gray-600 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label className="text-gray-900 font-semibold mb-2 block">
                Email Id
              </label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="bg-gray-600 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label className="text-gray-900 font-semibold mb-2 block">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-gray-600 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label className="text-gray-900 font-semibold mb-2 block">
                Mobile No.
              </label>
              <input
                name="number"
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                className="bg-gray-600 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label className="text-gray-900 font-semibold mb-2 block">
                Date of Birth
              </label>
              <input
                name="date"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-gray-600 font-semibold w-full text-sm text-white px-4 py-1 rounded-md outline-yellow-500 transition-all"
              />
            </div>
            <div>
              <label className="text-gray-900 font-semibold mb-1 block">
                Nic No.
              </label>
              <input
                name="number"
                type="number"
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value);
                }}
                className="bg-gray-600 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter 13 digit Nic"
              />
            </div>
            <div>
              <select
                value={gender}
                className="bg-gray-600 mt-6 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <select
                value={doctorDepartment}
                className="bg-gray-600 mt-6 font-semibold w-full text-sm text-white px-4 py-3 rounded-md outline-yellow-500 transition-all"
                onChange={(e) => setDoctorDepartment(e.target.value)}>
                <option value="">Select Department</option>
                {departmentsArray.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
              Add now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
