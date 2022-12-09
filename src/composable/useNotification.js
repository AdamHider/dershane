import { reactive } from 'vue'
import { api } from '@/services/'
const notifications = reactive({
    list: []
});

export function useNotification() {
    async function getList () {
        try{
            const notificationListResponse =  await api.notifications.getList();
            notifications.list = notificationListResponse.data;
        } catch(e){
            console.log(e)
            throw new Error(`Courses are null: `+e); 
        }      
    }
    
    return {
        getList,
        notifications
    }
}