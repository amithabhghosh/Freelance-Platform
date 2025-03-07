import React, { useContext, useEffect, useRef, useState } from 'react'

import { useParams } from 'react-router-dom'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { io } from "socket.io-client";
import { ClientCoundownTimer } from '../../Clients/ClientCoundownTimer/ClientCoundownTimer'
import { FreelancerAnswerSubmission } from '../FreelancerAnswerSubmission/FreelancerAnswerSubmission'
export const FreelancerWorkDetails = () => {
  const { freelancerId, freelancerToken } = useContext(ContextAPI);
  const { jobId } = useParams();
  const [image, setImage] = useState(null);
  const [job, setJob] = useState(null);
  const [proposal, setProposal] = useState(null);
  const [message, setMessage] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const chatBoxRef = useRef(null);




useEffect(() => {
  const newSocket = io("https://freelancebackend-gamma.vercel.app", { reconnection: true });
  setSocket(newSocket);

  if (freelancerId && jobId) {
    newSocket.emit("joinRoom", { userId: freelancerId, jobId });
  }

  return () => {
    newSocket.disconnect();
  };
}, [freelancerId, jobId]);

const loadJobData = async () => {
  try {
    const response = await API.get(`/freelancer/job/${jobId}`, {
      headers: { token: freelancerToken },
    });
    if (response.data.success) {
      setJob(response.data.job);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

const proposalData = async () => {
  try {
    const response = await API.get(
      `/freelancer/getProposalDataByJobIdAndFreelancerId/${freelancerId}/${jobId}`,
      { headers: { token: freelancerToken } }
    );
    if (response.data.success) {
      setProposal(response.data.proposal);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(() => {
  if (freelancerToken) {
    loadJobData();
  }
}, [jobId, freelancerToken]);

useEffect(() => {
  if (freelancerToken && jobId && freelancerId) {
    proposalData();
  }
}, [jobId, freelancerToken, freelancerId]);

const loadFreelancerRecievedMessage = async () => {
  if (!jobId) return;
  try {
    const response = await API.get(`/message/${jobId}`);
    if (response.data.success) {
      setAllMessages(response.data.messages);
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};

useEffect(() => {
  if (socket && jobId) {
    loadFreelancerRecievedMessage();
  }
}, [socket, jobId]);

const sendMessage = async () => {
  if ((!message.trim() && !image) || !freelancerId || !socket) return;

  const formData = new FormData();
  formData.append("senderId", freelancerId);
  formData.append("senderType", "Freelancer");
  formData.append("receiverId", job.ClientId);
  formData.append("receiverType", "Client");
  formData.append("jobId", jobId);
  if (message) formData.append("message", message);
  if (image) formData.append("image", image);

  try {
    const response = await API.post("/message/sent", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.data.success) {
      const newMsg = response.data.data;

      socket.emit("sendMessage", newMsg);

      loadFreelancerRecievedMessage();
      // setAllMessages((prev) => [...prev, newMsg]);// Add message instantly
    }
  } catch (error) {
   return toast.error(error.message)
  }

  setMessage("");
  setImage(null);
};


useEffect(() => {
  if (!socket) return;

  const handleMessage = (data) => {
    if (data.jobId === jobId) {
      loadFreelancerRecievedMessage(); // Fetch latest messages
    }
  };

  socket.on("receiveMessage", handleMessage);

  return () => {
    socket.off("receiveMessage", handleMessage);
  };
}, [socket, jobId]);




useEffect(() => {
  if (chatBoxRef.current) {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }
}, [allMessages]);





  return (


<div className="p-5 mt-24 space-y-6">


<div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-700">Title</h4>
    <p className="text-gray-600">{job ? job.title : "Loading..."}</p>
  </div>
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-700">Description</h4>
    <p className="text-gray-600">{job ? job.description : "Loading..."}</p>
  </div>
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-700">Category</h4>
    <p className="text-gray-600">{job ? job.catagory : "Loading..."}</p>
  </div>
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-700">Skills</h4>
    <p className="text-gray-600">{job ? job.skills : "Loading..."}</p>
  </div>
  <div className="mb-4">
    <h4 className="text-lg font-semibold text-gray-700">Deadline Provided</h4>
    <p className="text-gray-600">{proposal ? `${proposal.deadline} Days` : "Loading..."}</p>
  </div>
  <div>
    <h4 className="text-lg font-semibold text-gray-700">Amount Paid</h4>
    <p className="text-gray-600">{proposal ? `${proposal.budget} $` : "Loading..."}</p>
  </div>

  <div className="mt-6 p-4 bg-blue-100 text-blue-700 rounded-lg shadow-md text-center">
    <h4 className="text-lg font-semibold">Time Left</h4>
    <div className="text-2xl font-bold tracking-wide mt-2">
      <ClientCoundownTimer 
        deadline={proposal ? proposal.deadline : null} 
        jobStatus={job ? job.status : null} 
        startTime={proposal ? proposal.startTime : null} 
      />
    </div>
  </div>
</div>


<div className="flex flex-col md:flex-row gap-6">

  <div className="bg-white rounded-lg shadow-md flex flex-col h-[520px] w-full md:w-1/2 overflow-hidden">
    

    <div className="flex-1 overflow-y-auto space-y-3 p-3 border-b border-gray-300 custom-scrollbar" ref={chatBoxRef}>
      {allMessages &&
        allMessages.map((item, i) => (
          <div
            key={i}
            className={`flex w-full ${item.senderType === "Freelancer" ? "justify-end" : "justify-start"}`}
          >
            <div className={`p-3 rounded-lg max-w-[75%] break-words shadow-md ${
                item.senderType === "Freelancer" ? "bg-green-200 text-gray-800" : "bg-gray-300 text-gray-900"
              }`}
            >
              {item.image && (
                <img src={item.image} alt="Uploaded" className="w-40 h-40 rounded-md mb-2 object-cover" />
              )}
              <p>{item.message}</p>
            </div>
          </div>
        ))}
    </div>

  
    <div className="flex items-center gap-3 p-3 bg-gray-100 flex-none w-full rounded-b-lg min-h-[50px]">
      <label className="cursor-pointer">
        📷
        <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
      </label>
      <input
        type="text"
        placeholder="Message"
        className="flex-1 p-2 border border-gray-300 rounded-md text-gray-800 w-full"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex items-center justify-center w-12"
      >
        <ion-icon name="send"></ion-icon>
      </button>
    </div>
  </div>

  <div className="w-full md:w-1/2 h-[520px] overflow-y-auto custom-scrollbar bg-white p-6 rounded-lg shadow-md">
    <FreelancerAnswerSubmission />
  </div>

</div>
</div>

   
  )
}
