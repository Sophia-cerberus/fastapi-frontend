<template>
    <div>
      <vs-input
          v-validate="'required|email|min:3'"
          data-vv-validate-on="blur"
          name="email"
          icon-no-border
          icon="icon icon-user"
          icon-pack="feather"
          label-placeholder="Email"
          v-model="email"
          class="w-full"/>
      <span class="text-danger text-sm">{{ errors.first('email') }}</span>
  
      <vs-input
          data-vv-validate-on="blur"
          v-validate="'required|min:6|max:10'"
          type="password"
          name="password"
          icon-no-border
          icon="icon icon-lock"
          icon-pack="feather"
          label-placeholder="Password"
          v-model="password"
          class="w-full mt-6" />
      <span class="text-danger text-sm">{{ errors.first('password') }}</span>
  
      <div class="flex flex-wrap justify-between my-5">
          <vs-checkbox v-model="checkbox_remember_me" class="mb-3">Remember Me</vs-checkbox>
      </div>
      <div class="flex flex-wrap justify-between mb-3">
        <vs-button :disabled="!validateForm" @click="loginJWT">Login</vs-button>
      </div>
    </div>
  </template>
  
  <script>
  
  import router from '@/router'
  
  export default {
    data () {
      return {
        email: '',
        password: '',
        checkbox_remember_me: false
      }
    },
    computed: {
      validateForm () {
        return !this.errors.any() && this.email !== '' && this.password !== ''
      }
    },
    methods: {
      checkLogin () {
        // If user is already logged in notify
        if (this.$store.state.auth.isUserLoggedIn()) {
  
          // Close animation if passed as payload
          // this.$vs.loading.close()
          this.$vs.notify({
            title: '登陆 尝试',
            text: '您已经登陆!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'warning'
          })
          return false
        }
        return true
      },
      loginJWT () {
  
        if (!this.checkLogin()) return
  
        // Loading
        this.$vs.loading()
  
        const payload = {
          checkbox_remember_me: this.checkbox_remember_me,
          userDetails: {
            email: this.email,
            password: this.password
          }
        }
  
        this.$store.dispatch('auth/loginJWT', payload)
          .then(() => { 
            // Navigate User to homepage
            router.push(router.currentRoute.query.to || '/')
            this.$vs.loading.close() 
          })
          .catch(error => {
            this.$vs.loading.close()
            this.$vs.notify({
              title: '错误',
              text: error.message,
              iconPack: 'feather',
              icon: 'icon-alert-circle',
              color: 'danger'
            })
          })
      }
    }
  }
  
  </script>
  
  