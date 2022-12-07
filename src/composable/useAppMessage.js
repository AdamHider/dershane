import { reactive, watch } from 'vue'


export const message = reactive({
    text: '',
    visible: false,
    timeout: 4000 
});

export function useAppMessage() {
    function showMessage(text){
        message.text = text;
        message.visible = true;
    }

    return {
        showMessage,
        message
    }
}