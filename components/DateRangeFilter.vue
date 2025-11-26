<template>
  <view class="date-filter-block">
    <view class="f-section-title" v-if="title">{{ title }}</view>
    
    <view class="f-row">
      <view class="f-group half">
        <picker mode="date" :value="startDate" @change="onStartChange">
          <view class="f-picker date" :class="{ 'placeholder': !startDate }">
            {{ startDate ? formatDateDisplay(startDate) : 'Từ ngày' }}
          </view>
        </picker>
      </view>

      <view class="f-group half">
        <picker mode="date" :value="endDate" @change="onEndChange">
          <view class="f-picker date" :class="{ 'placeholder': !endDate }">
            {{ endDate ? formatDateDisplay(endDate) : 'Đến ngày' }}
          </view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script setup lang="ts">
import { formatDateDisplay } from '@/utils/dateUtils';

const props = defineProps<{
  title?: string;
  startDate: string;
  endDate: string;
}>();

const emit = defineEmits(['update:startDate', 'update:endDate']);

const onStartChange = (e: any) => {
  emit('update:startDate', e.detail.value);
};

const onEndChange = (e: any) => {
  emit('update:endDate', e.detail.value);
};
</script>

<style lang="scss" scoped>
.f-section-title {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 14px;
  color: #009688;
  border-top: 1px dashed #eee;
  padding-top: 15px;
}

.f-row {
  display: flex;
  justify-content: space-between;
}

.f-group {
  margin-bottom: 15px;
}

.half {
  width: 48%;
}

.f-picker {
  background-color: #f8f9fa;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  font-size: 14px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
}

.f-picker.placeholder {
  color: #999;
}
</style>