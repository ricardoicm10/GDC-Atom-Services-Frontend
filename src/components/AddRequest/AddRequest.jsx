import React,{ useState,useRef }  from "react";
import {addRequest} from "../../api/requests"
import { Link,useNavigate } from "react-router-dom";
import FormInput from "../../common/FormInput/FormInput";
import NavBar from "../../common/Navbar/Navbar";
import Swal from 'sweetalert2'
import "./AddRequest.css"
import { getPlatforms } from "../../api/platforms";
import { getSteppings } from "../../api/steppings";
import { useEffect } from "react";
import { getEngineers } from "../../api/engineers";
import Spinner from "../../common/Spinner/Spinner";


function AddRequest(){

    const navigate = useNavigate()
    const form = useRef();
    const made_by = useRef()

    const [values,setValues] = useState({
        platform:"",
        made_by:"",
        request:"",
        description:"",
        specs:"",
        stepping:"",
        request_date:"",
    })

    const [steppings,setSteppings] = useState([])
    const [platforms,setPlatforms] = useState([])
    const [engineers,setEnginners] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        const getSetupValues = async() =>{
            const {data} = await getPlatforms();
            const platformsArray = data.map((platform) => platform.name)
            setPlatforms(platformsArray)
            getSteppinsFunc()
            getEngineersFunc()
            
        }
        getSetupValues()
    },[])

    const inputs = [
       {
        id:1,
        name:"platform",
        select:true,
        label:"Platform",
        options:platforms,
        errorMessage:"Enter platform",
        required:true,
       },
       {
        id:2,
        name:"made_by",
        select:true,
        label:"Made by",
        options:engineers,
        errorMessage:"Enter employee",
        isMulti:true,
        isValid:true,
        ref:made_by
       },
       {
        id:3,
        name:"request",
        textArea:true,
        placeholder:"Request",
        label:"Request",
        errorMessage:"Enter request",
        required:true,
        rows:4
       },
       {
        id:4,
        name:"description",
        textArea:true,
        placeholder:"Description",
        label:"Description",
        errorMessage:"Enter description",
        required:true,
        rows:4
       },
       {
        id:5,
        name:"specs",
        textArea:true,
        placeholder:"Specs",
        label:"Specs",
        errorMessage:"Enter specs",
        required:true,
        rows:4
       },
       {
        id:6,
        name:"stepping",
        select:true,
        label:"Stepping",
        options:steppings,
        errorMessage:"Enter stepping",
        required:true
       },
    
       {
        id:8,
        name:"request_date",
        type:"date",
        label:"Request date",
        errorMessage:"Enter date",
        required:true
       },
    ]

    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.made_by.length<1){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You forgot select the employees',
            })
        }else{
            addRequestFunc()
        }
    }

    const onChange = (e) => {
        setValues({...values,[e.target.name]:e.target.value})
    }  

    const onChangeMultiple = (e,props) =>{
        setValues({...values,[props.name]:e})
    }

    const  addRequestFunc = async() =>{
        setLoading(true)
        try{
            const {data} = await addRequest(values);
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title:data,
                showConfirmButton: false,
                timer: 1500
              }).then(()=>{
                navigate("/requests")
              })

        }catch(err){
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err}`,
            })
            
        }
    }

   
    
    const getSteppinsFunc = async() =>{
        const {data} = await getSteppings();
        const steppingsArray = data.map((stepping) => stepping.name)
        setSteppings(steppingsArray)
    }

    const getEngineersFunc = async() =>{
        const {data} = await getEngineers()
        const engineersArray = data.map((engineer) =>  {return{value:engineer.id,label:engineer.name,email:engineer.email}})
        setEnginners(engineersArray)

    }
    



    return(
        <div className="AddRequest">
            <NavBar/>
            <Spinner loading={loading} background={true}/>
            <div className="content">
                <form  onSubmit={handleSubmit} ref={form}>
                    <div className="title"><h1>Add request</h1></div>
                    {inputs.map((input) =>(
                        <FormInput   key={input.id} {...input} value={values[input.name]}   onChange={onChange} onChangeMultiple={onChangeMultiple}/>
                    ))}
                    <div>
                    <button className="btn-submit">Submit</button>
                    <Link to="/requests">
                        <button className="btn-cancel">Cancel</button>
                    </Link>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}

export default AddRequest