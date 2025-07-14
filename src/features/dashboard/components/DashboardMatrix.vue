<script setup>
import { onMounted } from 'vue';
const props = defineProps({
    tableData: {
        type: Array,
        default: () => [],
    },
});
</script>

<template>
    <div class="w-full max-w-[90vw] overflow-auto p-6 bg-white shadow-md rounded-lg mt-12">
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
                <tr>
                    <th
                        v-for="(header, index) in tableData[0] || {}"
                        :key="index"
                        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                        {{ header }}
                    </th>
                </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(row, rowIndex) in tableData.slice(1)" :key="rowIndex">
                    <td
                        v-for="(value, colIndex) in Object.values(row)"
                        :key="colIndex"
                        class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                        :class="{
                            'font-bold': colIndex === 0, // Make the first column bold
                        }"
                    >
                        {{ value }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped></style>
