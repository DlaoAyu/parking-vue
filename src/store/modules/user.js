import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    nickName: '',
    email: '',
    phonenumber: '',
    sex: '',
    menuList: [],
    parkInfoList: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },

  SET_NICKNAME: (state, nickName) => {
    state.nickName = nickName
  },
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_PHONENUMBER: (state, phonenumber) => {
    state.phonenumber = phonenumber
  },
  SET_SEX: (state, sex) => {
    state.sex = sex
  },

  SET_MENU_LIST: (state, menuList) => {
    state.menuList = menuList
  },

  SET_PARKINFO_LIST: (state, parkInfoList) => {
    state.parkInfoList = parkInfoList
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { userName, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ userName: userName.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }

        const { name, avatar, nickName, email, phonenumber, sex, menuList, parkInfoList } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_NICKNAME', nickName)
        commit('SET_EMAIL', email)
        commit('SET_PHONENUMBER', phonenumber)
        commit('SET_SEX', sex)

        commit('SET_MENU_LIST', menuList)

        commit('SET_PARKINFO_LIST', parkInfoList)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

