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

	.btn-primary {
		background-color: #009688;
		color: #ffffff;
		border-color: #009688;
	}

	.btn-secondary {
		background-color: #f5f5f5;
		color: #666666;
		border-color: #f5f5f5;
	}

	.btn-danger {
		background-color: #ff3b30;
		color: #ffffff;
		border-color: #ff3b30;
	}

	.btn-outline {
		background-color: #ffffff;
		color: #009688;
		border-color: #009688;
	}

	.btn-sm {
		height: 32px;
		line-height: 30px;
		font-size: 12px;
		padding: 0 12px;
	}

	.is-disabled {
		opacity: 0.6;
		background-color: #e0e0e0 !important;
		color: #999 !important;
		border-color: #e0e0e0 !important;
		pointer-events: none;
	}

	.loading-spinner {
		width: 14px;
		height: 14px;
		border: 2px solid rgba(255, 255, 255, 0.5);
		border-top-color: #fff;
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