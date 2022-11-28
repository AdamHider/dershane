import { defineStore } from 'pinia'
//import { api } from 'src/services'
//import { User } from 'src/services/api'
import Storage from '@/utils/storage'
import { computed, ref } from 'vue'

const userDefault = {
  authorization: {},
  data: {}
};

export const userStorage = new Storage('drsh_active_user')

export const isAuthorized = userStorage.get()?.data 

export const useUserStore = defineStore('drsh_active_user', () => {
  const user = ref(userStorage.get() || userDefault) 

  function updateUser (userData) {
    if (userData === undefined || userData === null) {
      userStorage.remove()
      //api.setSecurityData(null)
      user.value = userDefault
    } else {
      userStorage.set(userData)
      //api.setSecurityData(userData.token)
      user.value = userData
    }
  }

  return {
    user,
    updateUser,
  }
})