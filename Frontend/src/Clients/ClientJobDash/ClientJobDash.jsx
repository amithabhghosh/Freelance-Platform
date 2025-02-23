import React, { useContext } from 'react'
import './ClientJobDash.css'
import { JobCard } from '../JobCard/JobCard'
import { ContextAPI } from '../../ContextAPI/ContextAPI'
export const ClientJobDash = () => {
const {clientJobs,setClientJobs,clientUploadedJobs}=useContext(ContextAPI)

  return (
    <div className='clientJobDash'>
<h2>Job Posted</h2>
{
    clientJobs?
    <div className="jobLists">
        {clientJobs.map((item,i)=>(
 <JobCard id={item._id} title={item.title} description={item.description} status={item.status} catagory={item.catagory} budget={item.budget} deadline={item.deadline}/>
        ))}
   
</div>: <p>You Don't A Job Yet</p>
}

    </div>
  )
}
