<script setup>
import { onMounted } from 'vue';

const props = defineProps({
    title: {
        type: String,
        default: 'Dashboard',
    },
    description: {
        type: String,
        default: 'This is your dashboard where you can view and manage your data.',
    },
});
</script>

<template>
    <div class="flex flex-col items-center">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">{{ title }}</h1>
        <div class="w-16 h-1 bg-blue-500 rounded"></div>
    </div>
    <div class="text-center w-full max-w-4xl p-6 bg-white shadow-md rounded-lg mt-4">
        <p class="text-gray-700">
            {{ description }}
        </p>
    </div>
</template>

<style scoped></style>
