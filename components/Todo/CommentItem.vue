<template>
	<view class="comment-thread">
		<view class="flex gap-3 mb-4 items-start">
			<UserAvatar :name="data.senderName" :avatar-color="data.senderAvatarColor" :size="isReply ? 30 : 40"
				class="shrink-0" :class="isReply ? 'mr-2' : 'mr-3'" />

			<view class="flex-1 overflow-hidden">
				<view class="bg-gray-50 rounded-2xl p-3 rounded-tl-none relative">
					<view class="flex justify-between items-start mb-1">
						<text class="font-bold text-sm text-gray-900">{{ data.senderName }}</text>
						<view class="flex items-center">
							<text class="text-xs text-gray-400">{{ data.timeDisplay }}</text>
							<text v-if="data.isEdited" class="text-xs text-gray-400 italic ml-1">• Đã sửa</text>
						</view>
					</view>

					<rich-text :nodes="processedContent.cleanHtml"
						class="text-sm text-gray-700 leading-normal"></rich-text>

					<view v-if="processedContent.links.length > 0" class="mt-2">
						<LinkCard v-for="(link, index) in processedContent.links" :key="index" :url="link" />
					</view>

					<view v-if="data.files" class="mt-2">
						<image :src="data.files" mode="widthFix" class="comment-attachment-img"
							@click.stop="onPreviewImage(data.files)"></image>
					</view>
				</view>

				<view class="c-footer-actions">
					<view class="reaction-row">
						<view v-if="data.reactions && data.reactions.length > 0" class="flex gap-1 mt-1">
							<view v-for="(react, rIdx) in data.reactions" :key="rIdx" class="emoji-tag">
								{{ react.codeEmoji }}
							</view>
						</view>
					</view>

					<view class="action-buttons-container" v-if="data.type == 'COMMENT'">
						<view class="btn-icon-action" @click="$emit('react', data)">
							<image src="/static/reaction.png" class="icon-action"></image>
						</view>

						<view class="btn-icon-action" @click="$emit('reply', data)">
							<image src="/static/reply_comment.png" class="icon-action">
							</image>
						</view>

						<template v-if="isMe && data.type === 'COMMENT'">
							<view class="btn-icon-action" @click="$emit('edit', data)">
								<image src="/static/edit_comment.png" class="icon-action">
								</image>
							</view>
							<view class="btn-icon-action" @click="$emit('delete', data.id)">
								<image src="/static/delete.png" class="icon-action">
								</image>
							</view>
						</template>
					</view>
				</view>
			</view>
		</view>

		<view v-if="data.children && data.children.length > 0" class="pl-12 mt-2 replies-wrapper">
			<CommentItem v-for="child in data.children" :key="child.id" :data="child" :is-reply="true"
				@react="(d) => $emit('react', d)" @reply="(d) => $emit('reply', d)" @edit="(d) => $emit('edit', d)"
				@delete="(id) => $emit('delete', id)" />
		</view>
	</view>
</template>

<script setup lang="ts">
	import { computed } from 'vue';
	import UserAvatar from '@/components/UserAvatar.vue';
	import LinkCard from '@/components/Todo/LinkCard.vue';
	import { extractLinksAndCleanHtml } from '@/utils/linkHelper';
	import { useAuthStore } from '@/stores/auth';
	import CommentItem from './CommentItem.vue';

	const props = defineProps<{
		data : any,
		isReply ?: boolean
	}>();

	const emit = defineEmits(['react', 'reply', 'edit', 'delete']);
	const authStore = useAuthStore();

	const isMe = computed(() => {
		return props.data.isMe === true;
	});


	const processedContent = computed(() => {
		const rawHtml = props.data.message || '';
		return extractLinksAndCleanHtml(rawHtml);
	});

	const onPreviewImage = (url : string) => {
		if (!url) return;
		uni.previewImage({
			urls: [url],
			current: 0
		});
	};
</script>

<style scoped>
	.flex {
		display: flex;
	}

	.flex-1 {
		flex: 1;
	}

	.gap-1 {
		gap: 4px;
	}

	.gap-3 {
		gap: 12px;
	}

	.mb-1 {
		margin-bottom: 4px;
	}

	.mb-4 {
		margin-bottom: 16px;
	}

	.mt-1 {
		margin-top: 4px;
	}

	.mt-2 {
		margin-top: 8px;
	}

	.items-start {
		align-items: flex-start;
	}

	.items-center {
		align-items: center;
	}

	.justify-between {
		justify-content: space-between;
	}

	.shrink-0 {
		flex-shrink: 0;
	}

	.overflow-hidden {
		overflow: hidden;
	}

	.bg-gray-50 {
		background-color: #f9fafb;
	}

	.rounded-2xl {
		border-radius: 16px;
	}

	.rounded-tl-none {
		border-top-left-radius: 0;
	}

	.p-3 {
		padding: 12px;
	}

	.text-sm {
		font-size: 14px;
	}

	.text-xs {
		font-size: 12px;
	}

	.font-bold {
		font-weight: 700;
	}

	.text-gray-900 {
		color: #111827;
	}

	.text-gray-700 {
		color: #374151;
	}

	.text-gray-400 {
		color: #9ca3af;
	}

	.italic {
		font-style: italic;
	}

	.ml-1 {
		margin-left: 4px;
	}

	.mr-2 {
		margin-right: 8px;
	}

	.mr-3 {
		margin-right: 12px;
	}

	.pl-12 {
		padding-left: 48px;
	}

	.c-footer-actions {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 4px;
		min-height: 24px;
	}

	.reaction-row {
		flex: 1;
	}

	.emoji-tag {
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 10px;
		padding: 2px 6px;
		font-size: 12px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
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

	.btn-icon-action:active {
		opacity: 1;
	}

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

	:deep(img) {
		max-width: 100%;
		height: auto;
	}
</style>