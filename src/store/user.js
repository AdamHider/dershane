import { defineStore } from 'pinia'
import { api } from '@/services/'
import Storage from '@/utils/storage'
import { computed, ref, reactive, watch } from 'vue'
import { CONFIG } from '@/config.js'

const userDefault = {
  active: {
    authorization: {},
    activeClassroom: CONFIG.DEFAULT_CLASSROOM_CODE,
    data: {}
  },
  list: {

  }
};

export const userStorage = new Storage('drsh_user_store')


export const useUserStore = defineStore('drsh_user_store', () => {
    let user = reactive(userStorage.get() || userDefault)
    
    const isAuthorized = computed(() => user.active.data.id !== null)
  
    function update(data) {
      if (data === undefined || data === null) {
        user.active.authorization = {}
        user.active.activeClassroom = CONFIG.DEFAULT_CLASSROOM_CODE
        user.active.data = {}
      } else {
        if(data.authorization) user.active.authorization = data.authorization 
        if(data.activeClassroom) user.active.activeClassroom = data.activeClassroom 
        if(data.data) user.active.data = data.data 
        user.list[user.active.authorization.username] = data;
      }
      userStorage.set(user);
      return true;
    }

    async function signIn (auth, activeClassroom) {
      if(!auth){ return }
      const result = await api.user.signIn(auth)
      if (result.success) {
        const userResponse = await api.user.get()
        update({authorization: auth, data: userResponse.data})
        await api.user.setActiveClassroom(user.active.activeClassroom)
      }
      return result;
    }

    async function autoSignIn () {
      const activeUser = await api.user.get();
      if(user.active.data.id && user.active.data.id != activeUser.data.id){
        await signIn(user.active.authorization);
      }
    }

    async function signOut(){
      await api.user.signOut();
      update(null);
      await api.user.setActiveClassroom(false)
      return true;
    }

    async function signUp (auth) {
      const result = await api.user.signUp(auth)
      if (result.success) {
        update({authorization: auth})
      }
      return result;
    }

    async function activate (code) {
      await signOut();
      const result = await api.user.activate(code)
      if (result.success) {
        await signIn(user.active.authorization);
      }
      return result;
    }

    async function setActiveClassroom (code) {
      await api.user.setActiveClassroom(code);
      return update({activeClassroom: code});
    }

    function checkUsername (username) {
      return api.user.checkUsername(username)
    }

    function checkEmail (username) {
      return api.user.checkEmail(username)
    }
    
    return {
      user,
      isAuthorized,
      update,
      signIn,
      autoSignIn,
      signOut,
      signUp,
      activate,
      checkUsername,
      checkEmail,
      setActiveClassroom
    }
  })