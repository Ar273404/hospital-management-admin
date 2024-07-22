import React, { useContext, useState } from "react";
import { Context } from "../index";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { url } from "../API";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          `${url}/user/admin/addnew`,
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
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
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div class="font-[sans-serif]">
      <div class=" mt-20 text-center bg-gradient-to-r bg-gray-600  min-h-[160px] sm:p-6 p-4">
        <h4 class="sm:text-3xl text-2xl font-bold text-white mt-1 ">
          Add New Admin here👉👉👉
        </h4>
      </div>

      <div class="mx-4 mb-4 -mt-20">
        <form
          onSubmit={handleAddNewAdmin}
          class="max-w-4xl mx-auto bg-white shadow-[0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <div class="grid md:grid-cols-2 gap-2">
            <div>
              <label class="text-gray-900 font-semibold mb-2 block">
                First Name
              </label>
              <input
                name="name"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                class="bg-gray-600 font-semibold w-full text-sm text-white  px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label class="text-gray-900 font-semibold mb-2 block">
                Last Name
              </label>
              <input
                name="lname"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                class="bg-gray-600 font-semibold w-full text-sm text-white  px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter last name"
              />
            </div>
            <div>
              <label class="text-gray-900 font-semibold mb-2 block">
                Email Id
              </label>
              <input
                name="email"
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                class="bg-gray-600 font-semibold w-full text-sm text-white  px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter email"
              />
            </div>
            <div>
              <label class="text-gray-900 font-semibold mb-2 block">
                password
              </label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                class="bg-gray-600 font-semibold w-full text-sm text-white  px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter password"
              />
            </div>
            <div>
              <label class="text-gray-900 font-semibold mb-2 block">
                Mobile No.
              </label>
              <input
                name="number"
                type="number"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                class="bg-gray-600 font-semibold w-full text-sm text-white  px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter mobile number"
              />
            </div>
            <div>
              <label class="text-gray-900 font-semibold mb-2 block">
                Date of Birth
              </label>
              <input
                name="date"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                class="bg-gray-600 font-semibold w-full text-sm text-white  px-4 py-1 rounded-md outline-yellow-500 transition-all"
              />
            </div>

            <div>
              <label class="text-gray-900 font-semibold mb-1 block">
                Nic No.
              </label>
              <input
                name="number"
                type="number"
                value={nic}
                onChange={(e) => {
                  setNic(e.target.value);
                }}
                class="bg-gray-600 font-semibold w-full text-sm text-white  px-4 py-3 rounded-md outline-yellow-500 transition-all"
                placeholder="Enter 13 digit Nic "
              />
            </div>
            <div>
              <select
                value={gender}
                class="bg-gray-600 mt-6 font-semibold w-full text-sm text-white  px-4 py-3 rounded-md outline-yellow-500 transition-all"
                onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          </div>
          <div class="mt-4">
            <button
              type="submit"
              class="py-3 px-6 text-sm tracking-wider font-semibold rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none">
              Add now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewAdmin;
