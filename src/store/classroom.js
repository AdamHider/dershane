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
    async function getList () {
      try{
        const classroomResponse = await api.classroom.getList({mode: 'by_user'});
        return update({list: classroomResponse.data});
      } catch(e){
        throw new Error(`classroom are null: `+e); 
      }      
    }
    async function setActive (code) {
      if(!user.active.data.id) return setActiveTemporary (code);
      await api.classroom.setActive(code);
      if(code){
        const classroomResponse = await api.classroom.get({code: code});
        return update({active: classroomResponse.data});
      }
      return update({active: {}});
    }

    function setActiveTemporary(code) {
      tmp_code = code;
      return true;
    }
    
    watch(user.active, async (newData, oldData) => {
      if(tmp_code){
        await setActive(tmp_code);
        setActiveTemporary (false);
      } else {
        await setActive();
      }
      getList();
    });

    return {
      classroom,
      update,
      getList,
      setActive,
      setActiveTemporary
    }
  })