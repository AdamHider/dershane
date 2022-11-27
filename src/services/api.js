import { useUserStore  } from '@/store/user'
import jQuery from "jquery";

const baseURL = 'http://localhost:777/';

const ApiService = {
  setResource (context, method) {
    return `${baseURL}index.php?option=com_dershane&scope=${context}&method=${method}&format=raw`;
  },
  setBody (params){
    const { user } = useUserStore();
    return {
      student: {
        id: user && user.id
      },
      request_data: params
    };
  },
  async post (context, method, params) {
    let responseData = {};
    const resource = this.setResource(context, method);
    const body = this.setBody(params);
    await jQuery.post( resource, body)
      .done(function(response, textStatus, request){
        let parsed = JSON.parse(response);
        responseData = parsed.data.response_data;
      })
      .fail(function(){
        responseData = false;
      });
      return responseData;
  }
}

export default ApiService

export const Api = {
    courses: {
        getList (params) {
            return ApiService.post('category', 'getList', params)
        }
    },
    lessons: {
        getList (params) {
            return ApiService.post('lessons', 'getList', params)
        }
    },
    user: {
        signUp (params) {
          console.log(params);
            return ApiService.post('user', 'signUp', params)
        },
        checkIfUsernameExists (params) {
          console.log(params);
            return ApiService.post('user', 'checkIfUsernameExists', params)
        },
        signIn (params) {
          console.log(params);
            return ApiService.post('user', 'signIn', params)
        }
    },
}
