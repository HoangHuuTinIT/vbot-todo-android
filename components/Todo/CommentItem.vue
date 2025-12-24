<template>
	<view class="comment-thread">
		<view class="flex gap-3 mb-4 items-start">
			<UserAvatar :name="data.senderName" :avatar-color="data.senderAvatarColor" :size="isReply ? 30 : 40"
				class="shrink-0" :class="isReply ? 'mr-2' : 'mr-3'" />

			<view class="flex-1 overflow-hidden">
				<view class="comment-bubble rounded-2xl p-3 rounded-tl-none relative">

					<view class="flex flex-col items-start mb-2">
						<view class="flex flex-wrap items-center gap-1">
							<text class="font-bold text-sm sender-name">
								{{ data.senderName }}
							</text>
							<text v-if="data.actionText" class="text-xs action-text font-normal">
								{{ data.actionText }}
							</text>
						</view>

						<view class="flex items-center mt-1">
							<text class="text-xs time-text">{{ data.timeDisplay }}</text>
							<text v-if="data.isEdited" class="text-xs time-text italic ml-1">
								• Đã sửa
							</text>
						</view>
					</view>

					<view v-if="parsedContent.isUpdate" class="content-body">
						<text class="font-bold text-sm log-label block mb-1">
							{{ parsedContent.label }}
						</text>

						<view class="change-flow">
							<view class="part-container">
								<mp-html :content="parsedContent.oldRaw" :copy-link="false" :tag-style="htmlStyles"
									container-style="font-size: 14px; color: var(--text-primary); line-height: 1.5;"
									@linktap="handleLinkTap" />
							</view>

							<view class="arrow-container">
								<text class="arrow-text">→</text>
							</view>

							<view class="part-container">
								<mp-html :content="parsedContent.newRaw" :copy-link="false" :tag-style="htmlStyles"
									container-style="font-size: 14px; color: var(--text-primary); line-height: 1.5;"
									@linktap="handleLinkTap" />
							</view>
						</view>
					</view>

					<view v-else class="content-body">
						<mp-html :content="data.message" :copy-link="false" :tag-style="htmlStyles"
							container-style="font-size: 14px; color: var(--text-primary); line-height: 1.5;"
							@linktap="handleLinkTap" />

						<view v-if="data.files" class="mt-2">
							<image :src="data.files" mode="widthFix" class="comment-attachment-img"
								@click.stop="onPreviewImage(data.files)" />
						</view>
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

					<view class="action-buttons-container" v-if="data.type === 'COMMENT'">
						<view class="btn-icon-action" @click="$emit('react', data)">
							<image src="/static/reaction.png" class="icon-action" />
						</view>
						<view class="btn-icon-action" @click="$emit('reply', data)">
							<image src="/static/reply_comment.png" class="icon-action" />
						</view>
						<template v-if="isMe">
							<view class="btn-icon-action" @click="$emit('edit', data)">
								<image src="/static/edit_comment.png" class="icon-action" />
							</view>
							<view class="btn-icon-action" @click="$emit('delete', data.id)">
								<image src="/static/delete.png" class="icon-action" />
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
	import { useAuthStore } from '@/stores/auth';
	// Lưu ý: Import chính nó để đệ quy (Recursive component)
	import CommentItem from './CommentItem.vue'; 
	import { openExternalLink } from '@/utils/linkHelper';
	import mpHtml from 'mp-html/dist/uni-app/components/mp-html/mp-html.vue';

	const props = defineProps<{
		data : any,
		isReply ?: boolean
	}>();

	const emit = defineEmits(['react', 'reply', 'edit', 'delete']);
	const authStore = useAuthStore();

	const isMe = computed(() => {
		return props.data.isMe === true;
	});

	// SỬA: Dùng var(--text-primary) thay vì mã màu cứng để nội dung HTML tự đổi màu
	const htmlStyles = {
		p: 'font-size: 14px; line-height: 1.5; color: var(--text-primary); margin: 0; margin-bottom: 2px;',
		div: 'font-size: 14px; line-height: 1.5; color: var(--text-primary);',
		span: 'font-size: 14px; line-height: 1.5; color: var(--text-primary);',
		a: 'color: #007aff; text-decoration: none; font-size: 14px;',
		img: 'max-width: 100%; border-radius: 6px; margin-top: 4px;'
	};

	const handleLinkTap = (e : any) => {
		const url = e.href || e['data-src'] || e.src;
		if (url) {
			console.log("Mở link:", url);
			openExternalLink(url);
		}
	};

	const parsedContent = computed(() => {
		const raw = props.data.message || '';

		if (props.data.type === 'UPDATE_TODO' && raw.includes('->')) {
			const splitIndex = raw.lastIndexOf('->');

			if (splitIndex !== -1) {
				const leftPart = raw.substring(0, splitIndex).trim();
				const rightPart = raw.substring(splitIndex + 2).trim();

				const labelMatch = leftPart.match(/^<p>(- .*?:)/) || leftPart.match(/^(- .*?:)/);
				let label = '';
				let oldHtmlRaw = leftPart;

				if (labelMatch) {
					label = labelMatch[1].replace(/<p>|:$/g, '').trim() + ':';
					oldHtmlRaw = leftPart.replace(labelMatch[0], '').trim();
					if (oldHtmlRaw.startsWith('</p>')) oldHtmlRaw = oldHtmlRaw.substring(4);
				}

				return {
					isUpdate: true,
					label: label,
					oldRaw: oldHtmlRaw,
					newRaw: rightPart
				};
			}
		}

		return {
			isUpdate: false
		};
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
	/* === UTILS LAYOUT (Giữ nguyên) === */
	.flex-col { display: flex; flex-direction: column; }
	.mb-2 { margin-bottom: 8px; }
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
	.rounded-2xl { border-radius: 16px; }
	.rounded-tl-none { border-top-left-radius: 0; }
	.p-3 { padding: 12px; }
	.text-sm { font-size: 14px; }
	.text-xs { font-size: 12px; }
	.font-bold { font-weight: 700; }
	.italic { font-style: italic; }
	.ml-1 { margin-left: 4px; }
	.mr-2 { margin-right: 8px; }
	.mr-3 { margin-right: 12px; }
	.pl-12 { padding-left: 48px; }

	/* === THEME COLORS MAPPING === */

	/* Bubble chat nền xám/tối */
	.comment-bubble {
		/* Thay #f9fafb (bg-gray-50) */
		background-color: var(--bg-input); 
	}

	/* Tên người gửi */
	.sender-name {
		/* Thay #111827 (text-gray-900) */
		color: var(--text-primary);
	}
	
	/* Label trong log update */
	.log-label {
		/* Thay #374151 */
		color: var(--text-primary);
	}

	/* Text phụ (action, time) */
	.action-text {
		/* Thay #6b7280 (gray-500) */
		color: var(--text-secondary);
	}

	.time-text {
		/* Thay #9ca3af (gray-400) */
		color: var(--text-hint);
	}

	/* --- Footer Actions --- */
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
		/* Thay #fff */
		background-color: var(--bg-surface);
		/* Thay #eee */
		border: 1px solid var(--border-color);
		/* Thêm màu chữ cho emoji */
		color: var(--text-primary);
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
		/* QUAN TRỌNG: Đảo màu icon đen -> trắng khi dark mode */
		filter: var(--icon-filter);
	}

	.comment-attachment-img {
		max-width: 200px;
		max-height: 300px;
		border-radius: 8px;
		/* Thay border cứng */
		border: 1px solid var(--border-color);
		display: block;
	}

	:deep(img) {
		max-width: 100%;
		height: auto;
	}

	.block {
		display: block;
	}

	.change-flow {
		display: block;
	}

	.part-container {
		display: inline;
	}

	.arrow-container {
		display: inline-block;
		margin: 0 8px;
	}

	.arrow-text {
		font-weight: bold;
		/* Thay #6b7280 */
		color: var(--text-secondary);
		font-size: 16px;
	}

	.inline-html {
		display: inline;
	}

	:deep(a) {
		color: #007aff;
		text-decoration: underline;
	}
</style>