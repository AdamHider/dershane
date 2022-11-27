import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
const lessons = reactive({
    list: []
});

export function useLessons() {
    
    const route = useRoute();

    async function getList (filter) {
        try{
            const response = await Api.lessons.getList(filter);
            lessons.list = response.data.response_data
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