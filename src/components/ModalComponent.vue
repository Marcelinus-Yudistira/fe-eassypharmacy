<template>
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog modal-dialog-centered" style="max-width: 600px;">
            <div class="modal-content" >
                <div class="modal-header">
                    <h1 class="modal-title fs-5" :id="modalLabel">{{ title }}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <!-- {{ content }} -->
                    <slot></slot>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" :class="isWeb ? '' : 'mobile-btn'" data-bs-dismiss="modal" @click="handleCancel">{{ cancelButtonText }}</button>
                    <div v-if="isDisabled">
                      <button type="button" class="btn btn-primary is-disabled" :class="isWeb ? '' : 'mobile-btn'">{{ approveButtonText }}</button>
                    </div>
                    <div v-else>
                      <button v-if="!isLoading" type="button" class="btn btn-primary" :class="isWeb ? '' : 'mobile-btn'" data-bs-dismiss="modal" @click="handleFunction">{{ approveButtonText }}</button>
                      <button v-else class="btn btn-primary w-100" :class="isWeb ? '' : 'mobile-btn'" type="button" disabled>
                          <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                          <span role="status"> {{ approveButtonText }}...</span>
                      </button>
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  modalId: {
    type: String,
  },
  modalLabel: {
    type: String,
  },
  cancelButtonText: {
    type: String,
    default: 'Batal'
  },
  approveButtonText: {
    type: String,
    default: 'Ya'
  },
  functionHandler: {
    type: Function
  },
  cancelHandler: {
    type: Function
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  isDisabled: {
    type: Boolean,
    default: false
  }
});

const handleFunction = () => {
    props.functionHandler();
};

const handleCancel = () => {
  if(props.cancelHandler){
    props.cancelHandler();
  }
};

const width = ref(window.innerWidth);
const isWeb = ref(window.innerWidth > 767 ? true : false)

window.addEventListener('resize', () => {
    width.value = window.innerWidth;
    isWeb.value = window.innerWidth > 767 ? true : false
});
</script>