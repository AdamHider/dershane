<template>
  <page-container no-bottom-bar="true">
    
    </page-container>
</template>

<script setup >
import { routerPush } from '@/router/index'
import { api } from '@/services/'
import { useUserStore } from '@/store/user'
import { reactive, ref } from 'vue'

const { updateUser } = useUserStore()
const errors = ref()

App.User.signOut(function(result){
            App.Pages.UserActivate.activate(function(result){
                App.User.load(function(result){
                    App.Router.redirect('user_sign_in');
                    return callback(true);                
                });
            });
        });
const checkActivation = async () => {
  await api.user.signOut();
  const activated = await api.user.activate();
  if(activated){
    
  }
  const result = await api.user.signIn(user)
  
  if (result.success) {
    updateUser(user)
    routerPush('/student-startup')
  } else {
    setErrors(result)
  }
}

</script>