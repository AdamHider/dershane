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
  sessionIdUse = (sid) => {
      localStorage.sessionId = sid;
      jQuery.ajaxSetup({ 
          beforeSend: function(xhr) {
              xhr.setRequestHeader('x-sid',  sid);
              
              
          }
      });
  }
  post = async(context, method, params) =>  {
    var self = this;
    let responseData = {};
    const resource = this.setResource(context, method);
    console.log(resource);
    const body = this.setBody(params);
    await jQuery.post( resource, body)
      .done(function(response, textStatus, request){
        let parsed = JSON.parse(response);
        responseData = parsed.data;
        const sid = request.getResponseHeader('x-sid');
        console.log(jQuery.ajaxSetup());
        self.sessionIdUse('asdasdasd');
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
          console.log(this);
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
        signOut: async (params) =>  {
            const result = await this.post('user', 'signOut', params)
            result.success && this.sessionIdUse(null)
            return result;
        },
        signIn: async (params) => {
            return this.post('user', 'signIn', params);
        },
        activate: (params) => {
            return this.post('user', 'activate', params)
        }
    }
}
