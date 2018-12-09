<template>
    <div class="spacer-container">
        <h2 class="form-header">{{ label }} <i :class="iconClass" /></h2>
        <div style="display:flex">
            <input
                class="text-input"
                style="margin-right: 10px"
                type="text"
                :placeholder="inputPlaceholder"
                v-bind="$attrs"
                :value="value"
                @input="$emit('input', $event.target.value)"
            />
            <input
                class="confirm-button"
                style="height: 100%"
                type="button"
                :value="buttonPlaceholder"
                v-bind="$attrs"
                v-on="$listeners"
            />
        </div>
        <span class="disclaimer" v-html="disclaimer" />
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: String,
            default: ''
        },
        inputPlaceholder: {
            type: String,
            default: ''
        },
        buttonPlaceholder: {
            type: String,
            default: ''
        },
        disclaimer: {
            type: String,
            required: true
        },
        iconClass: {
            type: String,
            default: ''
        }
    }
}
</script>
