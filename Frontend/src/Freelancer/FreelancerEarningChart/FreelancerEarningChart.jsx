import React, { useContext, useEffect, useState } from 'react'
import API from '../../connectApi'
import { ContextAPI } from '../../ContextAPI/ContextAPI';
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading';
import { 
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
  } from "recharts";
export const FreelancerEarningChart = () => {
    const {freelancerToken}=useContext(ContextAPI)
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("monthly");
const [loading,setLoading]=useState(true)


    const getCompletedEarning=async()=>{
        try {
            setLoading(true)
            const response=await API.get(`/freelancer/getChartData?filter=${filter}`,{headers:{token:freelancerToken}})
        if(response.data.success){
            const formattedData = response.data.earnings.map((item) => ({
                date: new Date(item.date).toLocaleDateString(),
                amount: item.amount
              }));
              setData(formattedData);
        }else{
            setData(null)
        }
        setLoading(false)
        } catch (error) {
            toast.error(error.message)
        }
    }
   
   useEffect(()=>{
       getCompletedEarning()
   },[filter]) 

  return (
<div className="w-full px-4 sm:px-6 lg:px-8">
  <div className="grid grid-cols-1 gap-6">
    
    
    <div className="bg-white p-4 shadow-lg rounded-xl w-full">
      <h3 className="text-lg font-semibold mb-4">Earnings Data</h3>
      <select 
        onChange={(e) => setFilter(e.target.value)} 
        className="mb-4 p-2 border rounded-md"
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>

      {loading ? (
        <LoadingSpinner/>
      ) : (
        <div className="w-full h-[250px] md:h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="amount" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>

  </div>
</div>

  )
}
