import React, { useContext, useEffect, useState } from 'react'
import { 
    LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer 
  } from "recharts";
import { ContextAPI } from '../../ContextAPI/ContextAPI';
import API from '../../connectApi';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading';
export const AdminCharts = () => {
    const {adminToken}=useContext(ContextAPI)
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState("monthly");
const [completedFilter,setCompletedFilter]=useState("monthly")
const [completedData,setCompletedData]=useState([])
const [dataLoading,setDataLoading]=useState(true)
const [completedLoading,setCompletedLoading]=useState(true)
const getCommissionData=async()=>{
    try {
        setDataLoading(true)
        const response=await API.get(`/admin/getChartData?filter=${filter}`,{headers:{token:adminToken}})
    if(response.data.success){
        const formattedData = response.data.earnings.map((item) => ({
            date: new Date(item.date).toLocaleDateString(),
            commission: item.amount * 0.05
          }));
          setData(formattedData);
    }else{
        setData(null)
    }
    setDataLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
    
}

const getCompletedEarning=async()=>{
    try {
        setCompletedLoading(true)
        const response=await API.get(`/admin/getChartData?filter=${completedFilter}`,{headers:{token:adminToken}})
    if(response.data.success){
        const formattedData = response.data.earnings.map((item) => ({
            date: new Date(item.date).toLocaleDateString(),
            amount: item.amount
          }));
          setCompletedData(formattedData);
    }else{
        setCompletedData(null)
    }
    setCompletedLoading(false)
    } catch (error) {
        toast.error(error.message)
    }
}

useEffect(()=>{
    getCommissionData()
},[filter])

useEffect(()=>{
    getCompletedEarning()
},[completedFilter])
  return (
    <div className="p-4">
    {/* Responsive Layout */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* Commission Data Chart */}
      <div className="bg-white p-4 shadow-lg rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Commission Data</h3>
        <select 
          onChange={(e) => setFilter(e.target.value)} 
          className="mb-4 p-2 border rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        {dataLoading ? (
          <LoadingSpinner />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="commission" stroke="#ff7300" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Total Sales Chart */}
      <div className="bg-white p-4 shadow-lg rounded-xl">
        <h3 className="text-lg font-semibold mb-4">Freelancers Earned</h3>
        <select 
          onChange={(e) => setCompletedFilter(e.target.value)} 
          className="mb-4 p-2 border rounded-md"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>

        {completedLoading ? (
          <LoadingSpinner />
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={completedData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="amount" stroke="#007bff" />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

    </div>
  </div>
  )
}
