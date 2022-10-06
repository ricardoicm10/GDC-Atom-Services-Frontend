import axios from "axios"

export function getPlatforms(){
    return axios.get("http://localhost:5000/platforms");
}