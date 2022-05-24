
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useWalletStore } from '@/stores/wallet';
import numeral from 'numeral'
import { useGlobalStore } from '@/stores/global';
import { computed, Ref, ref } from '@vue/reactivity';
const { getUsedDelegations, getTotalStaked } = storeToRefs(useWalletStore())
const { theme } = storeToRefs(useGlobalStore())

const colors = [
    '#DDFDF5',
    '#D1FCF1',
    '#BBFBEA',
    '#AFFAE7',
    '#A4FAE3',
    '#98F9E0',
    '#8DF9DD',
    '#26F3BD',
    '#49F5C8',
    '#54F5CB',
    '#76F7D6',
    '#0F8566',
    '#129D79',
    '#16C295',
    '#18DAA7',
    '#04241C',
    '#084938',
    '#0B614A',
    '#0E795D',
    '#C3E7EE',
    '#93D3E0',
    '#70C4D6',
    '#58BACF',
    '#34ACC5',
    '#1CA2BE',
    '#0E859F',
    '#0A667A',
    '#095667',
    '#063F4B',
    '#04272F',
    '#021013',
    '#36BFC4',
    '#42C3C8',
    '#0C7579',
    '#08484A',
    '#D0F0F1',
]
let used: Ref<string[]> = ref([])

const sections = computed(() => {
    used.value = []
    const mapped = getUsedDelegations.value.map((delegation) => {
        return { label: delegation.validator_info.name, address: delegation.validator_address, value: ((delegation.amount / (10 ** 18)) / parseFloat(getTotalStaked.value)) * 100, color: randomColorIndex() }
    })
    return mapped
})
function randomColorIndex() {
    const randomColor = colors.filter((element) => !used.value.includes(element))[Math.floor(Math.random() * colors.length)]
    return randomColor
}
</script>

<template>
    <div class="flex flex-1 flex-col justify-center items-center" v-if="getUsedDelegations.length > 0">
        <div class="flex flex-none">
            <div class="flex flex-none rounded-full p-2 shadow-light-depth dark:shadow-dark-depth ">
                <vc-donut :background="theme === 'dark' ? '#313547' : '#edeff2'" :size="130" unit="px" :thickness="25"
                    :sections="sections" :start-angle="0" :auto-adjust-text-size="true">
                    <span class="text-xs dark:text-white text-black">Allocation</span>
                </vc-donut>
            </div>
        </div>
        <div class="flex flex-none  flex-wrap justify-center items-center">
            <template v-for="section of sections">
                <div class="flex flex-none space-x-1 m-1">
                    <div :style="`background-color:${section.color}`" class="w-6 h-6"></div>
                    <span>
                        <router-link :to="`/validators/${section.address}`">{{ section.label }}</router-link>
                        ({{ numeral(section.value / 100).format('%0') }})
                    </span>
                </div>
            </template>
        </div>
    </div>
</template>

