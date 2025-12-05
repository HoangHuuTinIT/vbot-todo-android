// components/Todo/CommentItem.vue
<template>
	<view class="comment-thread">
		<view class="flex gap-3 mb-4 items-start">
			<UserAvatar 
				:name="data.senderName" 
				:avatar-color="data.senderAvatarColor"
				:size="isReply ? 30 : 40"
				class="shrink-0"
				:class="isReply ? 'mr-2' : 'mr-3'"
			/>
			
			<view class="flex-1 overflow-hidden">
				<view class="bg-gray-50 rounded-2xl p-3 rounded-tl-none relative">
					<view class="flex justify-between items-start mb-1">
						<text class="font-bold text-sm text-gray-900">{{ data.senderName }}</text>
						<view class="flex items-center">
							 <text class="text-xs text-gray-400">{{ data.timeDisplay }}</text>
							 <text v-if="data.isEdited" class="text-xs text-gray-400 italic ml-1">• Đã sửa</text>
						</view>
					</view>
					
					<rich-text :nodes="processedContent.cleanHtml" class="text-sm text-gray-700 leading-normal"></rich-text>
					
					<view v-if="processedContent.links.length > 0" class="mt-2">
						<view v-for="(link, index) in processedContent.links" :key="index" class="link-card" @tap.stop="openLink(link)">
							<view class="link-card-icon">
								<image src="https://img.icons8.com/ios-filled/50/007aff/internet.png" class="card-icon-img"></image>
							</view>
							<view class="link-card-content">
								<text class="link-domain">{{ getDomain(link) }}</text>
								<text class="link-url">{{ link }}</text>
							</view>
						</view>
					</view>

					<view v-if="data.files" class="mt-2">
						 <image 
							:src="data.files" 
							mode="widthFix" 
							class="comment-attachment-img"
							@click.stop="onPreviewImage(data.files)"
						 ></image>
					</view>
				</view>
				
				<view class="c-footer-actions">
					<view class="reaction-row">
							<view v-if="data.reactions && data.reactions.length > 0" class="flex gap-1 mt-1">
									<view 
										v-for="(react, rIdx) in data.reactions" 
										:key="rIdx" 
										class="emoji-tag"
									>
										{{ react.codeEmoji }}
									</view>
							</view>
					</view>
					
					<view class="action-buttons-container" v-if="data.type == 'COMMENT'">
							<view class="btn-icon-action" @click="$emit('react', data)">
									<image src="https://img.icons8.com/ios/50/999999/happy--v1.png" class="icon-action"></image>
							</view>
	
							<view class="btn-icon-action" @click="$emit('reply', data)">
									<image src="https://img.icons8.com/ios/50/999999/speech-bubble--v1.png" class="icon-action"></image>
							</view>
	
							<template v-if="isMe">
									<view class="btn-icon-action" @click="$emit('edit', data)">
											<image src="https://img.icons8.com/ios/50/999999/create-new.png" class="icon-action"></image>
									</view>
									<view class="btn-icon-action" @click="$emit('delete', data.id)">
											<image src="https://img.icons8.com/ios/50/999999/trash--v1.png" class="icon-action"></image>
									</view>
							</template>
					</view>
				</view>
			</view>
		</view>

		<view v-if="data.children && data.children.length > 0" class="pl-12 mt-2 replies-wrapper">
				<CommentItem 
						v-for="child in data.children" 
						:key="child.id"
						:data="child"
						:is-reply="true"
						@react="(d) => $emit('react', d)"
						@reply="(d) => $emit('reply', d)"
						@edit="(d) => $emit('edit', d)"
						@delete="(id) => $emit('delete', id)"
				/>
		</view>
	</view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UserAvatar from '@/components/UserAvatar.vue';
import { useAuthStore } from '@/stores/auth';
import CommentItem from './CommentItem.vue';

const props = defineProps<{
	data: any, 
	isReply?: boolean 
}>();

