<script setup lang="ts">import { useWalletStore } from '@/stores/wallet';
import ValidatorLogo from '@/components/ValidatorLogo.vue'
import { storeToRefs } from 'pinia';
import numeral from 'numeral'
import Address from '@/components/Address.vue'
import Allocation from '@/components/Allocation.vue';
import { useGlobalStore } from '@/stores/global';
const walletStore = useWalletStore()
const { availableBalance, userAddress, getTotalStaked, getTotalRewards, getPendingUndelegated } = storeToRefs(useWalletStore())
const { onePrice } = storeToRefs(useGlobalStore())
interface Profile {
    showDetailButton?: boolean;
}
const { showDetailButton } = withDefaults(defineProps<Profile>(), {
    showDetailButton: false
})
</script>

<template>
    <div
        class="flex flex-1 p-4 justify-center items-center flex-col space-y-1 rounded-lg bg-gradient-to-r from-gray-300 to-slightGray dark:from-oswapDark-gray dark:to-slightDark shadow-lg relative">
        <div class="absolute top-4 right-4">
            <button @click="walletStore.loadDelegations(); walletStore.loadOneBalance()">
                <i class="las la-sync text-oswapGreen-light text-lg"></i>
            </button>
        </div>
        <div v-if="userAddress"
            class="flex flex-none p-3 rounded-full justify-center items-center shadow-light-level dark:shadow-dark-level">
            <ValidatorLogo :pixeles="28" :address="userAddress" :has-logo="false" />
        </div>
        <div v-if="userAddress" class="flex flex-none">
            <Address :address="userAddress" />
        </div>
        <div class="flex flex-1 flex-wrap justify-center items-center">
            <div class="flex flex-none rounded-full p-1 shadow-light-depth dark:shadow-dark-depth m-1">
                <div
                    class="flex flex-col space-y-2 flex-none rounded-full shadow-light-level dark:shadow-dark-level p-3">
                    <div
                        class="flex flex-col space-y-2 rounded-full shadow-light-depth dark:shadow-dark-depth h-32 w-32 justify-center items-center">
                        <div
                            class="flex flex-none flex-col items-center justify-center text-oswapBlue-dark font-medium">
                            <span class="text-xs dark:text-white text-black">Staked</span>
                            <span class="pt-1">{{ numeral(getTotalStaked).format('0[.]00') }}</span>
                            <span v-if="onePrice !== '0'">{{
                                numeral(parseFloat(getTotalStaked) *
                                    parseFloat(onePrice)).format('$0[.]00')
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="getPendingUndelegated !== '0.0'"
                class="flex flex-none rounded-full p-1 shadow-light-depth dark:shadow-dark-depth m-1">
                <div
                    class="flex flex-col space-y-2 flex-none rounded-full shadow-light-level dark:shadow-dark-level p-3">
                    <div
                        class="flex flex-col space-y-2 rounded-full shadow-light-depth dark:shadow-dark-depth h-32 w-32 justify-center items-center">
                        <div
                            class="flex flex-none flex-col items-center justify-center text-oswapBlue-dark font-medium">
                            <span class="text-xs dark:text-white text-black">Undelegated</span>
                            <span class="pt-1">{{ numeral(getPendingUndelegated).format('0[.]00') }}</span>
                            <span v-if="onePrice !== '0'">{{
                                numeral(parseFloat(getPendingUndelegated) *
                                    parseFloat(onePrice)).format('$0[.]00')
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-none rounded-full p-1 shadow-light-depth dark:shadow-dark-depth m-1">
                <div
                    class="flex flex-col space-y-2 flex-none rounded-full shadow-light-level dark:shadow-dark-level p-3">
                    <div
                        class="flex flex-col space-y-2 rounded-full shadow-light-depth dark:shadow-dark-depth h-32 w-32 justify-center items-center">
                        <div
                            class="flex flex-none flex-col items-center justify-center text-oswapGreen-dark font-medium">
                            <span class="text-xs dark:text-white text-black">Rewards</span>
                            <span class="pt-1">{{ numeral(getTotalRewards).format('0[.]00') }}</span>
                            <span v-if="onePrice !== '0'">{{
                                numeral(parseFloat(getTotalRewards) *
                                    parseFloat(onePrice)).format('$0[.]00')
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-none rounded-full p-1 shadow-light-depth dark:shadow-dark-depth m-1">
                <div
                    class="flex flex-col space-y-2 flex-none rounded-full shadow-light-level dark:shadow-dark-level p-3">
                    <div
                        class="flex flex-col space-y-2 rounded-full shadow-light-depth dark:shadow-dark-depth h-32 w-32 justify-center items-center">
                        <div
                            class="flex flex-none flex-col items-center justify-center text-oswapGreen-light font-medium">
                            <span class="text-xs dark:text-white text-black">Available</span>
                            <span class="pt-1">{{ numeral(availableBalance).format('0[.]00') }}</span>
                            <span v-if="onePrice !== '0'">{{
                                numeral(parseFloat(availableBalance) *
                                    parseFloat(onePrice)).format('$0[.]00')
                            }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-none">
            <Allocation />
        </div>
        <div class="flex flex-none flex-wrap justify-center text-slightGray pt-2">
            <div v-if="showDetailButton" class="flex flex-none p-2">
                <router-link :to="'/portfolio/'">
                    <button
                        class="rounded-md bg-slightGray text-slightDark dark:text-white dark:bg-slightDark px-4 py-2">See
                        Details</button>
                </router-link>
            </div>
            <div class="flex flex-none p-2">
                <button class="rounded-md bg-oswapBlue-light px-4 py-2">Unstake</button>
            </div>
            <div class="flex flex-none p-2">
                <button class="rounded-md bg-oswapGreen-dark px-4 py-2">Claim Rewards</button>
            </div>
        </div>
    </div>
</template>