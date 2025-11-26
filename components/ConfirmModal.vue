<template>
  <view class="modal-overlay" v-if="visible" @click="onCancel">
    <view class="modal-container" @click.stop>
      <view class="modal-header">
        <text class="modal-title">{{ title }}</text>
      </view>
      <view class="modal-body">
        <slot>
          <text>{{ message }}</text>
        </slot>
      </view>
      <view class="modal-footer">
        <AppButton 
          type="secondary" 
          :label="cancelLabel" 
          class="flex-1" 
          @click="onCancel" 
        />
        <AppButton 
          :type="confirmType" 
          :label="confirmLabel" 
          class="flex-1" 
          @click="onConfirm" 
        />
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import AppButton from '@/components/AppButton.vue';

interface Props {
  visible: boolean;
  title?: string;
  message?: string;
  cancelLabel?: string;
  confirmLabel?: string;
  confirmType?: 'primary' | 'danger';
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Thông báo',
  message: '',
  cancelLabel: 'Hủy',
  confirmLabel: 'Xác nhận',
  confirmType: 'primary'
});

const emit = defineEmits(['update:visible', 'confirm', 'cancel']);

const onCancel = () => {
  emit('update:visible', false);
  emit('cancel');
};

const onConfirm = () => {
  emit('confirm');
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    display: flex; align-items: center; justify-content: center;
}
.modal-container {
    width: 80%; background-color: #fff;
    border-radius: 12px; overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    animation: popIn 0.2s ease-out;
}
@keyframes popIn {
    from { transform: scale(0.9); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
}
.modal-header {
    padding: 15px; border-bottom: 1px solid #eee; text-align: center;
}
.modal-title {
    font-size: 18px; font-weight: bold; color: #333;
}
.modal-body {
    padding: 20px 15px; text-align: center; font-size: 15px; color: #555; line-height: 1.5;
}
.modal-footer {
    display: flex; border-top: 1px solid #eee; padding: 15px; gap: 10px;
}
.flex-1 { flex: 1; }
</style>