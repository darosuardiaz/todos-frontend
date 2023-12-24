import axios from "axios";

const ApiClient = axios.create({
    baseURL: "http://localhost:3001",
    headers: {},
})

export default ApiClient;