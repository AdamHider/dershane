import { reactive, watch } from 'vue'
import { api } from '@/services/'
import { useUserStore } from '@/store/user'

const { user } = useUserStore()

const classroom = reactive({
    list: []
});

export function useClassroom() {
    watch(user.active, (newData, oldData) => {
        getList();
    });
    async function getList () {
        try{
            const classroomResponse = await api.classroom.getList({mode: 'by_user'});
            classroom.list = classroomResponse.data;
        } catch(e){
            throw new Error(`classroom are null: `+e); 
        }      
    }
    
    return {
        getList,
        classroom
    }
}