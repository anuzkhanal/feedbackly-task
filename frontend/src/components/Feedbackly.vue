<template>
    <div class="main-container">
        <div class="title-container">Analytics Dashboard</div>
        <div class="middle-container">
        <NpsGroup />    
        <NpsScore />
        <EmoticonAvg />
      </div>
      
    </div>
</template>
<script lang="ts">

import { defineComponent } from 'vue'
import EmoticonAvg from './EmoticonAvg.vue';
import NpsGroup from './NpsGroup.vue';
import NpsScore from './NpsScore.vue';

export default defineComponent({
    

    components: { EmoticonAvg, NpsGroup, NpsScore }
})
</script>
