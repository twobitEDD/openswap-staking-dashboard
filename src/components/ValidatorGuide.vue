<script setup lang="ts">


</script>

<template>
    <div class="flex flex-1 flex-col space-y-2">
        <span class="font-bold">Notes</span>
        <div
            class="flex flex-none flex-col text-oswapBlue dark:text-oswapGreen-dark font-semibold text-sm space-y-1"
        >
            <div class="flex flex-none">
                Status: If the validator has the status of not elected you
                wont receive rewards
            </div>
            <div class="flex flex-none">
                Commission: Is the percentage
                of the amount of rewards taken by the validator as a fee (only affects the rewards).
            </div>
            <div class="flex flex-none">
                Expected Return: If the percentage is higher than ~13% look closely if its elected and what are the chances it keeps being elected over time,
                usually not elected validators get a huge boost in apr when they get elected for the first time.
            </div>
            <div
                class="flex flex-none"
            >Stake: It usually takes around ~5m ONEs to be elected consistently.</div>
        </div>
    </div>
</template>