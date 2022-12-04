import { reactive, watch } from 'vue'
import { api } from '@/services/'


const profile = reactive({
    data: []
});

export function useProfile() {
    async function getProfile () {
        try{
            const  profileResponse = await api.profile.get();
            profile.data = profileResponse.data;
        } catch(e){
            throw new Error(`classroom are null: `+e); 
        }      
    }
    
    return {
        getProfile,
        profile
    }
}