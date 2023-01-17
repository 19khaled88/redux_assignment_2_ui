import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import auth from '../config/firebase'
import { setuser } from '../redux/feature/auth/authSlice'
import { useResumeFindQuery, useResumeMutation } from '../redux/feature/auth/candidateApi'
import './../css/candidateResume.css'
const Employee = () => {
    // const [infoState,setInfoState]= useState({
    //   skills:{
    //     languages:[],
    //     volunteer:'',
    //     frontend:'',
    //     backend:'',
    //   },
    //   // languages:[],
    //   summary:'',
    // })


    // const handleChange=(e)=>{
    //   const {value, checked,name} = e.target
    //   const {skills:{languages}}= infoState
    //   if(checked){
    //     setInfoState({
    //       skills:{
    //         languages:[...languages,value]
    //       }
    //     })
    //   }else{
    //     setInfoState({
    //       skills:{
    //         languages:languages.filter((e)=>e !== value)
    //       }
    //     })
    //   }

     

    //   // if(checked){
    //   //   setInfoState({
    //   //     languages:[...languages, value]
    //   //   })
    //   // }else{
    //   //   setInfoState({languages:languages.filter((e)=>e !== value)})
    //   // }
      
    // }
    const [load, setLoad] = useState(true)
    const [loggedInUser, setLoggedInUser] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    let content = null

    useEffect(()=>{
      onAuthStateChanged(auth,(user)=>{
        if(user){
          setLoad(false)
          // dispatch(setuser(user.email))
          setLoggedInUser(user.email)
        }else{
          setTimeout(()=>{
            setLoad(false)
            navigate('/login')
          },1000)
          
        }
      })
  
    },[navigate])



   const [addResume, {isLoading:addLoading,isError:addError,isSuccess:addSuccess}] = useResumeMutation()
   const{data:findResume,isLoading,isError,isSuccess} = useResumeFindQuery(loggedInUser,{refetchOnMountOrArgChange:true})
   
    
    const {state} = useLocation()
    const {response,email} = state
    

    // summary state
    const[summary,setSummary] = useState({
      summary:''
    })
    const handleSummaryChange=(e)=>{
       setSummary({
        ...summary,
        [e.target.name]:e.target.value
       })
    }
    const handleChange=()=>{}
    // skills states
    const [skills,setSkills] = useState({ volunteer:'',frontend:'', backend:''})
    const handleSkillChange=(e)=>{
        setSkills({
          ...skills,
          [e.target.name]:e.target.value
        })
    }

    // checkbox states
    const [checkBoxState,setCheckBox]=useState({
        language:[]
    })

    const handleCheckboxChange=(e)=>{
      const {value, checked} = e.target
      const {language} = checkBoxState
      if(checked){
         setCheckBox({
          language:[...language, value]
         })
       }else{
        setCheckBox({language:language.filter((e)=>e !== value)})
       }
    }

    // experience state
    const [experience, setExperience]=useState({designation:'',period:'',responsibility:'',achivement:'' })
    const handleExperienceChange=(e)=>{
        setExperience({
          ...experience,
          [e.target.name]:e.target.value
        })
    }

    // education state
    const [education,setEducatoin]=useState({heigherEducation:'', certificate:'', result:''})
    const handleEduChange=(e)=>{
      setEducatoin({
        ...education,
        [e.target.name]:e.target.value
      })
    }

    // portfolio state
    const [portfolio, setPortfolio] = useState({portfolio:''})
    const handlePortfolioChange=(e)=>{
      setPortfolio({
        ...portfolio,
        [e.target.name]:e.target.value
      })
    }

    const[github, setGithub]=useState({github:''})
    const handleGithubChange=(e)=>{
        setGithub({
          ...github,
          [e.target.name]:e.target.value
        })
    }

    const resetForm=()=>{
      setSummary("");
      setSkills("");
      setExperience("");
      setEducatoin("");
      setPortfolio("");
      setGithub("");
      
    }
    const handleFormSubmit=(e)=>{
      e.preventDefault()
      const{language} =checkBoxState
      const{volunteer,backend,frontend} = skills
      
        const body={
            summary:summary.summary,
            skills:{language,volunteer,frontend,backend},
            experience:experience,
            education:education,
            portfolio:portfolio.portfolio,
            github:github.github,
            userEmail:loggedInUser
        }
        addResume(body)
    }

    useEffect(()=>{
      if(isLoading){
        console.log('loading.......')
      }
  
      if(!isLoading && isError){
        console.log('error.....')
      }
  
      if(!isLoading && !isError && findResume.isResumeExist === null){
          console.log('loading.......')
      }
      if(!isLoading && !isError && findResume.isResumeExist !== null){
        console.log(findResume.isResumeExist.userEmail)
        navigate('/empDetails',{state:{details:findResume.isResumeExist}})
      }
    },[isLoading,isError])

  return (
    <div className='employeeContainer'>
      <p>{response}</p>

      <h2>Create Resume</h2>
      <div className=''>
        <form onSubmit={handleFormSubmit} className='resume'>
          <div className='summary'>
            <p>Profession Summary</p>
            <div>
              <textarea required onChange={handleSummaryChange} name="summary"   placeholder='write your professional summary' />
            </div>
          </div>
          <div className='skill'>
            <p>Skills</p>
            <div>
              <div>
                <span className='language'>
                  <label>Language/Languages</label>
                  <div>
                    <span>
                        <input onChange={handleCheckboxChange} className="myinput" type="checkbox" name="languages" value="english" />
                        <div className="mylabel">English</div>
                    </span>
                      <span>
                        <input onChange={handleCheckboxChange} className="myinput" type="checkbox" name="languages" value="bengali" />
                        <div className="mylabel">Bengali</div>
                      </span>
                      <span>
                        <input onChange={handleCheckboxChange} className="myinput" type="checkbox" name="languages" value="arabic" />
                        <div className="mylabel">Arabic</div>
                      </span>
                  </div>
                  
                </span>
                <span className='volunteer'>
                  <label>Volunteer works</label> 
                  <textarea onChange={handleSkillChange} name='volunteer'  placeholder='write down volunteering work that accomplished'/>
                </span>
              </div>
              <div className='programmingLanguage'>
                <span>
                  <label>Front end language</label>
                  <textarea required onChange={handleSkillChange} name='frontend'  placeholder='write front end language that you good at. Like CSS, HTML, Javascript' />
                </span>
                <span>
                  <label>Back end language</label>
                  <textarea required onChange={handleSkillChange} name='backend'  placeholder='write back end language that you good at. Like Node js, Python, PHP, C#' />
                </span>
              </div>
            </div>
          </div>
          <div className='experience'>
            <p>Experience</p>
            <div>
              <span>
                <label>Designation</label>
                <input required onChange={handleExperienceChange} name="designation" value={experience?.designation} type='text' placeholder='enter your previous designation'/>
              </span>
              <span>
                <label>Period</label>
                <input required onChange={handleExperienceChange} name="period" value={experience?.period} type='text' placeholder='work starting and ending time'/>
              </span>
              <span>
                <label>Responsibilty</label>
                <textarea required onChange={handleExperienceChange} name="responsibility" value={experience?.responsibility} placeholder='Your previous responsibility' />
              </span>
              <span>
                <label>Achivement</label>
                <textarea required onChange={handleExperienceChange} name="achivement" value={experience?.achivement} placeholder='your previous achivement '/>
              </span>
            </div>
          </div>
          <div className="qualification">
            <p>Education</p>
            <div>
              <div className='education'>
                <span>
                  <label>Heighest education</label>
                  <input required onChange={handleEduChange} type="text" name="heigherEducation" value={education?.heigherEducation} placeholder="Like Master's, Bachelor etc."/>
                </span>
                <span>
                  <label>Certification Year</label>
                  <input required onChange={handleEduChange} type="number" name="certificate" value={education?.certificate} placeholder="Only number is allowed, like 2022"/>
                </span>
                <span>
                  <label>Result</label>
                  <input required onChange={handleEduChange} type="text" name="result" value={education?.result} placeholder="Like fist class, second class, GPA 4.00 etc." />
                </span>
              </div>
              
            </div>
          </div>
          <div className="portfolio">
            <p>Portfolio</p>
            <div>
              <label>Portfolio Link</label>
              <input onChange={handlePortfolioChange} name='portfolio' value={portfolio?.portfolio} type="text" placeholder="Please place your portfolio link"/>
            </div>
          </div>
          <div className="github">
            <p>Github</p>
            <div>
              <label>Github Link</label>
              <input onChange={handleGithubChange} name='github' value={github?.github} type="text" placeholder="Please place your github link"/>
            </div>
          </div>
          <div className='btn'>
            <button>Submit Resume</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Employee
