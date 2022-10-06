import Button from 'react-bootstrap/Button';
import {COLUMNS} from "./RequestsColumns"
import { Link ,useNavigate} from 'react-router-dom';
import {getRequests} from '../../api/requests'
import NavBar from "../../common/Navbar/Navbar";
import React,{useState,useEffect} from "react";
import Swal from 'sweetalert2'
import Table from '../Table/Table';
import "../../App.css"
import "./Requests.css"
import Spinner from "../../common/Spinner/Spinner"

function Requests(){

    const navigate = useNavigate()
    const [requests,setRequests] = useState([])
    const [loading,setLoading] = useState(true)


    useEffect(() =>{
        getAllRequests()
    },[])



    async function getAllRequests(){
        try{
            const {data} = await getRequests();
            setRequests(data)
            setLoading(false)
    
        }catch(err){
            setLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `${err}`,
            })
        }
    }

    const handleEditButton = (e,request) =>{
        navigate(`/requests/edit/${request.id}`,{state:request})
    }
   

    return(
        <div className="Requests">
            <NavBar/>
            <Spinner loading={loading}/>
            <div className="btn-section">
                <Link to='/requests/add'>
                    <Button style={{width:"200px"}} variant='primary' >Add request</Button>
                </Link>
            </div>
            <div className="table-section">
                <Table columns={COLUMNS} data={requests} addColumnButton={true} handleEdit={handleEditButton}/>
            </div>
        </div>
    )

}
export default Requests