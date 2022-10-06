import axios from "axios"

export function getRequests(){
    return axios.get("http://localhost:5000/requests")
}

export function addRequest(request){
    return axios.post("http://localhost:5000/requests/add",request)
}

export function editRequest(request){
    return axios.put(`http://localhost:5000/requests/edit/${request.id}`,request)
}