import React, { useContext, useEffect, useState } from 'react'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import API from '../../connectApi'
import { toast } from 'react-toastify'
import { AdminCharts } from '../AdminCharts/AdminCharts'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'

export const AdminEarnings = () => {
    const {adminToken}=useContext(ContextAPI)
const [commisionGained,setCommisionGained]=useState(0)
const [completedWork,setCompletdWork]=useState(0)
const [allPayments,setAllpayments]=useState([])
const [loading,setLoading]=useState(true)
    const loadTotalCommissionGained=async()=>{
        try {
            const response=await API.get("/admin/getTotalAmountGained",{headers:{token:adminToken}})
            if(response.data.success){
setCommisionGained(response.data.fivePercent)
setCompletdWork(response.data.completedWorks)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

const loadAllPayments=async()=>{
    try {
      setLoading(true)
        const response=await API.get("/admin/getAllpayments",{headers:{token:adminToken}})
        if(response.data.success){
setAllpayments(response.data.payments)
        }else{
            setAllpayments(null)
        }
        setLoading(false)
    } catch (error) {
        toast.error(ErrorEvent.message)
    }
}

useEffect(()=>{
    if(adminToken){
        loadAllPayments()
    }else{
        setAllpayments(null)
    }
},[adminToken])

    useEffect(()=>{
        if(adminToken){
            loadTotalCommissionGained()
        }else{
            setCommisionGained(0)
        }
    },[adminToken])
  return (
    <div className="p-6 space-y-6 mt-26 min-h-screen">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-2xl shadow-md text-center">
        <h4 className="text-lg font-semibold">Total Commission Gained</h4>
        <p className="text-xl font-bold">{commisionGained} $</p>
      </div>
      <div className="bg-white p-4 rounded-2xl shadow-md text-center">
        <h4 className="text-lg font-semibold">Total Work Completed</h4>
        <p className="text-xl font-bold">{completedWork}</p>
      </div>
    </div>
    

<AdminCharts/>

    {/* Payment Table */}
    <div className="bg-white p-4 rounded-2xl shadow-md overflow-hidden">
      <h4 className="text-lg font-semibold mb-4">Payment Details</h4>
      <div className="overflow-y-auto max-h-80">
{loading ? (
  <LoadingSpinner/>
) : (
  <table className="w-full border-collapse">
  <thead>
    <tr className="bg-gray-200 text-left text-sm uppercase">
      <th className="p-3">Job ID</th>
      <th className="p-3">Session URL</th>
      <th className="p-3">Amount</th>
      <th className="p-3">Status</th>
    </tr>
  </thead>
 
    <tbody>

    {allPayments.map((item, i) => (
      <tr key={i} className="border-t hover:bg-gray-100 text-sm">
        <td className="p-3">{item.jobId}</td>
        <td className="p-3 truncate max-w-[150px]">{item.stripeSessionId}</td>
        <td className="p-3">{item.amount} $</td>
        <td className="p-3 font-semibold text-{item.status === 'completed' ? 'green-600' : 'red-600'}">
          {item.status}
        </td>
      </tr>
    ))}
  </tbody>
</table>
)}

       



      </div>
    </div>
  </div>
  )
}
