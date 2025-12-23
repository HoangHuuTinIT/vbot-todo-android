<template>
	<view class="link-card" @tap.stop="handleOpenLink" v-if="url">
		<view class="link-card-icon">
			<image v-if="!imageError && faviconUrl" :src="faviconUrl" class="card-icon-img" mode="aspectFit"
				@error="handleImageError"></image>
			<image v-else src="https://img.icons8.com/ios-filled/50/007aff/internet.png" class="card-icon-img"></image>
		</view>
		<view class="link-card-content">
			<text class="link-domain">{{ domainDisplay }}</text>
			<text class="link-url">{{ url }}</text>
		</view>

		<view v-if="removable" class="link-card-remove" @tap.stop="$emit('remove')">
			<text class="remove-btn">✕</text>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed, ref, watch } from 'vue';
	import { getDomainFromUrl, getFaviconFromUrl, openExternalLink } from '@/utils/linkHelper';

	const props = defineProps({
		url: {
			type: String,
			required: true,
			default: ''
		},
		removable: {
			type: Boolean,
			default: false
		}
	});

	const emit = defineEmits(['remove']);
	const imageError = ref(false);

	const domainDisplay = computed(() => getDomainFromUrl(props.url));
	const faviconUrl = computed(() => getFaviconFromUrl(props.url));

	watch(() => props.url, () => {
		imageError.value = false;
	});

	const handleImageError = (e : any) => {
		imageError.value = true;
	};

	const handleOpenLink = () => {
		openExternalLink(props.url);
	};
</script>

<style lang="scss" scoped>
	/* Mapping màu sắc:
   - Background: #fff -> var(--bg-surface)
   - Border: #e5e7eb -> var(--border-color)
   - Icon Background: #eff6ff -> var(--bg-input)
   - Text Domain: #111827 -> var(--text-primary)
   - Text URL: #6b7280 -> var(--text-hint)
*/

	.link-card {
		display: flex;
		align-items: center;
		/* Thay #fff */
		background-color: var(--bg-surface);
		/* Thay #e5e7eb */
		border: 1px solid var(--border-color);
		border-radius: 8px;
		padding: 8px 10px;
		margin-bottom: 8px;
		margin-top: 4px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
		transition: background-color 0.2s;

		&:active {
			/* Thay #f9fafb */
			background-color: var(--bg-input);
		}
	}

	.link-card-icon {
		width: 36px;
		height: 36px;
		/* Thay #eff6ff (xanh nhạt) thành màu nền input để hợp dark mode */
		background-color: var(--bg-input);
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 10px;
		flex-shrink: 0;
		overflow: hidden;
		/* Thêm border nhẹ để tách biệt icon với nền nếu trùng màu */
		border: 1px solid var(--border-color);
	}

	.card-icon-img {
		width: 20px;
		height: 20px;
		/* Không dùng filter invert ở đây vì Favicon thường có màu sắc riêng */
	}

	.link-card-content {
		flex: 1;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.link-domain {
		font-size: 13px;
		font-weight: 600;
		/* Thay #111827 */
		color: var(--text-primary);
		margin-bottom: 2px;
	}

	.link-url {
		font-size: 11px;
		/* Thay #6b7280 */
		color: var(--text-hint);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.link-card-remove {
		padding: 5px;
		margin-left: 5px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.remove-btn {
		/* Thay #9ca3af */
		color: var(--text-secondary);
		font-size: 14px;
		font-weight: bold;
	}
</style>