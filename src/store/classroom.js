import { defineStore } from 'pinia'
import { api } from '@/services/'
import Storage from '@/utils/storage'
import { reactive, watch } from 'vue'
import { CONFIG } from '@/config.js'
import { useUserStore } from '@/store/user'

const { user } = useUserStore()

const defaultCode = CONFIG.DEFAULT_CLASSROOM_CODE;

const classroomDefault = {
  active: {},
  list: []
};

export const classroomStorage = new Storage('drsh_classroom_store')

export const useClassroomStore = defineStore('drsh_classroom_store', () => {
    let classroom = reactive(classroomStorage.get() || classroomDefault)
    let tmp_code = false;
  
    function update(data) {
      if (data === undefined || data === null) {
        classroom.active = {}
        classroom.list = []
      } else {
        if(data.active) classroom.active = data.active
        if(data.list) classroom.list = data.list
      }
      classroomStorage.set(classroom);
      return true;
    }
    async function getClassroom () {
      try{
        const classroomResponse = await api.classroom.get();
        return update({active: classroomResponse.data});
      } catch(e){
        throw new Error(`classroom are null: `+e); 
      }      
    }
    async function getClassrooms () {
      try{
        const classroomResponse = await api.classroom.getList({mode: 'by_user'});
        return update({list: classroomResponse.data});
      } catch(e){
        throw new Error(`classroom are null: `+e); 
      }      
    }

    return {
      classroom,
      update,
      getClassroom,
      getClassrooms
    }
  })