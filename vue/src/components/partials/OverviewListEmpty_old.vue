<template>
    <div class="empty-list-container">
        <i class="directory-icon" />
        <h2>Keine Dateien vorhanden</h2>
        <span>Laden Sie Inhalte hoch oder erstellen Sie neue!</span>
        <a @click.prevent="goBack"
           href="#">
            <span>Zurück</span>
        </a>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            this.$router.back()
        }
    }
}
</script>


<style src="@/assets/css/components/partials/OverviewListEmpty" lang="scss" scoped>
</style>
