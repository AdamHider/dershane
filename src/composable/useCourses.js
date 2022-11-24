import { reactive } from 'vue'
import axios from "axios";
const courses = reactive({
    list: []
});
export function useCourses() {
    async function fetchCourses () {
        let request = null

        request = axios.post('http://localhost:777/index.php?option=com_dershane&scope=category&method=getList&format=raw');

        try{
            const response = await request
            courses.list = response.data.data.response_data
        } catch(e){
            throw new Error(`Courses are null: `+err); 
        }      
    }
    
    return {
        fetchCourses,
        courses
    }
}