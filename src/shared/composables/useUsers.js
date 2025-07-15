import { ref, readonly, onUnmounted } from 'vue';

const fetchUsersData = async () => {
    // Simulate fetching data from an API or service
    return Promise.resolve({
        fiveSecondsActiveUsers: Math.floor(Math.random() * 50),
        oneDayActiveUsers: Math.floor(Math.random() * 50),
        oneDayCardsCreated: Math.floor(Math.random() * 10),
    });
};

export function useUsers() {
    const fiveSecondsActiveUsers = ref(5);
    const oneDayActiveUsers = ref(35);
    const oneDayCardsCreated = ref(10);
    let intervalTime = 3000;

    const setUsersData = async () => {
        try {
            const data = await fetchUsersData();

            // Simulate a delay to mimic real-time data updates
            setTimeout(() => {
                fiveSecondsActiveUsers.value = data.fiveSecondsActiveUsers;
            }, Math.random() * 1000);
            setTimeout(() => {
                oneDayActiveUsers.value += data.oneDayActiveUsers;
            }, Math.random() * 1000 + 3000);
            setTimeout(() => {
                oneDayCardsCreated.value += data.oneDayCardsCreated;
            }, Math.random() * 1000 + 4000);
        } catch (error) {
            console.error('Error fetching users data:', error);
        }
    };

    setUsersData(); // Initial fetch

    let interval = setInterval(setUsersData, intervalTime);

    onUnmounted(() => {
        clearInterval(interval);
    });

    return {
        fiveSecondsActiveUsers: readonly(fiveSecondsActiveUsers),
        oneDayActiveUsers: readonly(oneDayActiveUsers),
        oneDayCardsCreated: readonly(oneDayCardsCreated),
    };
}
