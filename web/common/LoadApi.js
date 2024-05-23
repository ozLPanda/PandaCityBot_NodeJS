import {adminCreate, getUser, getUsers, removeUser, saveUser} from '../api/User.js'
import { getBuild, getBuilds, removeBuild, updateBuild } from '../api/Build.js'
import {
  getBuildCategories,
  getBuildCategory,
  removeBuildCategory,
  updateBuildCategory
} from '../api/BuildCategory.js'
import { getLogs } from '../api/Log.js'

export function loadApi() {
  return {
    test: {
      get: [],
      put: [],
      post: [],
      delete: []
    },
    admin: {
      get: [],
      put: [saveUser],
      post: [],
      delete: []
    },
    public: {
      get: [getUsers, getUser, getBuilds, getBuild],
      put: [],
      post: [],
      delete: []
    },
    owner: {
      get: [getBuildCategories, getBuildCategory, getLogs],
      put: [updateBuild, updateBuildCategory],
      post: [adminCreate],
      delete: [removeBuild, removeBuildCategory]
    }
  }
}
