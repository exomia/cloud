<template>
    <div class="list-row header info">
        <div @click="$emit('close')" class="icon-wrapper">
            <CrossIcon></CrossIcon>
        </div>
    </div>
</template>

<script>
/* SVG */
import CrossIcon from "@/assets/img/icon/cross.svg";

export default {
    components: {
        CrossIcon
    }
};
</script>