import axios from "axios";

export const serverUlr = "http://localhost:4000/p/api/";

export const itemBuildApiControl = {
    getBuild(id){
        return axios.post(serverUlr+"public.getBuild", {
            id
        });
    }
}