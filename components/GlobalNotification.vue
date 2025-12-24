<template>
	<view class="notification-wrapper" :class="{ 'show': notificationStore.visible, 'theme-dark': isDark }"
		:style="{ paddingTop: statusBarHeight + 'px' }">

		<view class="notification-card" :class="notificationStore.type" @click="handleTap">
			<view class="icon-box">
				<text v-if="notificationStore.type === 'success'" class="icon">✅</text>
				<text v-else-if="notificationStore.type === 'warning'" class="icon">⚠️</text>
				<text v-else-if="notificationStore.type === 'error'" class="icon">⛔</text>
				<text v-else class="icon">🔔</text>
			</view>

			<view class="content-box">
				<rich-text :nodes="formattedMessage"></rich-text>
			</view>

			<view class="close-btn" @click.stop="close">✕</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { useNotificationStore } from '@/stores/notification';
	import { useAuthStore } from '@/stores/auth'; // 1. Import AuthStore

	const notificationStore = useNotificationStore();
	const authStore = useAuthStore(); // 2. Init AuthStore

	// 3. Lấy trạng thái Dark Mode
	const isDark = computed(() => authStore.isDark);

	const statusBarHeight = ref(0);

	uni.getSystemInfo({
		success: (res) => {
			statusBarHeight.value = (res.statusBarHeight || 0) + 10;
		}
	});

	// 4. Sửa màu cứng #333 thành var(--text-primary) để rich-text tự đổi màu
	const formattedMessage = computed(() => {
		return `<div style="font-size: 14px; line-height: 1.4; color: var(--text-primary);">${notificationStore.message}</div>`;
	});

	const close = () => {
		notificationStore.hide();
	};

	const handleTap = () => {
		console.log('Click vào thông báo');
		close();
	};
</script>

<style lang="scss" scoped>
	/* 5. Import Theme & Chuyển sang SCSS */
	@import '@/common/theme.scss';

	.notification-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 9999;
		pointer-events: none;
		transform: translateY(-100%);
		transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
		display: flex;
		justify-content: center;
		padding-left: 16px;
		padding-right: 16px;
	}

	.notification-wrapper.show {
		transform: translateY(0);
		pointer-events: auto;
	}

	.notification-card {
		/* 6. Dùng biến nền surface */
		background: var(--bg-surface);
		width: 100%;
		max-width: 600px;
		border-radius: 12px;
		/* Giữ shadow nhưng có thể giảm opacity nếu cần, hoặc để nguyên */
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		padding: 12px 16px;
		display: flex;
		align-items: flex-start;
		gap: 12px;
		border-left: 5px solid #007aff;

		/* Thêm border mỏng cho dark mode để card nổi bật hơn trên nền tối */
		border-top: 1px solid transparent;
		border-right: 1px solid transparent;
		border-bottom: 1px solid transparent;
	}

	/* Tùy chỉnh border cho dark mode nếu cần thiết */
	:deep(.theme-dark) .notification-card {
		border-top-color: var(--border-color);
		border-right-color: var(--border-color);
		border-bottom-color: var(--border-color);
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
		/* Shadow đậm hơn chút ở dark mode */
	}

	.notification-card.success {
		border-left-color: #4cd964;
	}

	.notification-card.warning {
		border-left-color: #ffcc00;
	}

	.notification-card.error {
		border-left-color: #ff3b30;
	}

	.icon-box {
		flex-shrink: 0;
		padding-top: 2px;
	}

	.icon {
		font-size: 18px;
	}

	.content-box {
		flex: 1;
		word-break: break-word;
	}

	.close-btn {
		font-size: 14px;
		/* 7. Dùng biến màu hint */
		color: var(--text-hint);
		padding: 4px;
	}

	/* Các style deep cho nội dung rich-text */
	:deep(.highlight) {
		color: #007aff;
		font-weight: bold;
	}

	:deep(b) {
		font-weight: 600;
		/* 8. Đổi màu thẻ bold từ #000 sang biến primary */
		color: var(--text-primary);
	}
</style>