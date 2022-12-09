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
  post = async(context, method, params = {}) =>  {
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
    achievements = {
        getList: (params) => {
            return this.post('achievement', 'getList', params)
        }
    }
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
    notifications = {
        getList: (params) => {
            return this.post('notification', 'getList', params)
        }
    }
    user = {
        get: (params) =>  {
            return this.post('user', 'getItem', params)
        },
        signUp: (params) =>  {
            return this.post('user', 'addItem', params)
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
        save: (params) => {
            return this.post('user', 'saveItem', params)
        },
        savePassword: (params) => {
            return this.post('user', 'savePassword', params)
        },
        checkUsername: (params) => {
            return this.post('user', 'checkUsername', params);
        },
        checkEmail: (params) => {
            return this.post('user', 'checkEmail', params);
        }
    }
    classroom = {
        getActive: (params) =>  {
            return this.post('classroom', 'getItem', params)
        },
        getList: (params) =>  {
            return this.post('classroom', 'getList', params)
        }
    }
}
