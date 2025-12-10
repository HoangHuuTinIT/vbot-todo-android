<template>
    <view class="flat-item date-compound-block">
        <view class="item-left icon-top-aligned">
            <image src="https://img.icons8.com/ios/50/666666/clock--v1.png" class="item-icon"></image>
        </view>
        <view class="right-column">
            
            <view class="date-row">
                <uni-datetime-picker 
                    type="datetime" 
                    :value="dueDate" 
                    :hide-second="true"
                    :border="false"
                    @change="onDueDateChange"
                    class="full-width-picker"
                >
                    <view class="item-picker" :class="{ 'placeholder-color': !dueDate }">
                        <text class="picker-label">{{ $t('todo.due_date_label') }}</text> 
                        {{ dueDate ? formatDateTimeDisplay(dueDate) : $t('todo.select_date') }}
                    </view>
                </uni-datetime-picker>
            </view>

            <view class="inner-divider"></view>

            <view class="date-row">
                <uni-datetime-picker 
                    type="datetime" 
                    :value="notifyAt" 
                    :hide-second="true"
                    :border="false"
                    @change="onNotifyDateChange"
                    class="full-width-picker"
                >
                    <view class="item-picker" :class="{ 'placeholder-color': !notifyAt }">
                        <text class="picker-label">{{ $t('todo.notify_date_label') }}</text> 
                        {{ notifyAt ? formatDateTimeDisplay(notifyAt) : $t('todo.select_date') }}
                    </view>
                </uni-datetime-picker>
            </view>

        </view>
    </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { useI18n } from 'vue-i18n';

interface DatePickerProps {
    dueDate: string; 
    notifyAt: string; 
}

const props = defineProps<DatePickerProps>();
const emit = defineEmits(['update:dueDate', 'update:notifyAt', 'change']);
const { t } = useI18n();

const onDueDateChange = (val: string) => {
    emit('update:dueDate', val);
    emit('change', { field: 'dueDate', value: val });
};

const onNotifyDateChange = (val: string) => {
    emit('update:notifyAt', val);
    emit('change', { field: 'notifyAt', value: val });
};


const formatDateTimeDisplay = (isoStr: string) => {
    if (!isoStr) return '';
    try {
        const dateObj = new Date(isoStr.replace(/-/g, '/')); 
        if (isNaN(dateObj.getTime())) return isoStr;

        const d = dateObj.getDate().toString().padStart(2, '0');
        const m = (dateObj.getMonth() + 1).toString().padStart(2, '0');
        const y = dateObj.getFullYear();
        const h = dateObj.getHours().toString().padStart(2, '0');
        const min = dateObj.getMinutes().toString().padStart(2, '0');

        return `${d}/${m}/${y} ${h}:${min}`;
    } catch (e) { return isoStr; }
};
</script>

<style lang="scss" scoped>
    .flat-item { background-color: #fff; margin-bottom: 12px; padding: 15px; display: flex; align-items: center; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
    .item-left { display: flex; align-items: center; margin-right: 15px; }
    .item-icon { width: 22px; height: 22px; opacity: 0.6; }
    .icon-top-aligned { align-self: flex-start; margin-top: 6px; } 
    
    .date-compound-block { align-items: flex-start; } 
    .right-column { flex: 1; display: flex; flex-direction: column; }
    
    .date-row { width: 100%; min-height: 30px; display: flex; align-items: center; } 
    .full-width-picker { width: 100%; }
    
  
    .item-picker { 
        text-align: left; 
        font-size: 15px; 
        color: #333; 
        width: 100%; 
        display: flex; 
        align-items: center; 
        padding: 5px 0;
    } 
    .placeholder-color { color: #808080; }
    .picker-label { font-weight: bold; color: #666; margin-right: 10px; font-size: 14px; white-space: nowrap; }
    
    .inner-divider { height: 1px; background-color: #f0f0f0; margin: 10px 0; width: 100%; }
</style>