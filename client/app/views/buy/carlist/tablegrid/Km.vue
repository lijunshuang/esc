<template>
    <div>
        {{km | thousands}}
    </div>
</template>

<script>
    export default {
        props : ["km"],
    }
</script>

<style scoped>

</style>