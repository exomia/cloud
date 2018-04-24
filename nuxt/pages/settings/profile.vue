<template>
  <div id="page">
      <settings-sidebar></settings-sidebar>
      <div class="overview">
          <div class="center-container" style="align-items: center;height: 100%">
            <form class="form-container" method="post">

                <settings-data-change-form
                    v-model="changeName"
                    @click="changeNameSubmit = true"
                    label="Name"
                    inputValue="??"
                    inputPlaceholder="Name"
                    buttonPlaceholder="Name ändern"
                    disclaimer="Dieser Name ist öffentlich für andere Nutzer sichtbar."
                    iconClass="public"
                ></settings-data-change-form>

                <settings-data-change-form
                    v-model="changeEmail"
                    @click="changeEmailSubmit = true"
                    label="E-Mail"
                    inputValue="??"
                    inputPlaceholder="E-Mail"
                    buttonPlaceholder="E-Mail ändern"
                    disclaimer="Ihre E-Mail benötigen Sie um sich mit Ihrem Account anzumelden.<br>Sie ist nur unter bestimmen Umständen für andere Nutzer sichtbar."
                    iconClass="public"
                ></settings-data-change-form>

                <div class="spacer-container">
                    <h2 class="form-header">Passwort<i class="private"></i></h2>
                    <input v-model="password" class="text-input" type="password" placeholder="Aktuelles Passwort"> 
                    <input v-model="newPassword" class="text-input" type="password" placeholder="Neues Passwort"> 
                    <span class="disclaimer">Ihr Passwort stellt den Hauptschlüssel für Ihren Account dar.<br><b>Geben Sie dieses Passwort niemals an Dritte weiter!</b></span>
                    <input @click="changePasswordSubmit = true" class="confirm-button" style="width: 100%" type="button" value="Passwort ändern">
                </div>

            </form>
        </div>
      </div>
  </div>
</template>

<script>
import SettingsSidebar from '~/components/navigation/sidebar/SettingsSidebar'
import SettingsDataChangeForm from '~/components/UI/SettingsDataChangeForm'

export default {
    data() {
        return {
            changeName: '',
            changeNameSubmit: false,
            changeEmail: '',
            changeEmailSubmit: false,
            password: '',
            newPassword: '',
            changePasswordSubmit: false
        }
    },
    auth: {
        login: true
    },
    components: {
        SettingsSidebar,
        SettingsDataChangeForm
    }
}
</script>
