<template>
    <div class="nps-score-container">
            <h3>NPS Score</h3>
            <div class="data-container" v-if="!isLoaded">No data yet</div>
            <p v-if="isLoaded">{{currentData.score}}</p>
            
            <button
            ref="score"
            :loading="isLoading"
            :disabled="isLoaded" 
            @click="loadNpsScore();">
                <template v-if="isLoading">
                            Loading...
                    </template>
                    <template v-if="isLoaded">
                        Data loaded
                    </template>
                    <template v-if="!isLoading && !isLoaded">
                        Get NPS Score
                </template>
            </button>
        </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Feedbackly } from '../Interfaces/FeedbacklyInterfce';
import { getNpsScore } from '../Services/FeedbacklyServices';

export default defineComponent({
    data() {
        return {
            currentData: {} as Feedbackly,
            isLoading: false as boolean,
            isLoaded: false as boolean,
            indexClicked: 1 as number
        };
    },
    methods: {
        async loadNpsScore() {
            this.isLoading = true
            const res = await getNpsScore();
            const score = res.data.score;
            this.currentData.score = score.toFixed(2);
             this.isLoading = false
             this.isLoaded = true            
        },
    },
})
</script>