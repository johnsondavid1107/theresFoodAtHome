import axios from "axios";
 
export default {
    getFoods: function(id) {
        return axios.get("/api/foods/user/" + id);
    }
};
 

