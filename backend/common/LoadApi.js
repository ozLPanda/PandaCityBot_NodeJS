import {getUser, getUsers, removeUser, saveUser} from "../api/User.js";
import {getBuild, getBuilds, removeBuild, updateBuild} from "../api/Build.js";
import {getBuildCategories, getBuildCategory, removeBuildCategory, updateBuildCategory} from "../api/BuildCategory.js";
import {getLogs} from "../api/Log.js";

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
            updateBuild,
            getBuildCategories,
            getBuildCategory,
            updateBuildCategory,
            removeBuildCategory,
            getLogs
        ]
    }
}