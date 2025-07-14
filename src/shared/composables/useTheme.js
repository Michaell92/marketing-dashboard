import { ref, onMounted, watch } from 'vue';

// Create a reactive theme state that can be shared across components
const currentTheme = ref('light');

// Initialize the theme from localStorage
onMounted(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        currentTheme.value = savedTheme;
    } else {
        // If no preference is saved, use system preference
        currentTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        // Store the initial value
        localStorage.setItem('theme', currentTheme.value);
    }
    applyThemeToDOM();
});

// Watch for changes to theme and update localStorage and DOM
watch(currentTheme, (newTheme) => {
    localStorage.setItem('theme', newTheme);
    applyThemeToDOM();
});

function toggleTheme() {
    currentTheme.value = currentTheme.value === 'dark' ? 'light' : 'dark';
}

function applyThemeToDOM() {
    if (currentTheme.value === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

export function useTheme() {
    return {
        currentTheme,
        toggleTheme,
    };
}
