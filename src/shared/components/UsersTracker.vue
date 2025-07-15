<script setup>
const props = defineProps({
    usersData: {
        type: {
            fiveSecondsActiveUsers: Number,
            oneDayActiveUsers: Number,
            oneDayCardsCreated: Number,
        },
        default: () => ({
            fiveSecondsActiveUsers: 0,
            oneDayActiveUsers: 0,
            oneDayCardsCreated: 0,
        }),
    },
});
</script>

<template>
    <div class="flex items-center justify-between gap-4 lg:gap-6 font-bold text-gray-700 text-xs">
        <div class="flex items-center flex-col lg:flex-row gap-2">
            <div class="order-2 lg:order-1 pulse-slow rounded-full w-2 h-2 bg-red-500"></div>
            <span class="order-1 lg:order-2">Recently active users: </span>
            <span class="order-3 lg:order-3 text-blue-700">{{ props.usersData.fiveSecondsActiveUsers }}</span>
        </div>
        <div class="flex items-center flex-col lg:flex-row gap-2">
            <div class="order-2 lg:order-1 pulse-slow rounded-full w-2 h-2 bg-red-500"></div>
            <span class="order-1 lg:order-2">Daily active users: </span>
            <span class="order-3 lg:order-3 text-blue-700">{{ props.usersData.oneDayActiveUsers }}</span>
        </div>
        <div class="flex items-center flex-col lg:flex-row gap-2">
            <div class="order-2 lg:order-1 pulse-slow rounded-full w-2 h-2 bg-red-500"></div>
            <span class="order-1 lg:order-2">Daily created cards: </span>
            <span class="order-3 lg:order-3 text-blue-700">{{ props.usersData.oneDayCardsCreated }}</span>
        </div>
    </div>
</template>

<style scoped></style>
