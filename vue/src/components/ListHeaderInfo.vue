<template>
    <div class="list-row header info">
        <div class="icon-wrapper" @click="$emit('close')">
            <CrossIcon></CrossIcon>
        </div>
    </div>
</template>

<script>
/* SVG */
import CrossIcon from '@/assets/img/icon/cross.svg'

export default {
    components: {
        CrossIcon
    }
}
</script>
