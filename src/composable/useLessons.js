import { reactive, watch } from 'vue'
import axios from "axios";
import { useRoute } from 'vue-router'
const lessons = reactive({
    list: []
});

export function useLessons() {
    
    const route = useRoute();

    async function getList (filter) {
        const request = axios.post('http://localhost:777/index.php?option=com_dershane&scope=lessons&method=getList&format=raw', filter);
        try{
            const response = await request
            lessons.list = response.data.data.response_data
        } catch(e){
            throw new Error(`Lessons are null: `+e); 
        }      
    }

    watch(
        () => route.params.category_id,
        routeName => {
          console.log(route.params)
        },
        { immediate: true },
      )
    
    return {
        getList,
        lessons
    }
}