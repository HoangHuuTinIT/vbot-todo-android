<template>
	<view class="link-card" @tap.stop="handleOpenLink" v-if="url">
		<view class="link-card-icon">
			<image 
				v-if="!imageError && faviconUrl"
				:src="faviconUrl" 
				class="card-icon-img"
				mode="aspectFit"
				@error="handleImageError"
			></image>
			<image 
				v-else
				src="https://img.icons8.com/ios-filled/50/007aff/internet.png" 
				class="card-icon-img"
			></image>
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

const handleImageError = (e: any) => {
	imageError.value = true;
};

const handleOpenLink = () => {
	openExternalLink(props.url);
};
</script>

<style lang="scss" scoped>
.link-card {
	display: flex;
	align-items: center;
	background-color: #fff;
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	padding: 8px 10px;
	margin-bottom: 8px;
	margin-top: 4px;
	box-shadow: 0 1px 2px rgba(0,0,0,0.03);
	transition: background-color 0.2s;
	
	&:active {
		background-color: #f9fafb;
	}
}

.link-card-icon {
	width: 36px;
	height: 36px;
	background-color: #eff6ff;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	flex-shrink: 0;
	overflow: hidden;
}

.card-icon-img {
	width: 20px;
	height: 20px;
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
	color: #111827;
	margin-bottom: 2px;
}

.link-url {
	font-size: 11px;
	color: #6b7280;
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
	color: #9ca3af;
	font-size: 14px;
	font-weight: bold;
}
</style>