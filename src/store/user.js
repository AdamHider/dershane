import { defineStore } from 'pinia'
import { api } from '@/services/'
import Storage from '@/utils/storage'
import { computed, ref, reactive, watch } from 'vue'
import { CONFIG } from '@/config.js'
import { useAppMessage } from '@/composable/useAppMessage';

const { showMessage } = useAppMessage();

const userDefault = {
  active: {
    authorization: {
      username: '',
      password: '',
      classroomCode: CONFIG.DEFAULT_CLASSROOM_CODE
    },
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
        if(data.authorization) user.active.authorization = data.authorization 
        if(data.data) user.active.data = data.data 
        user.list[user.active.authorization.username] = data;
      }
      userStorage.set(user);
      return true;
    }

    async function signIn (auth) {
      if(!auth){ return }
      const result = await api.user.signIn(auth)
      if (result.success) {
        const userResponse = await api.user.get()
        update({authorization: auth, data: userResponse.data})
      }
      showMessage('You have signed successfully!');
      return result;
    }

    async function autoSignIn () {
      const activeUser = await api.user.get();
      if(user.active.data.id && user.active.data.id != activeUser.data.id){
        const result = await signIn(user.active.authorization);
        if(!result.success){
          signOut();
        }
      }
    }

    async function signOut(){
      await api.user.signOut();
      update(null);
      return true;
    }

    async function signUp (auth) {
      if(!auth.classroom_code){
        auth.classroom_code = CONFIG.DEFAULT_CLASSROOM_CODE
      }
      const authResponse = await api.user.signUp(auth)
      if (authResponse.success) {
        update({authorization: authResponse.data})
      }
      return authResponse;
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