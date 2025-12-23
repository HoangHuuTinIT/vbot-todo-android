<template>
	<view class="pagination-footer">
		<AppPicker :range="pageSizeStringOptions" :value="pageSizeIndex" @change="onPageSizeChange"
			:title="$t('common.page_unit')">
			<view class="page-size-selector">
				<text class="size-text">{{ pageSize }} / {{ $t('common.page_unit') }}</text>
				<text class="dropdown-arrow">▼</text>
			</view>
		</AppPicker>

		<text class="total-text" v-if="showTotal">{{ $t('common.total') }}: {{ total }}</text>

		<view class="pagination-controls">
			<view class="page-arrow" :class="{ 'disabled': pageNo <= 1 }" @click="onPrev">‹</view>
			<view class="page-box active">{{ pageNo }}</view>
			<view class="page-arrow" :class="{ 'disabled': pageNo >= totalPages }" @click="onNext">›</view>
		</view>

		<view class="add-btn-wrapper" v-if="$slots.action">
			<slot name="action"></slot>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import AppPicker from '@/components/AppPicker.vue';

	const props = defineProps<{
		pageNo : number;
		pageSize : number;
		total : number;
		pageSizeOptions : number[];
		showTotal ?: boolean;
	}>();

	const emit = defineEmits(['changePage', 'update:pageSize']);

	const totalPages = computed(() => {
		if (!props.pageSize || props.pageSize === 0) return 1;
		return Math.ceil(props.total / props.pageSize) || 1;
	});

	const pageSizeStringOptions = computed(() => {
		if (!props.pageSizeOptions) return [];
		return props.pageSizeOptions.map(opt => String(opt));
	});

	const pageSizeIndex = computed(() => {
		if (!props.pageSizeOptions) return 0;
		const idx = props.pageSizeOptions.indexOf(props.pageSize);
		return idx !== -1 ? idx : 0;
	});

	const onPageSizeChange = (e : any) => {
		const index = e.detail.value;
		if (props.pageSizeOptions && props.pageSizeOptions[index]) {
			const newSize = props.pageSizeOptions[index];
			emit('update:pageSize', newSize);
		}
	};

	const onPrev = () => {
		if (props.pageNo > 1) {
			emit('changePage', -1);
		}
	};

	const onNext = () => {
		if (props.pageNo < totalPages.value) {
			emit('changePage', 1);
		}
	};
</script>

<style lang="scss" scoped>
	.pagination-footer {
		flex-shrink: 0;
		/* Thay #fff */
		background-color: var(--bg-surface);
		padding: 10px 15px;
		padding-bottom: calc(10px + env(safe-area-inset-bottom));
		/* Thay #eee */
		border-top: 1px solid var(--border-color);
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page-size-selector {
		display: flex;
		align-items: center;
		/* Thay #ddd và #f9f9f9 */
		border: 1px solid var(--border-input);
		background-color: var(--bg-input);
		border-radius: 4px;
		padding: 4px 8px;
	}

	.size-text {
		font-size: 12px;
		/* Thay #333 */
		color: var(--text-primary);
		margin-right: 4px;
	}

	.dropdown-arrow {
		font-size: 10px;
		/* Thay #666 */
		color: var(--text-secondary);
	}

	.total-text {
		font-size: 12px;
		/* Thay #999 */
		color: var(--text-hint);
		margin: 0 5px;
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.page-arrow {
		font-size: 18px;
		/* Thay #666 */
		color: var(--text-secondary);
		padding: 0 10px;
		font-weight: bold;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.page-arrow.disabled {
		opacity: 0.3;
		pointer-events: none;
	}

	.page-box {
		width: 26px;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
		/* Thay border và màu chữ */
		border: 1px solid var(--border-input);
		color: var(--text-primary);
		border-radius: 4px;
		font-size: 12px;
	}

	.page-box.active {
		background-color: #2dce89;
		color: #fff;
		border-color: #2dce89;
		font-weight: bold;
	}
</style>