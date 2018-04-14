<template>
    <div class="page">
        <div class="center-container" style="padding: 150px 15px 15px">
            <img src="~/assets/img/cloud-logo.svg" alt="Logo" class="logo">
            <form class="form-container" method="post">
                <input placeholder="Name/E-Mail" class="text-input" type="text" name="username"
                       v-model="name" required>
                <input placeholder="Passwort" class="text-input" type="password" name="password" v-model="password"
                       required>
                <!-- text-input-invalid -->
                <div class="login-action-container">
                    <input
                      class="login-checkbox"
                      type="checkbox"
                      name="stayLoggedIn"
                      v-model="checked">
                    <span class="login-checkbox-label" @click="checked = !checked">Angemeldet bleiben</span>
                </div>
                <input class="confirm-button" style="width: 100%;margin-top: 10px"
                       :value="loginBtnValue"
                       type="button"
                       @click="tryLogin">
            </form>
        </div>
    </div>
</template>

<script>
export default {
  layout: 'landing',
  data() {
    return {
      name: '',
      password: '',
      checked: false,
      loginBtnValue: 'Login'
    }
  },
  methods: {
    tryLogin() {
      this.loginBtnValue = 'Login...'
      console.log('Try Login')
    }
  },
  watch: {
    checked() {
      this.tryLogin()
    }
  }
}
</script>
