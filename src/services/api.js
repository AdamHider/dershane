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
    return {
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
        responseData = JSON.parse(response);
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
        },
        checkUsername: (params) => {
            return this.post('user', 'checkUsername', params);
        },
        checkEmail: (params) => {
            return this.post('user', 'checkEmail', params);
        }
    }
    student = {
        get: (params) =>  {
            return this.post('student', 'getItem', params)
        },
        signUp: (params) =>  {
            return this.post('student', 'addItem', params)
        },
        signOut: (params) =>  {
            return this.post('student', 'unauthorizeItem', params);
        },
        signIn: (params) => {
            return this.post('student', 'authorizeItem', params);
        },
        activate: (params) => {
            return this.post('student', 'activate', params)
        }
    }
}
