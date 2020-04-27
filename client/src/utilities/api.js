import axios from "axios";

export default {
    createUser: (data) => {
        return axios.post("/api/users/", data);
    },
    login: (data) => {
        return axios.post("/api/users/login", data);
    },
    logout: () => {
        return axios.get("/api/users/logout");
    },
    createApplication: (data) => {
        return axios.post("/api/applications/", data);
    },
    findUnassignedApplications: () => {
        return axios.get("/api/applications/");
    },
    updateApplication: (data) => {
        return axios.put("/api/applications/", data);
    }
}