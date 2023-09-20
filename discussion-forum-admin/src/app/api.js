import axios from "axios";
// const baseURL = "http://localhost:5000/commissioning-hub/us-central1/api";
const baseURL = " https://us-central1-commissioning-hub.cloudfunctions.net/api"
export const fetchUsers = async () => {
    try {
      const response = await axios.get(`${baseURL}/user/getUser`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error fetching users");
    }
  };

  export const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/post/get-data`);
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      throw new Error("Error fetching posts");
    }
  }
  export const updatePost = async (id, data) => {
    try {
      const response = await axios.post(`${baseURL}/post/update/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating post:", error);
      throw new Error("Error updating post");
    }
  }
  export const deletePost = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/post/delete/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting post:", error);
      throw new Error("Error deleting post");
    }
  }
  export const deleteUser = async(id) => {
    try{
      const response = await axios.delete(`${baseURL}/user/delete/${id}`);
      return response.data;
    }
    catch(e){
      throw new Error("Error deleting user");
    }
  }
  export const restrictUser = async(id) => {
    try{
      const response = await axios.post(`${baseURL}/user/restrict/${id}`);
      return response.data;
    }
    catch(e){
      throw new Error("Error restricting user");
    }
  }
  export const unrestrict = async(id) => {
    try{
      const response = await axios.post(`${baseURL}/user/unrestrict/${id}`);
      return response.data;
    }
    catch(e){
      throw new Error("Error allowing user");
    }
  }