import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import ClipLoader from 'react-spinners/CircleLoader'
import PacmanLoader from 'react-spinners/PacmanLoader'
import auth from '../config/firebase'
import '../css/employer.css'
import { setuser } from '../redux/feature/auth/authSlice'
import { useCloseJobMutation, useCreateJobMutation, useJobFindQuery } from '../redux/feature/employer/jobPostApi'
const Employer = () => {
    const [loading,setLoading] = useState(true)
    const {email} =useSelector((state)=>state.auth)
    const [allPosts,setAllPost]=useState([])
    const {state} = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {response} = state
    const [info, setInfo] = useState({
      companyName:'',
      position:'',
      location:'',
      responsibility:'',
      type:'',
      requirement:'',
      posts:'',
      deadline:'',
    })

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setLoading(false)
          setInfo({
            ...info,
            email:user.email
          })
          dispatch(setuser(user.email))
        }else{
          setTimeout(()=>{
            setLoading(true)
            navigate('/login')
          },1000)
          // navigate('/login')
        }
      })
    },[])

    const [jobPost,{isLoading:jobLoading,isError:jobError,isSuccess:jobSuccess}] = useCreateJobMutation()
    const [closeJob,{data:closeJobs,isLoading:closeLoading,isError:closeError}] = useCloseJobMutation()
    const {data,isLoading,isError} = useJobFindQuery(email,{refetchOnMountOrArgChange:true})
    const changeHanlder=(e)=>{
      const {name,value} = e.target
      setInfo({
        ...info,
        [name]:value
      })
    }

    const formSubmitHandler=(e)=>{
      e.preventDefault()
      jobPost(info)
    }
    
    useEffect(()=>{
      if(isLoading){
       <PacmanLoader color="#36d7b7"/>
      }
      if(!isLoading && isError){
        console.log('error......')
      }
      if(!isLoading && !isError && data?.findPosts){
        setAllPost(data?.findPosts)
      }
      

    },[isLoading,isError,data?.findPosts])


    const showPosts=(postData)=>{
            let posts =[]
                  postData.map((item,index)=>{
                        posts.push(
                          <tbody key={index}>
                              <tr >
                                <td>{item.companyName}</td>
                                <td>{item.position}</td>
                                <td>{item.location}</td>
                                <td>{item.responsibility}</td>
                                <td>{item.type}</td>
                                <td>{item.requirement}</td>
                                <td>{item.deadline}</td>
                                <td>{item?.posts}</td>
                                <td>{item?.applications}</td>
                                <td>{item?.isActive}</td>
                                <td><button onClick={()=>activeHandler(item._id,item?.isActive)} style={{borderRadius:'5px',backgroundColor:'red',padding:'5px',color:'white'}}>Close</button></td>
                              </tr>
                          </tbody>
                    )
                  })
                return postData.length > 0 ? 
                  <table id="jobTable">
                    <thead>
                      <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Location</th>
                        <th>Responsibility</th>
                        <th>Type</th>
                        <th>Requirement</th>
                        <th>Deadline</th>
                        <th>Total Posts</th>
                        <th>Applications</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    {posts}
                  </table> : 
                  <div className='loading'><PacmanLoader color="#36d7b7"/></div>
    }

    const activeHandler=(id,status)=>{
      closeJob({id,status})
    }

    useEffect(()=>{
      if(closeLoading){
        console.log('loading...')
      }
      if(!closeLoading && closeError){
        console.log('error....')
      }
      if(!closeLoading && !closeError && closeJobs?.docs){
        setAllPost(closeJobs?.docs)
      }
    },[closeLoading,closeError,closeJobs])
  return (
    <div>
      <p>{response}</p>

      <div className='jobs'>
        <label htmlFor="my-modal-6" style={{cursor:'pointer'}}>New Job Post</label>
        <div className='allJobs'>
            <p>Job Post List</p>
             {showPosts(allPosts)}
         
        </div>
      </div>


        
       

        {/* Put this part before </body> tag */}
        <input type="checkbox" id="my-modal-6" className="modal-toggle" />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
            <h3 className="font-bold text-lg">Post new job</h3>
            <form onSubmit={formSubmitHandler}>
              <div>
                <span>
                  <label>Company Name</label>
                  <input required type="text" name="companyName" onChange={changeHanlder} placeholder='enter company name' />
                </span>
                <span>
                  <label>Position</label>
                  <input required type="text" name="position" onChange={changeHanlder} placeholder='enter job post name'/>
                </span>
                <span>
                  <label>Location</label>
                  <input required type="text" name="location" onChange={changeHanlder} placeholder='enter job location'/>
                </span>
                <span>
                  <label>Resposibility</label>
                  <input required type="text" name="responsibility" onChange={changeHanlder} placeholder='enter job responsibility'/>
                </span>
                <span>
                  <label>Job type</label>
                  <select id="type" name='type' onChange={changeHanlder}>
                      <option value="0">Select car:</option>
                      <option value="full">Full Time</option>
                      <option value="temporary">Temporary</option>
                      <option value="intern">Intern</option>
                     
                    </select>
                </span>
                <span>
                  <label>Requirement</label>
                  <input required type="text" name="requirement" onChange={changeHanlder} placeholder='enter job requirement'/>
                </span>
                <span>
                  <label>Deadline</label>
                  <input required type="text" name="deadline" onChange={changeHanlder} placeholder='enter job application deadline'/>
                </span>
                <span>
                  <label>Total posts</label>
                  <input required type="number" name="posts" onChange={changeHanlder} placeholder='enter total job positions opened'/>
                </span>
              </div>
              <div className="modal-action" style={{backgroundColor:'burlywood',borderRadius:'5px',fontSize:'18px',fontWeight:'500'}}>
                <button type="submit" className='smbtn'>Submit</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default Employer
