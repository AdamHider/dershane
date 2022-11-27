import { reactive } from 'vue'
import { Api } from '@/services/api'
const courses = reactive({
    list: []
});

export function useCourses() {
    async function getList () {
        try{
            courses.list = await Api.courses.getList();
        } catch(e){
            throw new Error(`Courses are null: `+e); 
        }      
    }
    
    return {
        getList,
        courses
    }
}