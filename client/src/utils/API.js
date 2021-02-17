import axios from "axios";

export default {
    getPantryItems: function (id) {
        return axios.get("/api/foods/PantryItems/" + id)
    }


};
