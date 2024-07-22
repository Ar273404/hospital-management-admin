import React, { useContext, useEffect, useState } from "react";
import { Context } from "../index.js";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { url } from "../API.jsx";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const { isAuthenticated, admin } = useContext(Context);
  const [doctor, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          `${url}/appointment/getall`,
          { withCredentials: true }
        );
        setAppointments(data.appointment);
        console.log(data);
      } catch (error) {
        setAppointments([]);
        console.error("Error fetching appointments:", error);
        toast.error("Error fetching appointments:", error.message);
      }
    };
    
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(`${url}/user/doctors`, {
          withCredentials: true,
        });
        console.log(data);
        setDoctors(data.doctors); 
      } catch (error) {
        setDoctors([]);
        console.error("Error fetching doctors:", error);
        toast.error("Error fetching doctors:", error.message);
      }
    };

    fetchAppointments();
    fetchDoctors();
  }, []); 

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        `${url}/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.error("Error updating appointment status:", error);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className="dashboard page">
        <div className="banner grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="firstBox bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy7nFdX1g_CVR4WyP5LgKOGytP0J8PE53_RQ&s"
              alt="docImg"
              className="w-20 h-20 rounded-full object-cover"
            />
            <div className="content ">
              <p className="text-gray-600 font-semibold text-lg">
                👋👋{" "}
                <span className="text-xl font-bold text-red-600">
                  {admin && `${admin.firstName} ${admin.lastName}`}{" "}
                </span>
                Welcome to the admin dashboard. Here you can manage
                appointments, view detailed statistics, and keep track of
                important healthcare operations. Stay informed about patient
                visits, doctor availability, and department activities.
              </p>
            </div>
          </div>
          <div className="secondBox bg-white p-4 rounded-lg shadow-md">
            <p className="text-white font-bold">Total Appointments</p>
            <h3 className="text-3xl text-white font-bold">
              {appointments.length}
            </h3>
          </div>
          <div className="thirdBox bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600">Registered Doctors</p>
            <h3 className="text-3xl font-bold text-gray-800">
              {doctor.length}
            </h3>
          </div>
        </div>
        <div className="banner overflow-x-auto mt-4">
          <h5 className="text-lg font-semibold">Appointments</h5>
          <table className="min-w-full bg-white border-gray-200 shadow-md rounded-md">
            <tbody>
              <div className="font-sans overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100 whitespace-nowrap">
                    <tr>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        Visited
                      </th>
                    </tr>
                  </thead>
                  {appointments.length > 0 ? (
                    appointments.map((item, index) => {
                      return (
                        <tbody
                          key={index}
                          className="bg-white divide-y divide-gray-200 whitespace-nowrap">
                          <tr>
                            <td className="px-4 py-4 text-sm text-gray-800">
                              {`${item.firstName} ${item.lastName}`}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-800">
                              {item.appointment_date.substring(0, 16)}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-800">
                              {`${item.doctor.firstName} ${item.doctor.lastName}`}
                            </td>
                            <td className="px-4 py-4 text-sm text-gray-800">
                              {item.department}
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              <select
                                className={
                                  item.status === "Pending"
                                    ? "text-yellow-700 bg-yellow-200"
                                    : item.status === "Accepted"
                                    ? "text-green-700 bg-green-200"
                                    : "text-red-700 bg-red-200"
                                }
                                value={item.status}
                                onChange={(e) =>
                                  handleUpdateStatus(item._id, e.target.value)
                                }>
                                <option value="Pending">Pending</option>
                                <option value="Accepted">Accepted</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td className="px-4 py-2 whitespace-nowrap">
                              {item.hasVisited ? (
                                <GoCheckCircleFill className="text-green-500" />
                              ) : (
                                <AiFillCloseCircle className="text-red-500" />
                              )}
                            </td>
                          </tr>
                        </tbody>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-4 py-2 text-center text-gray-500">
                        No Appointments Found!
                      </td>
                    </tr>
                  )}
                </table>
              </div>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default Dashboard;
