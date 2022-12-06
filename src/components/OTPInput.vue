<template>
    <div ref="otpCont" class="v-digit-container">
      <input
        type="text"
        class="v-digit-box ma-2"
        v-for="(el, ind) in digits"
        :key="el+ind"
        v-model="digits[ind]"
        :autofocus="ind === 0"
        maxlength="1"
        @keydown="handleKeyDown($event, ind)"
      >
    <slot/>
    </div>
  </template>

<script setup>
  import { ref, reactive } from 'vue';

  const props = defineProps({
    default: String,
    digitCount: {
      type: Number,
      required: true
    },
    value: String,
    fieldConfig: Object
  });
  const emit = defineEmits(['update:otp', 'validate:otp']);

  const digits = reactive([])

  if (props.default && props.default.length === props.digitCount) {
    for (let i =0; i < props.digitCount; i++) {
      digits[i] = props.default.charAt(i)
    }
  } else {
    for (let i =0; i < props.digitCount; i++) {
      digits[i] = null;
    }
  }

  const otpCont = ref(null)
  const handleKeyDown = function (event, index) {
    if (event.key !== "Tab" && 
        event.key !== "ArrowRight" &&
        event.key !== "ArrowLeft"
    ) {
      event.preventDefault();
    }
    
    if (event.key === "Backspace") {
      digits[index] = null;
      
      if (index != 0) {
        (otpCont.value.children)[index-1].focus();
      } 

      return;
    }

    if ((new RegExp('^([0-9])$')).test(event.key)) {
      digits[index] = event.key;

      if (index != props.digitCount - 1) {
        (otpCont.value.children)[index+1].focus();
      }
    }
    emit('update:otp', validate())
  }
  const validate = function (){
    const value = digits.join('');
    var result = {
      value: value,
      valid: true
    }
    for(var i in props.fieldConfig.rules){
      var validity = props.fieldConfig.rules[i](value);
      if(validity !== true){
        result.valid = false;
      }
    }
  console.log(result);
    return result;
  }

  
  emit('update:otp', validate())
  


</script>

<style scoped>

.v-digit-container{
  width: 100%;
}
.v-digit-box {
  height: 4rem;
  width: 3rem;
  font-size: 3rem;
  border-bottom: 1px solid lightgray;
  display: inline-block;
  border-radius: 4px 4px 0 0;
  position: relative;
  text-align: center;
}
.v-digit-box:focus {
  outline: none;
}

</style>
