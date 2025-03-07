import React, { useContext, useEffect, useState } from "react";
import { ContextAPI } from "../../ContextAPI/ContextAPI";
import API from "../../connectApi";
import { toast } from "react-toastify";
import LoadingSpinner from "../../CommonPage/FrontPageComponents/Loading/Loading";

export const ClientJob = () => {
  const { clientId, clientToken } = useContext(ContextAPI);
  const [jobPostedCount, setJobPostedCount] = useState(0);
  const [pendingJobsLength, setPendingJobsLength] = useState(0);
  const [assignedJobsLength, setAssignedJobsLength] = useState(0);
  const [completedJobsLength, setCompletedJobsLength] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [payments, setPayments] = useState([]);
const [loading,setLoading]=useState(true)
  const getJobPosted = async () => {
    try {
      const response = await API.get(`/client/getPostedJobs/${clientId}`, {
        headers: { token: clientToken },
      });
      if (response.data.success) {
        setJobPostedCount(response.data.jobsPosted);
        setPendingJobsLength(response.data.pendingJobsLength);
        setAssignedJobsLength(response.data.assignedJobslength);
        setCompletedJobsLength(response.data.completedJobsLength);
      } else {
        setJobPostedCount(0);
        setAssignedJobsLength(0);
        setPendingJobsLength(0);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const loadPaymentData = async () => {
    try {
      setLoading(true)
      const response = await API.get(`/client/getPaymentByClient/${clientId}`, {
        headers: { token: clientToken },
      });
      if (response.data.success) {
        setTotalPayment(response.data.totalAmount);
        setPayments(response.data.payments);
      } else {
        setTotalPayment(0);
        setPayments([]);
      }
      setLoading(false)
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (clientId && clientToken) {
      getJobPosted();
      loadPaymentData();
    }
  }, [clientId, clientToken]);

  return (
    <div className="max-w-4xl mt-28 mx-auto min-h-screen my-10 p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center border-b pb-2">
        Client Job Overview
      </h2>

      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Job Posted" value={jobPostedCount} />
        <StatCard title="Completed Jobs" value={completedJobsLength} />
        <StatCard title="Pending Jobs" value={pendingJobsLength} />
        <StatCard title="Assigned Jobs" value={assignedJobsLength} />
        <StatCard title="Total Amount Paid" value={`$${totalPayment}`} fullWidth />
      </div>

    
      <div className="overflow-x-auto">

{loading ? (
  <LoadingSpinner/>
) : (
<table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left border">Title</th>
              <th className="p-3 text-left border">Session URL</th>
              <th className="p-3 text-left border">Status</th>
              <th className="p-3 text-left border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="p-3">
                    <Title jobId={item.jobId} clientToken={clientToken} />
                  </td>
                  <td className="p-3 truncate max-w-[150px]">
                    {item.stripeSessionId}
                  </td>
                  <td className="p-3">{item.status}</td>
                  <td className="p-3 font-semibold">${item.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No Payments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
)}
        



      </div>
    </div>
  );
};


const StatCard = ({ title, value, fullWidth }) => (
  <div className={`p-4 bg-gray-100 rounded-md shadow ${fullWidth ? "col-span-2" : ""}`}>
    <h4 className="text-gray-700 font-medium">{title}</h4>
    <p className="text-lg font-semibold">{value}</p>
  </div>
);


const Title = ({ jobId, clientToken }) => {
  const [job, setJob] = useState(null);

  useEffect(() => {
    const loadJob = async () => {
      try {
        const response = await API.get(`/client/getJob/${jobId}`, {
          headers: { token: clientToken },
        });
        if (response.data.success) {
          setJob(response.data.job);
        }
      } catch (error) {
      setJob(null)
      }
    };

    if (jobId && clientToken) {
      loadJob();
    }
  }, [jobId, clientToken]);

  return <p className="truncate max-w-[150px]">{job?.title || "Loading..."}</p>;
};
