import { reactive } from 'vue'
import { api } from '@/services/'
const courses = reactive({
    list: []
});

export function useCourses() {
    async function getList () {
        try{
            courses.list = await api.courses.getList();
        } catch(e){
            throw new Error(`Courses are null: `+e); 
        }      
    }
    
    return {
        getList,
        courses
    }
}