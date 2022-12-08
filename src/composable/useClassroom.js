import { reactive, watch } from 'vue'
import { api } from '@/services/'


const classroom = reactive({
    active: {},
    list: []
});

export function useClassroom() {

    async function getActive () {
        try{
            const classroomResponse = await api.classroom.getActive();
            classroom.active = classroomResponse.data;
        } catch(e){
            throw new Error(`classroom are null: `+e); 
        }      
    }
    async function getList () {
        try{
            const classroomListResponse = await api.classroom.getList({mode: 'by_user'});
            classroom.list = classroomListResponse.data;
        } catch(e){
            throw new Error(`classroom are null: `+e); 
        }      
    }
    
    return {
        getActive,
        getList,
        classroom
    }
}