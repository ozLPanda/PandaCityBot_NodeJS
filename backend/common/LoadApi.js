import {getUser, getUsers, removeUser, saveUser} from "../api/User.js";
import {getBuild, getBuilds, removeBuild, updateBuild} from "../api/Build.js";

export function loadApi(){
    return {
        test: [],
        admin: [
            saveUser
        ],
        public: [
            getUsers,
            getUser,
            getBuilds,
            getBuild
        ],
        owner: [
            removeBuild,
            updateBuild
        ]
    }
}