const emit = defineEmits(['react', 'reply', 'edit', 'delete']);
const authStore = useAuthStore();

const isMe = computed(() => {
		return String(props.data.senderId) === String(authStore.uid);
});


const processedContent = computed(() => {
	const rawHtml = props.data.message || '';
	const links: string[] = [];

	const iframeRegex = /<iframe[^>]+src="([^">]+)"[^>]*><\/iframe>/g;

	const cleanHtml = rawHtml.replace(iframeRegex, (match: any, src: string) => {
		if (src) links.push(src);
		return ''; 
	});

	return { cleanHtml, links };
});

const getDomain = (url: string) => {
	try {
		if (!url.startsWith('http')) return 'Website';
		const domain = new URL(url).hostname;
		return domain.replace('www.', '');
	} catch (e) {
		return 'Liên kết ngoài';
	}
};

const openLink = (url: string) => {
	// #ifdef APP-PLUS
	plus.runtime.openURL(url);
	// #endif
	// #ifdef H5
	window.open(url, '_blank');
	// #endif
};


const onPreviewImage = (url: string) => {
		if (!url) return;
		uni.previewImage({
				urls: [url],
				current: 0
		});
};
</script>

<style scoped>
.flex { display: flex; }
.flex-1 { flex: 1; }
.gap-1 { gap: 4px; }
.gap-3 { gap: 12px; }
.mb-1 { margin-bottom: 4px; }
.mb-4 { margin-bottom: 16px; }
.mt-1 { margin-top: 4px; }
.mt-2 { margin-top: 8px; }
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.justify-between { justify-content: space-between; }
.shrink-0 { flex-shrink: 0; }
.overflow-hidden { overflow: hidden; }
.bg-gray-50 { background-color: #f9fafb; }
.rounded-2xl { border-radius: 16px; }
.rounded-tl-none { border-top-left-radius: 0; }
.rounded-full { border-radius: 9999px; }
.p-3 { padding: 12px; }
.px-1 { padding-left: 4px; padding-right: 4px; }
.text-sm { font-size: 14px; }
.text-xs { font-size: 12px; }
.font-bold { font-weight: 700; }
.font-medium { font-weight: 500; }
.text-gray-900 { color: #111827; }
.text-gray-700 { color: #374151; }
.text-gray-400 { color: #9ca3af; }
.italic { font-style: italic; }
.ml-1 { margin-left: 4px; }
.ml-2 { margin-left: 8px; }
.mr-2 { margin-right: 8px; }
.mr-3 { margin-right: 12px; }
.pl-12 { padding-left: 48px; } 

.c-footer-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 4px;
		min-height: 24px;
}
.reaction-row { flex: 1; }
.emoji-tag {
		background-color: #fff; border: 1px solid #eee;
		border-radius: 10px; padding: 2px 6px; font-size: 12px;
		box-shadow: 0 1px 2px rgba(0,0,0,0.05);
		display: inline-block;
}
.action-buttons-container {
		display: flex;
		gap: 15px;
		align-items: center;
		margin-left: auto; 
}
.btn-icon-action {
		padding: 4px;
		opacity: 0.6;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
}
.btn-icon-action:active { opacity: 1; }
.icon-action {
		width: 18px;
		height: 18px;
}

.comment-attachment-img {
		max-width: 200px;     
		max-height: 300px;    
		border-radius: 8px;    
		border: 1px solid #eee; 
		display: block;      
}
:deep(img) { max-width: 100%; height: auto; }

.link-card {
	display: flex;
	align-items: center;
	background-color: #fff; 
	border: 1px solid #e5e7eb;
	border-radius: 8px;
	padding: 8px;
	margin-bottom: 6px;
	margin-top: 8px;
	box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.link-card:active {
	background-color: #f3f4f6;
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
}
.card-icon-img {
	width: 18px;
	height: 18px;
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
	margin-bottom: 1px;
}
.link-url {
	font-size: 11px;
	color: #6b7280;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>