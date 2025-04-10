import axiosInstance from './axiosInstance';

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};


export default{
    getAll(){
        return axiosInstance.get("/location", getAuthHeader());
    },
    getById(id){
        return axiosInstance.get(`/location/${id}`, getAuthHeader());
    },
    create(location){
        return axiosInstance.post("location",location, getAuthHeader());
    },
    delete(id){
        return axiosInstance.delete(`/location/${id}`, { ...getAuthHeader(), data: {} });
    },
};
