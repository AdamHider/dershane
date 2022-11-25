import { reactive } from 'vue'
import { Api } from '@/services/api'
const courses = reactive({
    list: []
});

export function useCourses() {
    async function getList () {
        console.log(Api);
        try{
            const response = await Api.courses.getList();
            courses.list = response.data.data.response_data
        } catch(e){
            throw new Error(`Courses are null: `+e); 
        }      
    }
    
    return {
        getList,
        courses
    }
}