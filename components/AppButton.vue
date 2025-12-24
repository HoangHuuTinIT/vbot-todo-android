<template>
	<button class="app-btn" :class="[
      `btn-${type}`, 
      size === 'small' ? 'btn-sm' : '',
      { 'is-disabled': disabled || loading }
    ]" :disabled="disabled || loading" @click="handleClick" hover-class="btn-hover">

		<view v-if="loading" class="loading-spinner"></view>

		<slot>
			<text class="btn-text">{{ label }}</text>
		</slot>
	</button>
</template>

<script setup lang="ts">
	interface Props {
		label ?: string;
		type ?: 'primary' | 'secondary' | 'danger' | 'outline';
		size ?: 'normal' | 'small';
		disabled ?: boolean;
		loading ?: boolean;
	}

	const props = withDefaults(defineProps<Props>(), {
		type: 'primary',
		size: 'normal',
		disabled: false,
		loading: false,
		label: ''
	});

	const emit = defineEmits(['click']);

	const handleClick = (event : any) => {
		if (!props.disabled && !props.loading) {
			emit('click', event);
		}
	};
</script>

<style lang="scss" scoped>
	.app-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 20px;
		border: 1px solid transparent;
		font-size: 14px;
		font-weight: 600;
		height: 40px;
		line-height: 40px;
		padding: 0 20px;
		transition: all 0.2s;
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
	}

	.btn-hover {
		opacity: 0.8;
		transform: scale(0.98);
	}

	/* PRIMARY: Giữ màu Brand, chữ trắng */
	.btn-primary {
		background-color: #009688;
		color: #ffffff;
		border-color: #009688;
	}

	/* SECONDARY: Thay màu cứng bằng biến nền Input (Xám nhạt / Xám đậm) */
	.btn-secondary {
		/* Thay #f5f5f5 */
		background-color: var(--bg-input);
		/* Thay #666666 */
		color: var(--text-secondary);
		/* Thay #f5f5f5 */
		border-color: var(--bg-input);
	}

	/* DANGER: Dùng biến --text-danger (đỏ) từ theme */
	.btn-danger {
		background-color: var(--text-danger);
		color: #ffffff;
		border-color: var(--text-danger);
	}

	/* OUTLINE: Nền thay đổi theo theme (Trắng / Đen xám) */
	.btn-outline {
		/* Thay #ffffff */
		background-color: var(--bg-surface);
		color: #009688;
		border-color: #009688;
	}

	.btn-sm {
		height: 32px;
		line-height: 30px;
		font-size: 12px;
		padding: 0 12px;
	}

	/* DISABLED: Dùng biến border/input cho nền, text-hint cho chữ */
	.is-disabled {
		opacity: 0.6;
		/* Thay #e0e0e0 */
		background-color: var(--bg-input) !important;
		border-color: var(--bg-input) !important;
		/* Thay #999 */
		color: var(--text-hint) !important;
		pointer-events: none;
	}

	.loading-spinner {
		width: 14px;
		height: 14px;
		/* Sửa lại spinner để nó lấy màu theo màu chữ của nút (currentColor) */
		border: 2px solid currentColor;
		border-top-color: transparent;
		/* Phần trong suốt để tạo hiệu ứng quay */
		opacity: 0.6;
		border-radius: 50%;
		margin-right: 8px;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}
</style>