<template>
    <view class="modal-overlay" v-if="visible" @click.stop="close">
        <view class="modal-content" @click.stop>
            
            <view class="modal-header">
                <text class="modal-title">Chọn khách hàng</text>
                <text class="close-btn" @click="close">✕</text>
            </view>

            <view class="filter-section">
                <view class="f-item">
                    <input 
                        class="f-input" 
                        v-model="filter.name" 
                        placeholder="Nhập tên khách hàng" 
                        placeholder-class="ph-style"
                    />
                </view>

                <view class="f-item">
                    <input 
                        class="f-input" 
                        v-model="filter.phone" 
                        type="number" 
                        placeholder="Nhập số điện thoại" 
                        placeholder-class="ph-style"
                    />
                </view>

                <view class="f-item">
                    <picker mode="selector" :range="managerOptions" :value="filter.managerIndex" @change="onManagerChange">
                        <view class="f-picker-box">
                            <text :class="filter.managerIndex === 0 ? 'text-ph' : 'text-val'">
                                {{ managerOptions[filter.managerIndex] }}
                            </text>
                            <text class="arrow">▼</text>
                        </view>
                    </picker>
                </view>

                <view class="f-item">
                    <DateRangeFilter 
                        :startDate="filter.startDate"
                        :endDate="filter.endDate"
                        @update:startDate="(val) => filter.startDate = val"
                        @update:endDate="(val) => filter.endDate = val"
                    />
                </view>

                <view class="f-actions">
                    <button class="btn-reset" @click="resetFilter">Đặt lại</button>
                    <button class="btn-submit" @click="applyFilter">Lọc</button>
                </view>
            </view>
            <view v-if="loading" class="loading-state">Đang tải dữ liệu...</view>

            <scroll-view scroll-y class="customer-list" v-else>
                <view 
                    v-for="(item, index) in customers" 
                    :key="item.id" 
                    class="customer-item"
                    @click="selectCustomer(item)"
                >
                    <UserAvatar 
                        :name="item.name" 
                        :size="40"
                        class="mr-3" 
                    />

                    <view class="info-column">
                        <text class="name-text">{{ item.name || '(Không tên)' }}</text>
                        <text class="phone-text">{{ item.phone || 'Không có SĐT' }}</text>
                    </view>

                    <view class="date-column">
                        <text class="date-text">{{ formatDate(item.createAt) }}</text>
                    </view>
                </view>

                <view v-if="customers.length === 0" class="empty-state">Không có dữ liệu</view>
            </scroll-view>

        </view>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';
import DateRangeFilter from '@/components/DateRangeFilter.vue'; 

interface CustomerDisplay {
    id: number;
    name: string;
    phone: string;
    createAt: number;
    uid: string;
}

const props = defineProps<{
    visible: boolean;
    customers: CustomerDisplay[];
    loading: boolean;
}>();

const emit = defineEmits(['close', 'select']);

const filter = reactive({
    name: '',
    phone: '',
    managerIndex: 0,
    startDate: '',
    endDate: ''
});

const managerOptions = ref(['Thành viên quản lý', 'Nguyễn Văn A', 'Trần Thị B']);

const onManagerChange = (e: any) => {
    filter.managerIndex = e.detail.value;
};

const resetFilter = () => {
    filter.name = '';
    filter.phone = '';
    filter.managerIndex = 0;
    filter.startDate = '';
    filter.endDate = '';
    console.log('Đã đặt lại bộ lọc');
};

const applyFilter = () => {
    console.log('Thực hiện lọc với:', filter);
};

const close = () => {
    emit('close');
};

const selectCustomer = (item: CustomerDisplay) => {
    emit('select', item);
    close();
};

const formatDate = (timestamp: number) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};
</script>

<style lang="scss" scoped>
.modal-overlay {
    position: fixed; top: 0; left: 0; right: 0; bottom: 0;
    background-color: rgba(0,0,0,0.5); z-index: 999;
    display: flex; justify-content: center; align-items: center;
}
.modal-content {
    width: 90%; height: 80vh; 
    background-color: #fff;
    border-radius: 12px; display: flex; flex-direction: column; overflow: hidden;
}
.modal-header {
    padding: 15px; border-bottom: 1px solid #f0f0f0; 
    display: flex; justify-content: space-between; align-items: center;
    background-color: #fff;
}
.modal-title { font-weight: bold; font-size: 16px; color: #333; }
.close-btn { font-size: 20px; padding: 5px; color: #999; }


.filter-section {
    padding: 15px;
    background-color: #fff;
    border-bottom: 1px solid #eee;
    flex-shrink: 0; 
}
.f-item {
    margin-bottom: 10px;
}
.f-input, .f-picker-box {
    background-color: #f8f9fa;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 12px;
    font-size: 14px;
    height: 40px;
    display: flex;
    align-items: center;
    width: 100%;
    box-sizing: border-box;
}
.f-picker-box {
    justify-content: space-between;
}
.text-ph { color: #999; } 
.text-val { color: #333; } 
.arrow { font-size: 10px; color: #999; }

.f-actions {
    display: flex;
    gap: 10px;
    margin-top: 5px;
}
.btn-reset, .btn-submit {
    flex: 1;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    border-radius: 20px;
    border: none;
}
.btn-reset {
    background-color: #f5f5f5;
    color: #666;
}
.btn-submit {
    background-color: #009688;
    color: #fff;
}


.customer-list { flex: 1; height: 1px; }
.loading-state, .empty-state { text-align: center; padding: 30px; color: #888; font-size: 14px; }

.customer-item {
    display: flex;
    align-items: center;
    padding: 12px 15px;
    border-bottom: 1px solid #f5f5f7;
    background-color: #fff;
}
.customer-item:active {
    background-color: #f9f9f9;
}

.mr-3 {
    margin-right: 12px;
}
.info-column {
    flex: 1; 
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
}
.name-text {
    font-size: 15px;
    font-weight: 600;
    color: #333;
    margin-bottom: 3px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.phone-text {
    font-size: 13px;
    color: #666;
}

.date-column {
    margin-left: 10px;
    flex-shrink: 0;
}
.date-text {
    font-size: 12px;
    color: #999;
}
</style>