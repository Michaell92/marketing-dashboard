<script setup>
import Dashboard from '@/features/dashboard/pages/Dashboard.vue';
import TopBar from '@/shared/components/TopBar.vue';
import { useUsers } from '@/shared/composables/useUsers';

const { fiveSecondsActiveUsers, oneDayActiveUsers, oneDayCardsCreated } = useUsers();
</script>

<template>
    <TopBar :usersData="{ fiveSecondsActiveUsers, oneDayActiveUsers, oneDayCardsCreated }" />
    <Dashboard />
</template>

<style scoped></style>
