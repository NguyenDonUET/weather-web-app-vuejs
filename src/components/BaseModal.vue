<template>
  <Transition name="modal-outer">
    <div
      v-show="modalActive"
      @click.self="$emit('close-modal')"
      class="absolute w-full h-screen top-0 left-0 flex justify-center bg-black bg-opacity-30 px-8"
    >
      <Transition name="modal-inner">
        <div
          v-if="modalActive"
          class="p-4 bg-white self-start mt-32 max-w-screen-md rounded-md"
        >
          <slot />
          <button
            class="text-white mt-8 bg-weather-primary py-2 px-6 rounded-md hover:opacity-80"
            @click="$emit('close-modal')"
          >
            Close
          </button>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

const emit = defineEmits(["close-modal"]);

defineProps({
  modalActive: {
    type: Boolean,
    default: true,
  },
});

const handlePressEsc = (e) => {
  if (e.key === "Escape") {
    emit("close-modal");
  }
};

//  press ESC to close the modal
onMounted(() => {
  document.addEventListener("keydown", handlePressEsc);
});

onUnmounted(() => {
  document.removeEventListener("keydown", handlePressEsc);
});
</script>

<style scoped>
.modal-outer-enter-active,
.modal-outer-leave-active {
  transition: opacity 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-outer-enter-from,
.modal-outer-leave-to {
  opacity: 0;
}

.modal-inner-enter-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02) 0.15s;
}

.modal-inner-leave-active {
  transition: all 0.3s cubic-bezier(0.52, 0.02, 0.19, 1.02);
}

.modal-inner-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.modal-inner-leave-to {
  transform: scale(0.8);
}
</style>
