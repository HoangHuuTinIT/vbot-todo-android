<template>
	<view class="modal-overlay" v-if="visible" @click.stop="close">
		<view class="modal-content" @click.stop>

			<view class="modal-header">
				<text class="modal-title">{{ $t('customer_modal.title') }}</text>

				<view class="header-actions">
					<view class="filter-toggle-btn" :class="{ 'active': isFilterExpanded }" @click="toggleFilter">
						<image src="/static/filter.png" class="filter-icon-img" />
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
					<input class="f-input" v-model="filter.phone" type="number"
						:placeholder="$t('customer_modal.placeholder_phone')" placeholder-class="ph-style" />
				</view>

				<view class="f-item">
					<AppPicker :range="managerDisplayOptions" :value="filter.managerIndex" @change="onManagerChange"
						:title="$t('customer_modal.manager_default')">
						<view class="f-picker-box">
							<text :class="filter.managerIndex === 0 ? 'text-ph' : 'text-val'">
								{{ managerDisplayOptions[filter.managerIndex] }}
							</text>
							<text class="arrow">▼</text>
						</view>
					</AppPicker>
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
	// Logic giữ nguyên như cũ
	import { reactive, ref, computed } from 'vue';
	import UserAvatar from '@/components/UserAvatar.vue';
	import DateRangeFilter from '@/components/DateRangeFilter.vue';
	import type { ProjectMember } from '@/types/Project';
	import AppPicker from '@/components/AppPicker.vue';
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
		emit('loadMore');
	};
	const managerDisplayOptions = computed(() => {
		const defaultOption = t('customer_modal.manager_default');
		const list = props.managers || [];
		const memberNames = list.map(m => m.UserName || t('common.unknown_member'));
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
	/* Chú ý: Dùng CSS Variables từ theme.scss */

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* Giữ màu overlay tối mờ, không đổi theo theme */
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-content {
		width: 90%;
		height: 80vh;
		/* Thay #fff */
		background-color: var(--bg-surface);
		border-radius: 12px;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.modal-header {
		padding: 15px;
		/* Thay border và bg */
		border-bottom: 1px solid var(--border-color);
		background-color: var(--bg-surface);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-title {
		font-weight: bold;
		font-size: 16px;
		/* Thay #333 */
		color: var(--text-primary);
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
		/* Thay #f5f5f5 */
		background-color: var(--bg-input);
		transition: all 0.2s;
	}

	.filter-toggle-btn.active {
		/* Khi active, vẫn giữ màu xanh brand, nhưng dùng rgba để nó không quá chói trên nền đen */
		background-color: rgba(0, 150, 136, 0.15);
		border: 1px solid #009688;
	}

	.filter-icon-img {
		width: 20px;
		height: 20px;
		opacity: 0.7;
		/* QUAN TRỌNG: Đảo màu icon đen -> trắng khi ở Dark Mode */
		filter: var(--icon-filter);
	}

	.close-btn {
		font-size: 20px;
		padding: 5px;
		/* Thay #999 */
		color: var(--text-secondary);
	}

	.filter-section {
		padding: 15px;
		/* Thay bg và border */
		background-color: var(--bg-surface);
		border-bottom: 1px solid var(--border-color);
		flex-shrink: 0;
	}

	.f-item {
		margin-bottom: 10px;
	}

	.f-input,
	.f-picker-box {
		/* Thay bg, border */
		background-color: var(--bg-input);
		border: 1px solid var(--border-input);
		border-radius: 8px;
		padding: 0 12px;
		font-size: 14px;
		height: 40px;
		display: flex;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		/* Màu chữ khi nhập */
		color: var(--text-primary);
	}

	/* Override màu placeholder style (cần dùng deep selector hoặc global class) */
	:deep(.ph-style) {
		color: var(--text-hint) !important;
	}

	.f-picker-box {
		justify-content: space-between;
	}

	.text-ph {
		/* Thay #999 */
		color: var(--text-hint);
	}

	.text-val {
		/* Thay #333 */
		color: var(--text-primary);
	}

	.arrow {
		font-size: 10px;
		/* Thay #999 */
		color: var(--text-hint);
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
		/* Thay bg và text */
		background-color: var(--bg-input);
		color: var(--text-secondary);
	}

	.btn-submit {
		/* Giữ màu Brand, vì nút submit thường cần nổi bật */
		background-color: #009688;
		color: #fff;
	}

	.customer-list {
		flex: 1;
		height: 1px;
		/* Đảm bảo nền list đúng màu */
		background-color: var(--bg-surface);
	}

	.loading-state,
	.empty-state {
		text-align: center;
		padding: 30px;
		/* Thay #888 */
		color: var(--text-hint);
		font-size: 14px;
	}

	.customer-item {
		display: flex;
		align-items: center;
		padding: 12px 15px;
		/* Thay border và bg */
		border-bottom: 1px solid var(--border-color);
		background-color: var(--bg-surface);
	}

	.customer-item:active {
		/* Thay màu khi nhấn giữ */
		background-color: var(--bg-input);
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
		/* Thay #333 */
		color: var(--text-primary);
		margin-bottom: 3px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.phone-text {
		font-size: 13px;
		/* Thay #666 */
		color: var(--text-secondary);
	}

	.date-column {
		margin-left: 10px;
		flex-shrink: 0;
	}

	.date-text {
		font-size: 12px;
		/* Thay #999 */
		color: var(--text-hint);
	}

	.loading-more-container {
		padding: 10px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.loading-more-text {
		font-size: 12px;
		/* Thay #999 */
		color: var(--text-hint);
	}
</style>