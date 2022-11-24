import { ref, isRef, onMounted, reactive } from 'vue'
import axios from "axios";
const courses = ref(0);
const globalState = reactive({
    courses: []
  });

export function useCourses() {
  // state encapsulated and managed by the composable
    
    console.log(courses);
    async function fetchCourses () {
        let request = null

        request = axios.post('http://localhost:777/index.php?option=com_dershane&scope=category&method=getList&format=raw');

        try{
            const response = await request
            globalState.courses = response.data.data.response_data
        } catch(e){
            throw new Error(`Courses are null: `+err); 
        }      
    }
    
    return {
        fetchCourses,
        globalState
    }
}