const StorageType = 'localStorage' | 'sessionStorage'

export default class Storage {
  key;
  storageType;

  constructor (key, storageType = 'localStorage') {
    this.key = key
    this.storageType = storageType
  }

  get (){
    try {
      const value = window[this.storageType].getItem(this.key) ?? ''
      return JSON.parse(value)
    } catch (e) {
      return null
    }
  }

  set (value){
    const strValue = JSON.stringify(value)
    window[this.storageType].setItem(this.key, strValue)
  }

  remove () {
    window[this.storageType].removeItem(this.key)
  }
}