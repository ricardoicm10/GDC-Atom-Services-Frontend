import axios from "axios";

export function getSteppings(){
    return axios.get("http://localhost:5000/steppings")
}