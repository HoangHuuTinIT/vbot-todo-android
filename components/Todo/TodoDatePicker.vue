<template>
	<view class="flat-item date-compound-block">
		<view class="item-left icon-top-aligned">
			<image src="https://img.icons8.com/ios/50/666666/clock--v1.png" class="item-icon"></image>
		</view>
		<view class="right-column">

			<view class="date-row">
				<uni-datetime-picker type="datetime" :value="dueDate" :hide-second="true" :border="false"
					@change="onDueDateChange" class="full-width-picker">
					<view class="item-picker" :class="{ 'placeholder-color': !dueDate }">
						<text class="picker-label">{{ $t('todo.due_date_label') }}</text>
						<text
							class="picker-value">{{ dueDate ? formatDateTimeDisplay(dueDate) : $t('todo.select_date') }}</text>
					</view>
				</uni-datetime-picker>
			</view>

			<view class="inner-divider"></view>

			<view class="date-row">
				<uni-datetime-picker type="datetime" :value="notifyAt" :hide-second="true" :border="false"
					@change="onNotifyDateChange" class="full-width-picker">
					<view class="item-picker" :class="{ 'placeholder-color': !notifyAt }">
						<text class="picker-label">{{ $t('todo.notify_date_label') }}</text>
						<text
							class="picker-value">{{ notifyAt ? formatDateTimeDisplay(notifyAt) : $t('todo.select_date') }}</text>
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
		dueDate : string;
		notifyAt : string;
	}

	const props = defineProps<DatePickerProps>();
	const emit = defineEmits(['update:dueDate', 'update:notifyAt', 'change']);
	const { t } = useI18n();

	const onDueDateChange = (val : string) => {
		emit('update:dueDate', val);
		emit('change', { field: 'dueDate', value: val });
	};

	const onNotifyDateChange = (val : string) => {
		emit('update:notifyAt', val);
		emit('change', { field: 'notifyAt', value: val });
	};


	const formatDateTimeDisplay = (isoStr : string) => {
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
	/* 1. IMPORT THEME */
	@import '@/common/theme.scss';

	.flat-item {
		/* SỬA: Thay background trắng cứng bằng biến surface */
		background-color: var(--bg-surface);
		margin-bottom: 12px;
		padding: 15px;
		display: flex;
		align-items: center;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
		/* Thêm border nhẹ nếu muốn rõ hơn trong dark mode */
		// border: 1px solid var(--border-color); 
	}

	.item-left {
		display: flex;
		align-items: center;
		margin-right: 15px;
	}

	.item-icon {
		width: 22px;
		height: 22px;
		opacity: 0.6;
		/* QUAN TRỌNG: Đảo màu icon đồng hồ khi sang dark mode */
		filter: var(--icon-filter);
	}

	.icon-top-aligned {
		align-self: flex-start;
		margin-top: 6px;
	}

	.date-compound-block {
		align-items: flex-start;
	}

	.right-column {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.date-row {
		width: 100%;
		min-height: 30px;
		display: flex;
		align-items: center;
	}

	.full-width-picker {
		width: 100%;
	}


	.item-picker {
		text-align: left;
		font-size: 15px;
		/* SỬA: Thay màu #333 bằng text-primary (trắng/đen tuỳ mode) */
		color: var(--text-primary);
		width: 100%;
		display: flex;
		align-items: center;
		padding: 5px 0;
	}

	.placeholder-color {
		/* SỬA: Thay màu #808080 bằng text-hint */
		color: var(--text-hint);
	}

	.picker-label {
		font-weight: bold;
		/* SỬA: Thay màu #666 bằng text-secondary */
		color: var(--text-secondary);
		margin-right: 10px;
		font-size: 14px;
		white-space: nowrap;
	}

	.picker-value {
		/* Đảm bảo giá trị ngày giờ hiển thị rõ */
		color: var(--text-primary);
	}

	.inner-divider {
		height: 1px;
		/* SỬA: Thay màu #f0f0f0 bằng border-color */
		background-color: var(--border-color);
		margin: 10px 0;
		width: 100%;
	}
</style>