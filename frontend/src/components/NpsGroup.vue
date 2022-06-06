<template>
    <div class="nps-group-container">
                <h3>NPS Groups</h3>
                <div class="data-container" v-if="!isLoaded">No data yet</div>
                <div v-if="isLoaded">
                    <p>Promoters: {{currentData.promoters}}</p>
                    <p>Passives: {{currentData.passives}}</p>
                    <p>Detractors: {{currentData.detractors}}</p>
                </div>
                <button
                ref="group" 
                :loading="isLoading"
                :disabled="isLoaded"
                
                @click="loadNpsGroups();">
                    <template v-if="isLoading">
                        Loading...
                    </template>
                    <template v-if="isLoaded">
                        Data loaded
                    </template>
                    <template v-if="!isLoading && !isLoaded">
                            Get NPS Groups
                    </template>
                
                </button>
        </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { Feedbackly } from '../Interfaces/FeedbacklyInterfce';
import { getNpsGroups } from '../Services/FeedbacklyServices';

export default defineComponent({
    
    data() {
        return {
            currentData: {} as Feedbackly,
            isLoading: false as boolean,
            isLoaded: false as boolean,
        };
    },
    methods: {
        async loadNpsGroups() {
            this.isLoading = true
            const res = await getNpsGroups();
            const promoter = res.data.promoters;
            const detractor = res.data.detractors;
            const passive = res.data.passives;
            this.currentData.promoters = promoter;
            this.currentData.detractors = detractor;
            this.currentData.passives = passive;

            this.isLoading = false
            this.isLoaded = true
        },
    }
})
</script>