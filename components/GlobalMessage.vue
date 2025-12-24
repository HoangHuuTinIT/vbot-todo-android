<template>
	<view class="global-message-container" :class="{ 'show': isVisible, 'theme-dark': isDark }"
		:style="{ paddingBottom: (safeAreaBottom + 20) + 'px' }">

		<view class="message-content" :class="msgType">
			<image :src="iconPath" class="msg-icon" mode="aspectFit" />
			<text class="msg-text">{{ msgContent }}</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, onMounted, onUnmounted, computed } from 'vue';
	import { useI18n } from 'vue-i18n';
	// 1. Import AuthStore
	import { useAuthStore } from '@/stores/auth';

	const { t } = useI18n();
	const authStore = useAuthStore();

	// 2. Lấy trạng thái Dark Mode
	const isDark = computed(() => authStore.isDark);

	const isVisible = ref(false);
	const msgContent = ref('');
	const msgType = ref('success');
	const safeAreaBottom = ref(0);
	let timer : any = null;

	// Giữ nguyên logic Icons
	const icons : Record<string, string> = {
		success: 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23047857%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm-2%2015l-5-5%201.41-1.41L10%2014.17l7.59-7.59L19%208l-9%209z%22%2F%3E%3C%2Fsvg%3E',
		error: 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23b91c1c%22%3E%3Cpath%20d%3D%22M12%202C6.47%202%202%206.47%202%2012s4.47%2010%2010%2010%2010-4.47%2010-10S17.53%202%2012%202zm5%2013.59L15.59%2017%2012%2013.41%208.41%2017%207%2015.59%2010.59%2012%207%208.41%208.41%207%2012%2010.59%2015.59%207%2017%208.41%2013.41%2012%2017%2015.59z%22%2F%3E%3C%2Fsvg%3E',
		info: 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%231d4ed8%22%3E%3Cpath%20d%3D%22M12%202C6.48%202%202%206.48%202%2012s4.48%2010%2010%2010%2010-4.48%2010-10S17.52%202%2012%202zm1%2015h-2v-6h2v6zm0-8h-2V7h2v2z%22%2F%3E%3C%2Fsvg%3E',
		warning: 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22%23b45309%22%3E%3Cpath%20d%3D%22M1%2021h22L12%202%201%2021zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z%22%2F%3E%3C%2Fsvg%3E'
	};

	const iconPath = computed(() => {
		return icons[msgType.value] || icons['info'];
	});

	const handleShowToast = (data : { message : string, type ?: string }) => {
		if (timer) {
			clearTimeout(timer);
			isVisible.value = false;
		}
		msgContent.value = data.message;
		msgType.value = data.type || 'success';

		setTimeout(() => {
			isVisible.value = true;
		}, 50);

		timer = setTimeout(() => {
			isVisible.value = false;
		}, 3000);
	};

	onMounted(() => {
		const sysInfo = uni.getSystemInfoSync();
		safeAreaBottom.value = sysInfo.safeAreaInsets?.bottom || 0;

		uni.$on('app-toast-show', handleShowToast);

		uni.onNetworkStatusChange((res) => {
			if (!res.isConnected) {
				handleShowToast({ message: t('common.network_lost'), type: 'error' });
			} else {
				handleShowToast({ message: t('common.network_restored'), type: 'success' });
			}
		});
	});

	uni.getNetworkType({
		success: (res) => {
			if (res.networkType === 'none') {
				handleShowToast({
					message: t('common.no_internet'),
					type: 'error'
				});
			}
		}
	});

	onUnmounted(() => {
		uni.$off('app-toast-show', handleShowToast);
	});
</script>

<style lang="scss" scoped>
	@import '@/common/theme.scss';

	.global-message-container {
		position: fixed;
		top: auto;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 99999;
		transform: translateY(100%);
		transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
		display: flex;
		justify-content: center;
		pointer-events: none;
	}

	.global-message-container.show {
		transform: translateY(0);
	}

	.message-content {
		pointer-events: auto;
		display: inline-flex;
		align-items: center;
		padding: 10px 20px;
		border-radius: 50px;
		max-width: 85%;
		/* Shadow nhẹ cho light mode */
		box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.1);
		background-color: #fff;
		transition: background-color 0.3s, border-color 0.3s;
	}

	.msg-icon {
		width: 20px;
		height: 20px;
		margin-right: 8px;
		flex-shrink: 0;
	}

	.msg-text {
		font-size: 13px;
		font-weight: 600;
		color: #333;
		line-height: 1.4;
	}

	/* --- LIGHT MODE COLORS (Mặc định) --- */
	.message-content.success {
		background-color: #ecfdf5;
		border: 1px solid #a7f3d0;
	}

	.message-content.success .msg-text {
		color: #047857;
	}

	.message-content.error {
		background-color: #fef2f2;
		border: 1px solid #fecaca;
	}

	.message-content.error .msg-text {
		color: #b91c1c;
	}

	.message-content.info {
		background-color: #eff6ff;
		border: 1px solid #bfdbfe;
	}

	.message-content.info .msg-text {
		color: #1d4ed8;
	}

	.message-content.warning {
		background-color: #fffbeb;
		border: 1px solid #fde68a;
	}

	.message-content.warning .msg-text {
		color: #b45309;
	}


	/* --- DARK MODE OVERRIDES --- */
	/* Logic: Nền chuyển sang màu đậm, Border tối màu, Text chuyển sang màu sáng (pastel)
       để dễ đọc trên nền tối.
    */

	/* Global container dark logic */
	:deep(.theme-dark) .message-content {
		box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.4);
		/* Shadow đậm hơn */
	}

	/* Success Dark */
	:deep(.theme-dark) .message-content.success {
		background-color: #064e3b;
		/* Xanh đậm */
		border: 1px solid #065f46;
	}

	:deep(.theme-dark) .message-content.success .msg-text {
		color: #d1fae5;
		/* Xanh nhạt */
	}

	/* Error Dark */
	:deep(.theme-dark) .message-content.error {
		background-color: #7f1d1d;
		/* Đỏ đậm */
		border: 1px solid #991b1b;
	}

	:deep(.theme-dark) .message-content.error .msg-text {
		color: #fecaca;
		/* Đỏ nhạt */
	}

	/* Info Dark */
	:deep(.theme-dark) .message-content.info {
		background-color: #1e3a8a;
		/* Xanh dương đậm */
		border: 1px solid #172554;
	}

	:deep(.theme-dark) .message-content.info .msg-text {
		color: #bfdbfe;
		/* Xanh dương nhạt */
	}

	/* Warning Dark */
	:deep(.theme-dark) .message-content.warning {
		background-color: #78350f;
		/* Cam đậm */
		border: 1px solid #451a03;
	}

	:deep(.theme-dark) .message-content.warning .msg-text {
		color: #fde68a;
		/* Vàng nhạt */
	}

	/* Icon Brightness fix in Dark Mode */
	/* Vì icon là SVG cứng màu đậm, ta tăng độ sáng lên để nó nổi trên nền tối */
	:deep(.theme-dark) .msg-icon {
		filter: brightness(1.5) saturate(0.8);
	}
</style>