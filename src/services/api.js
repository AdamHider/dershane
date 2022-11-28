import { useUserStore  } from '@/store/user'
import jQuery from "jquery";

export class ApiService {
  baseUrl = "/";

  constructor(config){
    Object.assign(this, config);
  }
  setResource = (context, method) =>  {
    return this.baseUrl+`index.php?option=com_dershane&scope=${context}&method=${method}&format=raw`;
  }
  setBody = (params) => {
    const { user } = useUserStore();
    return {
      student: {
        id: user && user.id
      },
      request_data: params
    };
  }
  post = async(context, method, params) =>  {
    var self = this;
    let responseData = {};
    const resource = this.setResource(context, method);
    const body = this.setBody(params);
    await jQuery.ajax({
      url: resource,  
      method: "POST",
      data: body,
      xhrFields: {
        withCredentials: true
      }
    })
      .done(function(response, textStatus, request){
        let parsed = JSON.parse(response);
        responseData = parsed.data;
      })
      .fail(function(){
        responseData = false;
      });
      return responseData;
  }
}


export class Api extends ApiService{
    courses = {
        getList: (params) => {
            return this.post('category', 'getList', params)
        }
    }
    lessons = {
        getList: (params) => {
            return this.post('lessons', 'getList', params)
        }
    }
    user = {
        get: (params) =>  {
            return this.post('user', 'getItem', params)
        },
        signUp: (params) =>  {
            return this.post('user', 'signUp', params)
        },
        signOut: (params) =>  {
            return this.post('user', 'signOut', params);
        },
        signIn: (params) => {
            return this.post('user', 'signIn', params);
        },
        activate: (params) => {
            return this.post('user', 'activate', params)
        }
    }
}
