import { defineStore } from 'pinia'
import { api } from '@/services/'
import Storage from '@/utils/storage'
import { computed, ref, reactive } from 'vue'

const studentDefault = {
  active: {
    authorization: {},
    data: {}
  },
  list: {

  }
};

export const studentStorage = new Storage('drsh_student_store')


export const useStudentStore = defineStore('drsh_student_store', () => {
    let student = reactive(studentStorage.get() || studentDefault)
    
    const isAuthorized = computed(() => student.active.data.id !== null)
  
    function update(data) {
      if (data === undefined || data === null) {
        student.active.authorization = {}
        student.active.data = {}
      } else {
        student.active.authorization = data.authorization 
        student.active.data = data.data 
        student.list[data.data.id] = data;
      }
      studentStorage.set(student);
    }
    async function signIn (auth) {
      if(!auth){ return }
      await signOut();
      const result = await api.student.signIn(auth)
      if (result.success) {
        const data = await api.student.get({id: result.id})
        update({authorization: auth, data: data})
      }
      return result;
    }
    async function signOut(){
      await api.student.signOut();
      update(null);
      return true;
    }
    async function signUp (auth, action) {
      const result = await api.student.signUp({...auth, ...{action: action}})
      if (result.success) {
        update({authorization: auth, data: result.data})
      }
      return result;
    }
  
    return {
      student,
      isAuthorized,
      update,
      signIn,
      signOut,
      signUp,
    }
  })