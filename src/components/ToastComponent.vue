<template>
    <div class="toast-container">
        <div :id="idToast" class="toast align-items-center bottom-0 start-50 translate-middle-x mb-3"
         role="alert" aria-live="assertive" aria-atomic="true" :class="status ? 'text-bg-success' : 'text-bg-danger'">
            <div class="d-flex">
                <div class="toast-body">
                    {{ messages }}
                </div>
                <button type="button" class="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  messages: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  idToast: {
    type: String,
    default: 'liveToast'
  }
});
</script>