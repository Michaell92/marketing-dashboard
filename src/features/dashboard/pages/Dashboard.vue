<script setup>
import { onMounted } from 'vue';
import { parseExcel } from '@/shared/helpers/excelParser';

onMounted(() => {
    console.log('Dashboard component mounted');
});
</script>

<template>
    <div class="h-screen flex justify-center items-start mt-10">
        <div class="flex flex-col items-center">
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Marketing Dashboard</h1>
            <div class="w-16 h-1 bg-blue-500 rounded"></div>
        </div>
    </div>
</template>

<style scoped></style>
