// Inside Booimport React, { useEffect, useState } from "react";
import { useEffect, useState } from "react";
import axiosPrivate from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const Myrequests = () => {
  const [myRequests, setMyRequests] = useState([]);
  const { auth } = useAuth();
  const username = auth.username;

  useEffect(() => {
    fetchMyRequests();
  }, []);

  const fetchMyRequests = async () => {
    console.log(username);
    try {
      const response = await axiosPrivate.get("/my-requests", {
        params: { username }, // Send username as a query parameter
      });
      setMyRequests(response.data);
      console.log("My requests:", response.data);
    } catch (error) {
      console.error("Error fetching my requests:", error);
    }
  };

  return (
    <section className="mt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-2">My Requests</h3>
      <div className="grid grid-cols-1 gap-4">
        {myRequests.map((request) => (
          <div
            key={request._id}
            className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8"
          >
            <p>
              <strong>Service:</strong> {request.serviceName}
            </p>
            <p>
              <strong>Date:</strong> {request.appointmentDate}
            </p>
            <p>
              <strong>Time:</strong> {request.appointmentTime}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {request.status ? "Confirmed" : "Pending"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Myrequests;
