import React, { useEffect, useState } from "react";
import {editRequest} from "../../api/requests"
import {FaFileExcel} from 'react-icons/fa'
import { Link,useLocation,useNavigate } from "react-router-dom";
import FormInput from "../../common/FormInput/FormInput";
import NavBar from "../../common/Navbar/Navbar";
import Swal from 'sweetalert2'
import { getPlatforms } from "../../api/platforms";
import { getSteppings } from "../../api/steppings";
import { getEngineers } from "../../api/engineers";
import Spinner from "../../common/Spinner/Spinner";
import {storage} from "../../Firebase/firebase";
import {ref,getDownloadURL,uploadBytes} from "firebase/storage"
import "./EditRequest.css"


function EditRequest(){

    const navigate = useNavigate()
    const location = useLocation()
    const [values,setValues] = useState({})
    const [excelFile,setExcelFile] = useState(null)

    const [steppings,setSteppings] = useState([])
    const [platforms,setPlatforms] = useState([])
    const [engineers,setEnginners] = useState([])
    const [loading,setLoading] = useState(false)

    useEffect(() =>{
        const setAndFormatValues = () =>{
        const request = JSON.parse(JSON.stringify(location.state))

        const newArrayEmployees = []


        request.made_by.map((employee) => (
            newArrayEmployees.push({value:employee,label:employee})
        ))
        

        request.request_date = formattedDate(request.request_date)
        request.enabled_platform_date = formattedDate(request.enabled_platform_date)
        request.request_end_date = formattedDate(request.request_end_date)
        request.made_by = newArrayEmployees

        setValues(request)
    
        }

        const getSetupValues = async() =>{
            const {data} = await getPlatforms();
            const platformsArray = data.map((platform) => platform.name)
            setPlatforms(platformsArray)
            getSteppinsFunc()
            getEngineersFunc()
            
        }
        setAndFormatValues()
        getSetupValues()
    },[location])

    const getSteppinsFunc = async() =>{
        const {data} = await getSteppings();
        const steppingsArray = data.map((stepping) => stepping.name)
        setSteppings(steppingsArray)
    }

    const getEngineersFunc = async() =>{
        const {data} = await getEngineers()
        const engineersArray = data.map((engineer) =>  {return{value:engineer.id,label:engineer.name}})
        setEnginners(engineersArray)

    }


    

    
    
    

    const formattedDate = (date) =>{
        if(date){
            var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
        
            if (month.length<2){
                month = `0${month}`
            }
            if (day.length<2){
                day = `0${day}`
            }

            return `${year}-${month}-${day}`
        }
        return ""
        
    }

    const inputs = [
        {
         id:1,
         name:"platform",
         select:true,
         label:"Platform",
         options:platforms,
         errorMessage:"Enter platform",
         required:true
        },
        {
         id:2,
         name:"made_by",
         select:true,
         label:"Made by",
         options:engineers,
         errorMessage:"Enter employee",
         isMulti:true,
         isValid:true
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
         id:3,
         name:"request",
         textArea:true,
         placeholder:"Request",
         label:"Request",
         errorMessage:"Enter request",
         required:true,
         rows:3
        },
        {
         id:4,
         name:"description",
         textArea:true,
         placeholder:"Description",
         label:"Description",
         errorMessage:"Enter description",
         required:true,
         rows:3
        },
        {
            id:8,
            name:"request_date",
            type:"date",
            label:"Request date",
            errorMessage:"Enter date",
            required:true
           },
        
        
        {
         id:7,
         name:"enabled_platform_date",
         type:"date",
         label:"Enabled platform date",
         selected:new Date(),
         errorMessage:"Enter date",

        },
        {
            id:5,
            name:"specs",
            textArea:true,
            placeholder:"Specs",
            label:"Specs",
            errorMessage:"Enter specs",
            rows:3
           },
        {
         id:9,
         name:"learnings",
         textArea:true,
         placeholder:"Learnings",
         label:"Learnings",
         errorMessage:"Enter learnings",
         rows:3

        },
        {
         id:10,
         name:"request_end_date",
         type:"date",
         label:"Request end date",
         selected:new Date(),
         errorMessage:"Enter date",

        },
        {
            id:11,
            name:"excel_name",
            type:"file",
            label:"Excel file"
        }   
     ]

    const onChange = (e) => {
        if (e.target.name === "excel_name"){
            setExcelFile(e.target.files[0])
        }else{
            setValues({...values,[e.target.name]:e.target.value})
        }
        
    }  

    const onChangeMultiple = (e,props) =>{
        setValues({...values,[props.name]:e})
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (values.made_by.length<1){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You forgot select the employees',
            })
        }else{
            editRequestFunc()
        }
    }

    const uploadFile = async() => {
        if(excelFile == null)  return;
        const imageRef = ref(storage,`excel-files/${values.platform}/${values.stepping}/${values.id}/${excelFile.name}`)
        await uploadBytes(imageRef,excelFile)
        const url = await getDownloadURL(imageRef)
        return url;
        // console.log("result",result)
        // const url = await getDownloadURL(imageRef)
        // console.log("url",url)
        // return url
    }

    

    const editRequestFunc = async() =>{
        setLoading(true)
        try{
            const url = await uploadFile()
            values.excel_url = url;
            const {data} = await editRequest(values);
            setLoading(false)
            Swal.fire({
                icon: 'success',
                title: data,
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

    return(
        <div className="EditRequest">
            <NavBar/>
            <Spinner loading={loading} background={true}/>
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <h1>Edit request</h1>
                    {inputs.map((input) =>(
                        <FormInput   key={input.id} {...input} value={values[input.name]}   onChange={onChange} onChangeMultiple={onChangeMultiple}/>
                    ))}
                    <div className="btn-section">
                        <button className="btn-submit">Save</button>
                        <Link to="/requests" className="btn-cancel">
                            Cancel
                        </Link>
                        {values.excel_url && 
                        <a href={values.excel_url}  className="btn-excel"><FaFileExcel/></a>}
                    </div>
                    
                </form>
            </div>

        </div>
    )
}
export default EditRequest