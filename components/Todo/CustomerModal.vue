//components/Todo/CustomerModal
<template>
	<view class="modal-overlay" v-if="visible" @click.stop="close">
		<view class="modal-content" @click.stop>

			<view class="modal-header">
                <text class="modal-title">{{ $t('customer_modal.title') }}</text>

				<view class="header-actions">
					<view class="filter-toggle-btn" :class="{ 'active': isFilterExpanded }" @click="toggleFilter">
						<image src="https://img.icons8.com/ios/50/666666/filter--v1.png" class="filter-icon-img" />
					</view>
					<text class="close-btn" @click="close">✕</text>
				</view>
			</view>

			<view class="filter-section" v-if="isFilterExpanded">
				<view class="f-item">
                    <input class="f-input" v-model="filter.name" :placeholder="$t('customer_modal.placeholder_name')"
						placeholder-class="ph-style" />
				</view>

				<view class="f-item">
					<input class="f-input" v-model="filter.phone" type="number" :placeholder="$t('customer_modal.placeholder_phone')"
						placeholder-class="ph-style" />
				</view>

				<view class="f-item">
					<picker mode="selector" :range="managerDisplayOptions" :value="filter.managerIndex"
						@change="onManagerChange">
						<view class="f-picker-box">
							<text :class="filter.managerIndex === 0 ? 'text-ph' : 'text-val'">
								{{ managerDisplayOptions[filter.managerIndex] }}
							</text>
							<text class="arrow">▼</text>
						</view>
					</picker>
				</view>

				<view class="f-item">
					<DateRangeFilter :startDate="filter.startDate" :endDate="filter.endDate"
						@update:startDate="(val) => filter.startDate = val"
						@update:endDate="(val) => filter.endDate = val" />
				</view>

				<view class="f-actions">
					<button class="btn-reset" @click="resetFilter">{{ $t('common.reset') }}</button>
					<button class="btn-submit" @click="applyFilter">{{ $t('common.filter') }}</button>
				</view>
			</view>

			<view v-if="loading" class="loading-state">{{ $t('common.loading') }}</view>
			<scroll-view scroll-y class="customer-list" v-else @scrolltolower="onScrollToLower" lower-threshold="50">
				<view v-for="(item, index) in customers" :key="item.id" class="customer-item"
					@click="selectCustomer(item)">
					<UserAvatar :name="item.name" :size="40" class="mr-3" />
					<view class="info-column">
						<text class="name-text">{{ item.name || $t('customer_modal.no_name') }}</text>
						<text class="phone-text">{{ item.phone || $t('customer_modal.no_phone') }}</text>
					</view>
					<view class="date-column">
						<text class="date-text">{{ formatDate(item.createAt) }}</text>
					</view>
				</view>
				<view v-if="loadingMore" class="loading-more-container">
					<text class="loading-more-text">{{ $t('customer_modal.loading_more') }}</text>
				</view>
				<view v-if="customers.length === 0" class="empty-state">{{ $t('common.no_data') }}</view>
			</scroll-view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { reactive, ref, computed } from 'vue';
	import UserAvatar from '@/components/UserAvatar.vue';
	import DateRangeFilter from '@/components/DateRangeFilter.vue';
	import type { ProjectMember } from '@/types/Project';
	import { useI18n } from 'vue-i18n';
	const { t } = useI18n();
	interface CustomerDisplay {
		id : number;
		name : string;
		phone : string;
		createAt : number;
		uid : string;
	}

	const props = defineProps<{
		visible : boolean;
		customers : CustomerDisplay[];
		loading : boolean;
		managers : ProjectMember[];
		loadingMore ?: boolean;
	}>();

	const emit = defineEmits(['close', 'select', 'filter', 'loadMore']);

	const isFilterExpanded = ref(false);

	const filter = reactive({
		name: '',
		phone: '',
		managerIndex: 0,
		selectedMemberUID: '',
		startDate: '',
		endDate: ''
	});
	const onScrollToLower = () => {
		console.log('Cuộn xuống đáy -> Load more');
		emit('loadMore');
	};
	const managerDisplayOptions = computed(() => {
			const defaultOption = t('customer_modal.manager_default');
			const list = props.managers || [];
			const memberNames = list.map(m => m.UserName || 'Thành viên ẩn danh');
			return [defaultOption, ...memberNames];
		});

	const toggleFilter = () => {
		isFilterExpanded.value = !isFilterExpanded.value;
	};

	const onManagerChange = (e : any) => {
		const index = parseInt(e.detail.value);
		filter.managerIndex = index;

		if (index === 0) {
			filter.selectedMemberUID = '';
		} else {
			const selectedMember = props.managers[index - 1];
			if (selectedMember) {
				filter.selectedMemberUID = selectedMember.memberUID;
			}
		}
	};

	const resetFilter = () => {
		filter.name = '';
		filter.phone = '';
		filter.managerIndex = 0;
		filter.selectedMemberUID = '';
		filter.startDate = '';
		filter.endDate = '';
		applyFilter();

		console.log('Đã đặt lại bộ lọc');
	};

	const applyFilter = () => {
		emit('filter', {
			name: filter.name,
			phone: filter.phone,
			managerUID: filter.selectedMemberUID,
			startDate: filter.startDate,
			endDate: filter.endDate
		});
		isFilterExpanded.value = false;
	};

	const close = () => {
		emit('close');
	};

	const selectCustomer = (item : CustomerDisplay) => {
		emit('select', item);
		close();
	};

	const formatDate = (timestamp : number) => {
		if (!timestamp) return '';
		const date = new Date(timestamp);
		return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
	};
</script>

<style lang="scss" scoped>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		width: 90%;
		height: 80vh;
		background-color: #fff;
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.modal-header {
		padding: 15px;
		border-bottom: 1px solid #f0f0f0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background-color: #fff;
	}

	.modal-title {
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 15px;
	}

	.filter-toggle-btn {
		width: 32px;
		height: 32px;
		border-radius: 4px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #f5f5f5;
		transition: all 0.2s;
	}

	.filter-toggle-btn.active {
		background-color: #e0f2f1;
		border: 1px solid #009688;
	}

	.filter-icon-img {
		width: 20px;
		height: 20px;
		opacity: 0.7;
	}

	.close-btn {
		font-size: 20px;
		padding: 5px;
		color: #999;
	}

	.filter-section {
		padding: 15px;
		background-color: #fff;
		border-bottom: 1px solid #eee;
		flex-shrink: 0;
		animation: slideDown 0.3s ease-out;
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-10px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.f-item {
		margin-bottom: 10px;
	}

	.f-input,
	.f-picker-box {
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

	.text-ph {
		color: #999;
	}

	.text-val {
		color: #333;
	}

	.arrow {
		font-size: 10px;
		color: #999;
	}

	.f-actions {
		display: flex;
		gap: 10px;
		margin-top: 5px;
	}

	.btn-reset,
	.btn-submit {
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

	.customer-list {
		flex: 1;
		height: 1px;
	}

	.loading-state,
	.empty-state {
		text-align: center;
		padding: 30px;
		color: #888;
		font-size: 14px;
	}

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

	.loading-more-container {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading-more-text {
		font-size: 12px;
		color: #999;
	}
</style>