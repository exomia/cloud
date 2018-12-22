<template>
    <div class="input-wrapper" :class="{ 'input-wrapper-error': error }">
        <div class="icon-wrapper"><LockIcon class="input-icon" /></div>
        <input
            :value="value"
            :type="'password'"
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
import LockIcon from '@/assets/img/icon/login/lock.svg'

export default {
    components: {
        LockIcon
    },
    props: {
        placeholder: {
            type: String,
            default: '',
            required: true
        },
        error: {
            type: Boolean,
            default: false,
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
    src="@/views/resetPassword/components/ThePasswordInput.scss"
    lang="scss"
    scoped
></style>
