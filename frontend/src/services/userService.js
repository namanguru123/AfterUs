import api from "../api/axios"; 

export const getUserDetails = async () => {
    const res = await api.get("/user/me");
    return res.data;
}


export const deleteUser = async () => { 
    await api.delete("/user/me");
}   