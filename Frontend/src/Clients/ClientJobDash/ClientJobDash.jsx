import React, { useContext } from 'react'

import { JobCard } from '../JobCard/JobCard'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
import LoadingSpinner from '../../CommonPage/FrontPageComponents/Loading/Loading'
export const ClientJobDash = () => {
const {clientJobs,setClientJobs,clientUploadedJobs,loading,setLoading}=useContext(ContextAPI)

  return (




<div className="w-[90%] max-w-5xl mx-auto p-5 min-h-[400px] text-center">
  {loading ? (
    <LoadingSpinner/>
  ) : (
<>

<h2 className="text-2xl font-semibold mb-6">Job Posted</h2>

{clientJobs && clientJobs.length>0 ? (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {clientJobs.map((item) => (
      <JobCard
        key={item._id}
        id={item._id}
        title={item.title}
        description={item.description}
        status={item.status}
        category={item.category}
        budget={item.budget}
        deadline={item.deadline}
      />
    ))}
  </div>
) : (
  <p className="text-gray-500 mt-4">You Don't Have A Job Yet</p>
)}

</>
  )}

</div>


  )
}
