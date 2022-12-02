import { defineStore } from 'pinia'
import { api } from '@/services/'
import Storage from '@/utils/storage'
import { computed, ref, reactive } from 'vue'

const userDefault = {
  active: {
    authorization: {},
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
        user.active.data = {}
      } else {
        user.active.authorization = data.authorization 
        user.active.data = data.data 
        user.list[data.authorization.username] = data;
      }
      userStorage.set(user);
    }

    async function signIn (auth) {
      if(!auth){ return }
      await signOut();
      const result = await api.user.signIn(auth)
      if (result.success) {
        const userResponse = await api.user.get()
        update({authorization: auth, data: userResponse.data})
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
      checkEmail
    }
  })