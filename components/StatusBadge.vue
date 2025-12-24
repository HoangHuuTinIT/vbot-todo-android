<template>
	<view class="badge-base" :class="statusClass">
		{{ badgeLabel }}
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { TODO_STATUS } from '@/utils/constants';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const props = defineProps<{
		status : string
	}>();

	const badgeLabel = computed(() => {
		switch (props.status) {
			case TODO_STATUS.NEW:
				return t('todo.status_todo');
			case TODO_STATUS.IN_PROGRESS:
				return t('todo.status_progress');
			case TODO_STATUS.DONE:
				return t('todo.status_done');
			case TODO_STATUS.OVERDUE:
				return t('todo.status_overdue');
			default:
				return props.status || 'Unknown';
		}
	});

	// Trả về tên class thay vì utility class của Tailwind
	const statusClass = computed(() => {
		switch (props.status) {
			case TODO_STATUS.NEW:
				return 'status-new';
			case TODO_STATUS.IN_PROGRESS:
				return 'status-progress';
			case TODO_STATUS.DONE:
				return 'status-done';
			case TODO_STATUS.OVERDUE:
				return 'status-overdue';
			default:
				return 'status-default';
		}
	});
</script>

<style lang="scss" scoped>
	/* Import theme để có thể dùng các mixin hoặc biến global nếu cần */
	@import '@/common/theme.scss';

	/* 1. Base Styles (Cấu trúc chung) */
	.badge-base {
		padding: 4px 8px;
		border-radius: 9999px;
		font-size: 12px;
		font-weight: 700;
		display: inline-block;
		text-align: center;
		min-width: 80px;
		line-height: 1.4;
		transition: background-color 0.3s, color 0.3s;
	}

	/* 2. Định nghĩa màu sắc mặc định (Light Mode) */
	/* Logic: Nền nhạt - Chữ đậm */
	.status-new {
		background-color: #e4e4e7;
		color: #52525b;
	}

	.status-progress {
		background-color: #ffedd5;
		color: #c2410c;
	}

	.status-done {
		background-color: #dcfce7;
		color: #15803d;
	}

	.status-overdue {
		background-color: #fee2e2;
		color: #dc2626;
	}

	.status-default {
		background-color: #f4f4f5;
		color: #a1a1aa;
	}

	/* 3. Dark Mode Overrides */
	/* Logic: Nền đậm - Chữ sáng (Pastel) để dễ đọc trên nền tối */

	/* Sử dụng :global(.theme-dark) để bắt class từ thẻ cha (App/Page) */
	:global(.theme-dark) .status-new {
		background-color: #3f3f46;
		color: #e4e4e7;
		/* Xám đậm / Xám trắng */
	}

	:global(.theme-dark) .status-progress {
		background-color: #7c2d12;
		color: #ffedd5;
		/* Cam nâu đậm / Cam nhạt */
	}

	:global(.theme-dark) .status-done {
		background-color: #064e3b;
		color: #d1fae5;
		/* Xanh lá đậm / Xanh bạc hà */
	}

	:global(.theme-dark) .status-overdue {
		background-color: #7f1d1d;
		color: #fecaca;
		/* Đỏ rượu / Hồng nhạt */
	}

	:global(.theme-dark) .status-default {
		background-color: #27272a;
		color: #a1a1aa;
	}
</style>