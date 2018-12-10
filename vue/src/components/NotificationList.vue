<template>
    <aside>
        <Notification
            v-for="(item, key) of activeNotifications"
            :key="'notification-' + key + item.type"
            :type="item.type"
            :msg="item.msg"
        ></Notification>
    </aside>
</template>

<script>
import Notification from '@/components/Notification'

export default {
    components: {
        Notification
    },
    data() {
        return {
            notifications: []
        }
    },
    computed: {
        activeNotifications: function() {
            return this.notifications.filter(el => el.active)
        }
    },
    // mounted() {
    //     var self = this
    //     self.addNotification('error', 'Ein fehler ist aufgetreten')
    //     setTimeout(function() {
    //         self.addNotification('warning', 'Der Nutzer existiert bereits')
    //         setTimeout(function() {
    //             self.addNotification('success', 'Erfolgreich angemeldet')
    //             setTimeout(function() {
    //                 self.addNotification('', 'Test')
    //             }, 500)
    //         }, 1000)
    //     }, 2000)
    // },
    methods: {
        addNotification: function(type, msg) {
            // Remove after timeout
            const self = this
            setTimeout(function() {
                self.removeLastNotification()
            }, 4000)

            this.$nextTick(function() {
                this.notifications.push({ type, msg, active: true })
            })
        },
        removeLastNotification: function() {
            let inactive = false
            for (let notify of this.notifications) {
                if (notify.active) {
                    this.$set(notify, 'active', false)
                    // Reset when its the last item in array
                    if (
                        notify ===
                        this.notifications[this.notifications.length - 1]
                    ) {
                        inactive = true
                    }
                    break
                }
            }

            // Reset
            if (inactive) {
                this.notifications = []
            }
        }
    }
}
</script>

<style
    src="@/assets/scss/components/NotificationGroup.scss"
    lang="scss"
    scoped
></style>
