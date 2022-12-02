import { defineStore } from 'pinia'
import { api } from '@/services/'
import Storage from '@/utils/storage'
import { computed, ref, reactive } from 'vue'

const defaultCode = '000000';

export const classroomStorage = new Storage('drsh_active_classroom')

export const useClassroomStore = defineStore('drsh_active_classroom', () => {
    let classroom = reactive(classroomStorage.get() || {})
  
    function update(data) {
      if (data === undefined || data === null) {
        classroomStorage.remove();
      } else {
        classroomStorage.set(data);
      }
    }

    async function setActive(code) {
      if(!code && classroom.code) code = defaultCode;
      await api.classroom.setActive({code: code});
      update({code: code});
    }
    async function linkToUser(code) {
      if(!code && classroom.code) code = defaultCode;
      await api.classroom.linkToUser({code: code});
      //update(code);
      /*
      const classroomResponse = await api.classroom.get()
      if(classroomResponse.data.id){
        update(userResponse.data);
      }*/
    }

    return {
      classroom,
      setActive,
      linkToUser
    }
  })