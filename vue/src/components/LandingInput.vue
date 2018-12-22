<template>
    <div class="input-wrapper" :class="{ 'input-wrapper-error': error }">
        <div class="icon-wrapper">
            <LockIcon v-if="icon === 'lock'" class="input-icon" />
            <UserIcon v-else-if="icon === 'user'" class="input-icon" />
        </div>
        <input
            :value="value"
            :type="type"
            :placeholder="[focused ? '' : placeholder]"
            @input="updateValue($event)"
            @focus="focused = true"
            @blur="focused = false"
            @keydown.enter="onEnterPress()"
        />
    </div>
</template>

<script>
/* SVG */
import UserIcon from '@/assets/img/icon/login/user.svg'
import LockIcon from '@/assets/img/icon/login/lock.svg'

export default {
    components: {
        UserIcon,
        LockIcon
    },
    props: {
        placeholder: {
            type: String,
            default: '',
            required: true
        },
        type: {
            type: String,
            default: 'text'
        },
        error: {
            type: Boolean,
            default: false,
            required: true
        },
        icon: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            value: '',
            focused: false
        }
    },
    methods: {
        onEnterPress: function() {
            this.$emit('enterPress')
        },
        updateValue: function(e) {
            this.value = e.target.value
            this.$emit('update:value', e.target.value)
        }
    }
}
</script>

<style
    src="@/assets/scss/components/LandingInput.scss"
    lang="scss"
    scoped
></style>
