import axios from "axios"

export function getEngineers(){
    return axios.get("http://localhost:5000/engineers");
}