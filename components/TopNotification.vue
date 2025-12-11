<template>
	<view class="notification-wrapper" :class="{ 'show': visible }">
		<view class="notification-content">
			<view class="icon-box">
				<image src="/static/notification.png" class="icon" v-if="type === 'info'" />
				<image src="/static/alert.png" class="icon" v-else />
				</view>
			<view class="text-box">
				<rich-text :nodes="message"></rich-text>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import { useSocketStore } from '@/stores/socket';

	const socketStore = useSocketStore();

	const visible = computed(() => socketStore.notificationState.visible);
	const message = computed(() => socketStore.notificationState.message);
	const type = computed(() => socketStore.notificationState.type);
</script>

<style scoped>
	.notification-wrapper {
		position: fixed;
		top: -100px; /* Ẩn phía trên màn hình */
		left: 0;
		right: 0;
		z-index: 9999;
		display: flex;
		justify-content: center;
		transition: top 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		pointer-events: none; /* Để không chặn touch khi ẩn */
	}

	.notification-wrapper.show {
		top: calc(var(--status-bar-height) + 10px); /* Hiện xuống dưới status bar */
		pointer-events: auto;
	}

	.notification-content {
		background: rgba(255, 255, 255, 0.98);
		backdrop-filter: blur(10px);
		width: 90%;
		max-width: 400px;
		padding: 12px 16px;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		display: flex;
		align-items: flex-start;
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	.icon-box {
		margin-right: 12px;
		padding-top: 2px;
	}

	.icon {
		width: 24px;
		height: 24px;
	}

	.text-box {
		flex: 1;
		font-size: 14px;
		color: #333;
		line-height: 1.5;
	}
	
	/* Style cho rich-text */
	:deep(.highlight) {
		color: #007aff;
		font-weight: bold;
	}
	
	:deep(b) {
		font-weight: 600;
		color: #000;
	}
</style>