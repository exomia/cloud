<template>
    <main>
        <SettingsSidebar></SettingsSidebar>
        <div class="overview">
            <div class="center-container" style="align-items: center;height: 100%">
                <SettingsDataChangeForm
                    v-model="changeName"
                    label="Name"
                    input-value="??"
                    input-placeholder="Name"
                    button-placeholder="Name ändern"
                    disclaimer="Dieser Name ist öffentlich für andere Nutzer sichtbar."
                    icon-class="public"
                    @click="changeNameSubmit = true"
                ></SettingsDataChangeForm>
                <SettingsDataChangeForm
                    v-model="changeEmail"
                    label="E-Mail"
                    input-value="??"
                    input-placeholder="E-Mail"
                    button-placeholder="E-Mail ändern"
                    disclaimer="Ihre E-Mail benötigen Sie um sich mit Ihrem Account anzumelden.<br>Sie ist nur unter bestimmen Umständen für andere Nutzer sichtbar."
                    icon-class="public"
                    @click="changeEmailSubmit = true"
                ></SettingsDataChangeForm>
                <div class="spacer-container">
                    <h2 class="form-header">
                        Passwort
                        <i class="private"></i>
                    </h2>
                    <input
                        v-model="password"
                        class="text-input"
                        type="password"
                        placeholder="Aktuelles Passwort"
                    >
                    <input
                        v-model="newPassword"
                        class="text-input"
                        type="password"
                        placeholder="Neues Passwort"
                    >
                    <span
                        class="disclaimer"
                    >Ihr Passwort stellt den Hauptschlüssel für Ihren Account dar.
                        <br>
                        <b>Geben Sie dieses Passwort niemals an Dritte weiter!</b>
                    </span>
                    <input
                        class="confirm-button"
                        style="width: 100%"
                        type="button"
                        value="Passwort ändern"
                        @click="changePasswordSubmit = true"
                    >
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import SettingsSidebar from '@/components/navigation/sidebar/SettingsSidebar'
import SettingsDataChangeForm from '@/components/UI/SettingsDataChangeForm'

export default {
    metaInfo() {
        return {
            title: this.$t('title.settings')
        }
    },
    components: {
        SettingsSidebar,
        SettingsDataChangeForm
    },
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
    }
}
</script>
