<template>
    <div class="emoticon-container">
            <h3>Emoticon Average</h3>
            <div class="data-container" v-if="!isLoaded">No data yet</div>
            <p v-if="isLoaded">{{currentData.average}}</p>
            <button
                ref="avg"
                :loading="isLoading"
                :disabled="isLoaded"
                @click="loadEmoticonAverage();"
                >
                <template v-if="isLoading">
                        Loading...
                </template>
                <template v-if="isLoaded">
                    Data loaded
                </template>
                <template v-if="!isLoading && !isLoaded">
                    Get Emoticon Average
                </template>
            </button>
        </div>

</template>

<script lang="ts">

    import { defineComponent } from 'vue'

import { Feedbackly } from '../Interfaces/FeedbacklyInterfce';
import { getEmoticonAverage } from '../Services/FeedbacklyServices';

export default defineComponent({
    data(){
        return {
            currentData: {} as Feedbackly,
            isLoading: false as boolean,
            isLoaded: false as boolean,
        }
    },
    methods: {
        async loadEmoticonAverage(){


            this.isLoading = true
            const res = await getEmoticonAverage()
            const average = res.data.average
            this.currentData.average = average.toFixed(2)

            this.isLoading = false
            this.isLoaded = true
        }
        
    }
})
</script>