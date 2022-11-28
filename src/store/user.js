import { defineStore } from 'pinia'
//import { api } from 'src/services'
//import { User } from 'src/services/api'
import Storage from '@/utils/storage'
import { computed, ref, reactive } from 'vue'

const userDefault = {
  authorization: {},
  data: {}
};

export const userStorage = new Storage('drsh_active_user')


export const useUserStore = defineStore('drsh_active_user', () => {
    let user = reactive(userStorage.get() || userDefault)
    
    const isAuthorized = computed(() => user.value !== null)
  
    function updateUser (userData) {
      if (userData === undefined || userData === null) {
        userStorage.remove()
        user.authorization = {}
        user.data = {}
      } else {
        userStorage.set(userData)
        user.authorization = userData.authorization 
        user.data = userData.data 
      }
    }
  
    return {
      user,
      isAuthorized,
      updateUser,
    }
  })