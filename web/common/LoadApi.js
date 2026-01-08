import { adminCreate, getUser, getUsers, loginUser, removeUser, saveUser } from '../api/User.js'
import { createBuild, getBuild, getBuilds, removeBuild, updateBuild } from '../api/Build.js'
import {
  getBuildCategories,
  getBuildCategory,
  createBuildCategory,
  removeBuildCategory,
  updateBuildCategory
} from '../api/BuildCategory.js'
import {
  getUserLevel,
  getUserLevels,
  createUserLevel,
  removeUserLevel,
  updateUserLevel
} from '../api/UserLevels.js'
import { getLogs } from '../api/Log.js'
import { Authorization } from '../middleware/Authorization.js'
import { CheckAdmin } from '../middleware/CheckAdmin.js'

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
      post: [loginUser],
      delete: []
    },
    public: {
      get: [getUsers, getUser, getBuilds, getBuild],
      put: [],
      post: [],
      delete: []
    },
    owner: {
      get: [getBuildCategories, getBuildCategory, getUserLevels, getUserLevel, getLogs],
      put: [updateBuild, updateBuildCategory, updateUserLevel],
      post: [adminCreate, createBuild, createBuildCategory, createUserLevel],
      delete: [removeBuild, removeBuildCategory, removeUserLevel]
    }
  }
}

export function useApi() {
  const api = {
    test: {
      get: [],
      put: [],
      post: [],
      delete: []
    },
    admin: {
      get: [],
      put: [
        {
          middleware: [Authorization],
          callback: saveUser
        }
      ],
      post: [
        {
          middleware: [],
          callback: loginUser
        }
      ],
      delete: []
    },
    public: {
      get: [
        {
          middleware: [],
          callback: getUsers
        },
        {
          middleware: [],
          callback: getUser
        },
        {
          middleware: [],
          callback: getBuilds
        },
        {
          middleware: [],
          callback: getBuild
        }
      ],
      put: [],
      post: [],
      delete: []
    },
    owner: {
      get: [
        {
          middleware: [Authorization],
          callback: getBuildCategories
        },
        {
          middleware: [Authorization],
          callback: getBuildCategory
        },
        {
          middleware: [Authorization],
          callback: getUserLevels
        },
        {
          middleware: [Authorization],
          callback: getUserLevel
        },
        {
          middleware: [Authorization, CheckAdmin(20)],
          callback: getLogs
        }
      ],
      put: [
        {
          middleware: [Authorization],
          callback: updateBuild
        },
        {
          middleware: [Authorization],
          callback: updateBuildCategory
        },
        {
          middleware: [Authorization],
          callback: updateUserLevel
        }
      ],
      post: [
        {
          middleware: [],
          callback: adminCreate
        },
        {
          middleware: [Authorization],
          callback: createBuild
        },
        {
          middleware: [Authorization],
          callback: createBuildCategory
        },
        {
          middleware: [Authorization],
          callback: createUserLevel
        }
      ],
      delete: [
        {
          middleware: [Authorization],
          callback: removeBuild
        },
        {
          middleware: [Authorization],
          callback: removeBuildCategory
        },
        {
          middleware: [Authorization],
          callback: removeUserLevel
        }
      ]
    }
  }

  function getApi() {
    let resp = {}
    for (let key in api) {
      resp[key] = {}
      for (let action in api[key]) {
        resp[key][action] = []
        resp[key][action] = [
          ...api[key][action].map((i) => {
            return i.callback
          })
        ]
      }
    }
    return resp
  }

  function getMiddlewareApi() {
    return api
  }

  return {
    getApi,
    getMiddlewareApi
  }
}
