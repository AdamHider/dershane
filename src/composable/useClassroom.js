import { reactive, watch } from 'vue'
import { api } from '@/services/'


const classroom = reactive({
    active: {},
    list: []
});

export function useClassroom() {
<<<<<<< HEAD
=======
    const { user } = useUserStore();
    watch(user.active, (newData, oldData) => {
        getActive();
        getList();
    });
>>>>>>> bca25f4ada655e47ee70020d974a5b5c4ff3a689

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