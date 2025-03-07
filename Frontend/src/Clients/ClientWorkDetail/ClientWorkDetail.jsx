import React, { useContext, useEffect, useRef, useState } from 'react'

import { ContextAPI } from '../../ContextAPI/ContextAPI'
import { useParams } from 'react-router-dom'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { io } from "socket.io-client";
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
import { ClientAnswer } from '../ClientAnswer/ClientAnswer'
export const ClientWorkDetail = () => {
    const {clientToken,clientId}=useContext(ContextAPI)
    const {jobId}=useParams()
const [job,setJob]=useState(null)
const [proposal,setProposal]=useState()
const [message,setMessage]=useState("")
const [allMessages,setAllMessages]=useState([])
const [socket, setSocket] = useState(null);
 const [image, setImage] = useState(null);
 const [loadingJob, setLoadingJob] = useState(true);
  const [loadingProposal, setLoadingProposal] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(true);


const chatBoxRef = useRef(null)


useEffect(() => {
  const newSocket = io("http://localhost:5000", { reconnection: true });
  setSocket(newSocket);

  if (clientId && jobId) {
    newSocket.emit("joinRoom", { userId: clientId, jobId });
  }

  return () => {
    newSocket.disconnect();
  };
}, [clientId, jobId]);



const loadJobData=async()=>{
    try {
      setLoadingJob(true)
        const response=await API.get(`/client/getJob/${jobId}`,{headers:{token:clientToken}})
        if(response.data.success){
setJob(response.data.job)
        }else{
            // toast.error(response.data.message)
        }
        setLoadingJob(false)
    } catch (error) {
      // toast.error(error.message)  
    }
}

const loadProposalData=async()=>{
    try {
      setLoadingProposal(true)
        const response=await API.get(`/client/getProposalByClientIdAndClientId/${clientId}/${jobId}`,{headers:{token:clientToken}})
        if(response.data.success){
setProposal(response.data.proposal)
        }else{
          setProposal(null)
            // toast.error(response.data.message)
        }
        setLoadingProposal(false)
    } catch (error) {
        // toast.error(error.message)
    }
}

const sendMessage = async () => {
  if ((!message.trim() && !image) || !clientId || !socket) return;

  if (!proposal.freelancerId) {
    toast.error("Freelancer ID is missing in proposal.");
    return;
  }

  const formData = new FormData();
  formData.append("senderId", clientId);
  formData.append("senderType", "Client");
  formData.append("receiverId", proposal.freelancerId);
  formData.append("receiverType", "Freelancer");
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
    }
  } catch (error) {
    return null
  }

  setMessage("");
  setImage(null);
};



  const loadFreelancerRecievedMessage=async()=>{
    if (!jobId) return;
    try {
      setLoadingMessages(true)
      const response = await API.get(`/message/${jobId}`);
      if (response.data.success) {
        setAllMessages(response.data.messages);
      } else {
        // toast.error(response.data.message);
      }
      setLoadingMessages(false)
    } catch (error) {
      // toast.error(error.message);
    }
  }


useEffect(() => {
  if (socket && jobId) {
    loadFreelancerRecievedMessage();
  }
}, [jobId, socket]);











useEffect(()=>{
    if(clientId && clientToken){
        loadJobData()
    }
},[clientId,clientToken])

useEffect(()=>{
    if(clientToken && jobId && clientId){
      loadProposalData()
    }else{
      setProposal(false)
    }
  },[jobId,clientToken,clientId])


  useEffect(() => {
    if (chatBoxRef.current) {
      setTimeout(() => {
        chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
      }, 100); 
    }
  }, [allMessages]); 



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
  
  

     
  return (


<div className="flex flex-col mt-20 lg:grid lg:grid-rows-[auto_1fr] lg:gap-6 p-5 min-h-screen">
  

  <div className="bg-gray-100 p-5 rounded-lg shadow-md w-full">
    {loadingJob ? (
      <LoadingSpinner />
    ) : (
      <>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Title</h4>
          <p>{job ? job.title : "N/A"}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Description</h4>
          <p>{job ? job.description : "N/A"}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Category</h4>
          <p>{job ? job.catagory : "N/A"}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Skills</h4>
          <p>{job ? job.skills : "N/A"}</p>
        </div>
      </>
    )}

    {loadingProposal ? null : (
      <>
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Deadline Provided</h4>
          <p>{proposal ? `${proposal.deadline} Days` : "N/A"}</p>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-800">Amount Paid</h4>
          <p>{proposal ? `${proposal.budget} $` : "N/A"}</p>
        </div>
      </>
    )}
  </div>

  
  <div className="flex flex-col lg:flex-row gap-6 w-full mt-6">
    

    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col h-[500px] flex-1">
      
      
      <div className="flex-1 overflow-y-auto space-y-3 p-3 border-b border-gray-300 scrollbar-hidden" ref={chatBoxRef}>
        {loadingMessages ? (
          <LoadingSpinner />
        ) : (
          allMessages &&
          allMessages.map((item, i) => (
            <div key={i} className={`flex w-full ${item.senderType === "Client" ? "justify-end" : "justify-start"}`}>
              <div className={`p-3 rounded-lg max-w-[75%] break-words shadow-md ${
                item.senderType === "Freelancer" ? "bg-green-200 text-gray-800" : "bg-gray-300 text-gray-900"
              }`}>
                {item.image && (
                  <img src={item.image} alt="Uploaded" className="w-40 h-40 rounded-md mb-2 object-cover" />
                )}
                <p>{item.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

    
      <div className="flex items-center gap-3 p-3 flex-wrap">
        <label className="cursor-pointer">
          📷
          <input type="file" className="hidden" onChange={(e) => setImage(e.target.files[0])} />
        </label>
        <input
          type="text"
          placeholder="Message"
          className="flex-1 p-2 border border-gray-300 rounded-md text-gray-800 min-w-0"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => sendMessage()}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition flex-shrink-0"
        >
          <ion-icon name="send"></ion-icon>
        </button>
      </div>
    </div>

 
    <div className="bg-gray-50 p-4 sm:p-6 rounded-lg shadow-md flex-1 h-[500px] overflow-y-auto scrollbar-hidden">
      <ClientAnswer />
    </div>
    
  </div>

</div>



  )
}
