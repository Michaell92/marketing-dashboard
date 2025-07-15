<script setup>
import { computed, onMounted } from 'vue';
import { useTheme } from '@/shared/composables/useTheme';

const { currentTheme, toggleTheme, initializeTheme } = useTheme();
const isDarkMode = computed(() => currentTheme.value === 'dark');

onMounted(() => {
    initializeTheme();
});
</script>
<template>
    <div class="gap-2">
        <div class="relative flex items-center justify-end">
            <!-- Sun icon -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
            </svg>

            <!-- Toggle Switch -->
            <button
                @click="toggleTheme"
                class="theme-switcher w-10 h-4 mx-1 rounded-full p-1 relative transition-colors duration-600 focus:outline-none cursor-pointer"
                :class="isDarkMode ? 'bg-blue-700' : 'bg-gray-300'"
                aria-label="Toggle dark mode"
            ></button>

            <!-- Moon icon -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5 text-blue-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
            </svg>
        </div>
    </div>
</template>

<style scoped></style>
