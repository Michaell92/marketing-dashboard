<script setup>
import ThemeSwitcher from '@/shared/components/ThemeSwitcher.vue';
import UsersTracker from '@/shared/components/UsersTracker.vue';

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
    <div
        class="flex items-center flex-wrap gap-8 sticky top-0 z-1000 justify-center sm:justify-between py-6 px-2 sm:px-4 lg:px-8 bg-gray-100 shadow-md rounded-lg"
    >
        <UsersTracker :usersData="props.usersData" />
        <ThemeSwitcher />
    </div>
</template>

<style scoped></style>
