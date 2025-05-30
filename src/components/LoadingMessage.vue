<template>
    <div class="flex flex-col items-center justify-center py-8 text-orange-500 text-lg">
        <div class="flex space-x-2 mb-2">
            <span class="h-4 w-4 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span class="h-4 w-4 bg-orange-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span class="h-4 w-4 bg-orange-500 rounded-full animate-bounce"></span>
        </div>
        <slot>Loading...</slot>
    </div>
</template>

<script setup lang="ts">
</script>