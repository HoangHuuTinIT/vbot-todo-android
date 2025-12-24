//pages/todo/todo_detail.vue
<template>
	<view class="container" :class="{ 'theme-dark': isDark }">
		<view class="loading-bar" v-if="isLoading"></view>

		<view class="custom-header">
			<view @click="goBack" class="back-btn">
				<image src="/static/expand-arrow.png" class="back-icon" />
			</view>
			<text class="header-title">{{ $t('todo.todo_detail_title') }}</text>
			<view class="header-right">
			</view>
		</view>

		<view class="detail-header-content">
			<view class="header-top">
				<text class="header-code">#{{ form.code || '...' }}</text>
			</view>
			<textarea class="header-title-input" v-model="form.title" :placeholder="$t('todo.header_loading')"
				auto-height maxlength="256" confirm-type="done" :disabled="isDone" @confirm="onSaveTitle"
				@blur="onSaveTitle" placeholder-class="input-placeholder" />
		</view>

		<view class="detail-body">
			<view class="section-title">{{ $t('todo.desc_section') }}</view>
			<view class="section-block">
				<TodoEditor v-model="form.desc" :placeholder="$t('todo.desc_placeholder')" :read-only="isDone" />
				<view class="input-actions" style="margin-top: 10px;" v-if="!isDone">
					<AppButton type="primary" size="small" :loading="isSavingDescription"
						:label="isSavingDescription ? $t('common.saving') : $t('common.save')"
						@click="onSaveDescription" />
				</view>
			</view>

			<view class="section-title">{{ $t('todo.info_section') }}</view>
			<view class="info-group" :class="{ 'disabled-group': isDone }">
				<view class="flat-item">
					<view class="item-left">
						<image src="/static/checked-checkbox.png" class="item-icon">
						</image>
						<text class="item-label">{{ $t('todo.status') }}</text>
					</view>

					<view class="item-picker-box">
						<AppPicker :range="statusOptions" :value="form.statusIndex" @change="onStatusChange"
							:title="$t('todo.status')">
							<view class="picker-text" :class="{ 'disabled-text': isStatusDisabled }">
								{{ statusOptions[form.statusIndex] || $t('common.loading') }}
								<text v-if="!isStatusDisabled">▾</text>
							</view>
						</AppPicker>
					</view>
				</view>

				<view class="flat-item">
					<view class="item-left">
						<image src="/static/internet.png" class="item-icon"></image>
						<text class="item-label">{{ $t('todo.source') }}</text>
					</view>
					<view class="item-picker-box">
						<view class="picker-text disabled-text">
							{{ sourceOptions[form.sourceIndex] || '...' }}
						</view>
					</view>
				</view>

				<view class="flat-item">
					<view class="item-left">
						<image src="/static/user.png" class="item-icon"></image>
						<text class="item-label">{{ $t('todo.assignee') }}</text>
					</view>

					<view class="item-picker-box">
						<AppPicker :range="assigneeOptions" :value="form.assigneeIndex" @change="onAssigneeChange"
							:title="$t('todo.assignee')">
							<view class="picker-text">
								{{ (assigneeOptions.length > 0 && form.assigneeIndex > -1) ? assigneeOptions[form.assigneeIndex] : $t('common.loading') }}
								▾
							</view>
						</AppPicker>
					</view>
				</view>

				<TodoDatePicker v-model:dueDate="form.dueDate" v-model:notifyAt="form.notifyAt"
					@change="onDateUpdate" />
			</view>

			<view class="section-title">{{ $t('todo.customer_section') }}</view>
			<view class="info-group customer-block">
				<view v-if="isLoadingCustomer" class="loading-row">
					<text class="loading-text">{{ $t('todo.loading_crm') }}</text>
				</view>
				<view v-else-if="!form.customerCode" class="empty-row">
					<text>{{ $t('todo.no_customer_attached') }}</text>
				</view>
				<view v-else>
					<view class="flat-item">
						<view class="item-left">
							<image src="/static/user-male-circle.png" class="item-icon">
							</image>
							<text class="item-label">{{ $t('todo.customer_name_label') }}</text>
						</view>
						<view class="item-right-text">{{ form.customerName }}</view>
					</view>
					<view class="flat-item">
						<view class="item-left">
							<image src="/static/phone.png" class="item-icon"></image>
							<text class="item-label">{{$t('todo.customer_phone_label') }}</text>
						</view>
						<view class="item-right-text phone-text">{{ form.customerPhone }}</view>
					</view>
					<view class="flat-item">
						<view class="item-left">
							<image src="/static/manager.png" class="item-icon"></image>
							<text class="item-label">{{$t('todo.customer_manager_label') }}</text>
						</view>
						<view class="item-right-text highlight-text">
							{{ form.customerManagerName || $t('todo.manager_none') }}
						</view>
					</view>
				</view>
			</view>

			<view class="section-header-row">
				<view class="toggle-header" @click="toggleComments">
					<text class="section-title no-margin">{{ $t('todo.comments_activities') }}</text>
					<image src="/static/expand-arrow.png" class="toggle-icon" :class="{ 'open': isCommentsOpen }">
					</image>
				</view>

				<AppPicker :range="commentFilterOptions" :value="commentFilterIndex" @click.stop
					@change="onCommentFilterChange" :title="$t('common.filter')">
					<view class="filter-badge">{{ commentFilterOptions[commentFilterIndex] }} ▾</view>
				</AppPicker>
			</view>

			<view class="comments-section" v-if="isCommentsOpen">
				<view class="comment-input-block" id="comment-input-anchor">
					<view class="editor-container">
						<TodoEditor ref="todoEditorRef" v-model="newCommentText"
							:placeholder="isEditingComment ? $t('todo.comment_placeholder_edit') : (isReplying ? $t('todo.comment_placeholder_reply') : $t('todo.comment_placeholder_write'))" />
					</view>
					<view v-if="isEditingComment" class="editing-alert">
						<text class="editing-text">{{ $t('todo.editing_alert') }} <text
								class="editing-name">{{ editingMemberName }}</text></text>
					</view>
					<view v-if="isReplying && replyingCommentData" class="reply-alert">
						<view class="reply-info">
							<text class="reply-label">{{ $t('todo.replying_alert') }} </text>
							<text class="reply-name">{{ replyingMemberName }}</text>
						</view>
						<view class="reply-quote">
							<text class="quote-icon">“</text>
							<rich-text :nodes="replyingMessagePreview" class="quote-content"></rich-text>
							<text class="quote-icon">”</text>
						</view>
					</view>

					<view class="input-actions">
						<AppButton v-if="!isEditingComment && !isReplying" type="primary" size="small"
							:loading="isSubmittingComment"
							:label="isSubmittingComment ? $t('common.saving') : $t('common.save')"
							@click="submitComment" />
						<view v-else-if="isEditingComment" class="edit-actions-row">
							<AppButton type="secondary" size="small" :label="$t('common.cancel')"
								:disabled="isSubmittingComment" @click="onCancelEditComment" />
							<AppButton type="primary" size="small" :loading="isSubmittingComment"
								:label="isSubmittingComment ? $t('common.saving') : $t('todo.update_btn')"
								@click="submitUpdateComment" />
						</view>
						<view v-else-if="isReplying" class="edit-actions-row">
							<AppButton type="secondary" size="small" :label="$t('common.cancel')"
								:disabled="isSubmittingComment" @click="onCancelReply" />
							<AppButton type="primary" size="small" :loading="isSubmittingComment"
								:label="isSubmittingComment ? $t('common.saving') : $t('todo.reply_btn')"
								@click="submitReply" />
						</view>
					</view>
				</view>

				<view class="divider-line"></view>

				<view v-if="isLoadingComments" class="loading-row">
					<text>{{ $t('todo.loading_comments') }}</text>
				</view>
				<view v-else-if="comments.length === 0" class="empty-row">
					<text>{{ $t('todo.no_comments') }}</text>
				</view>
				<view v-else>
					<CommentItem v-for="item in comments" :key="item.id" :data="item" @react="onToggleEmojiPicker"
						@reply="(data) => handleReply(data)" @edit="(data) => handleEdit(data)"
						@delete="(id) => onRequestDeleteComment(id)" />
				</view>
			</view>

			<view class="section-header-row">
				<view class="toggle-header" @click="toggleHistory">
					<text class="section-title no-margin">{{ $t('todo.history_section') }}</text>
					<image src="/static/expand-arrow.png" class="toggle-icon" :class="{ 'open': isHistoryOpen }">
					</image>
				</view>

				<AppPicker :range="historyFilterOptions" :value="historyFilterIndex" @click.stop
					@change="onHistoryFilterChange" :title="$t('common.filter')">
					<view class="filter-badge">{{ historyFilterOptions[historyFilterIndex] }} ▾</view>
				</AppPicker>
			</view>

			<view class="history-container" v-if="isHistoryOpen">
				<view v-if="isLoadingHistory" class="loading-row">
					<text class="loading-text">{{ $t('todo.loading_history') }}</text>
				</view>

				<view v-else-if="historyList.length === 0" class="empty-row">
					<text>{{ $t('todo.no_history') }}</text>
				</view>

				<view v-else class="timeline-list">
					<view v-for="(item, index) in historyList" :key="item.id" class="timeline-item">
						<view class="timeline-line" v-if="index !== historyList.length - 1"></view>
						<view class="timeline-dot"></view>
						<view class="timeline-content">
							<view class="timeline-header">
								<text class="t-actor">{{ item.actorName }}</text>
								<text class="t-time">{{ item.timeStr }}</text>
							</view>
							<text class="t-action">{{ item.content }}</text>
						</view>
					</view>
				</view>
			</view>

			<view style="height: 50px;"></view>
		</view>

		<ConfirmModal v-model:visible="isConfirmCancelEditOpen" :title="$t('todo.cancel_edit_title')"
			:message="$t('todo.cancel_edit_msg')" :cancel-label="$t('todo.continue_edit')"
			:confirm-label="$t('common.cancel_action')" confirm-type="danger" @cancel="continueEditing"
			@confirm="confirmCancelEdit" />

		<ConfirmModal v-model:visible="isConfirmCancelReplyOpen" :title="$t('todo.cancel_reply_title')"
			:message="$t('todo.cancel_reply_msg')" :cancel-label="$t('todo.continue_reply')"
			:confirm-label="$t('common.cancel_action')" confirm-type="danger" @cancel="continueReplying"
			@confirm="confirmCancelReply" />

		<ConfirmModal v-model:visible="isConfirmDeleteCommentOpen" :title="$t('todo.delete_comment_title')"
			:message="$t('todo.delete_comment_msg')" confirm-type="danger" @confirm="confirmDeleteComment"
			@cancel="cancelDeleteComment" />

		<view class="modal-overlay" v-if="isEmojiPickerOpen" @click="closeEmojiPicker">
			<view class="emoji-picker-container" @click.stop>
				<view class="emoji-grid">
					<view v-for="(emoji, index) in emojiList" :key="index" class="emoji-item"
						@click="selectEmoji(emoji)">{{ emoji }}</view>
				</view>
			</view>
		</view>
		<GlobalMessage />
		<GlobalNotification />
	</view>
</template>

<script setup lang="ts">
	import { ref, nextTick, computed } from 'vue';
	import { useTodoDetailController } from '@/controllers/todo_detail';
	import TodoEditor from '@/components/Todo/TodoEditor.vue';
	import TodoDatePicker from '@/components/Todo/TodoDatePicker.vue';
	import UserAvatar from '@/components/UserAvatar.vue';
	import CommentItem from '@/components/Todo/CommentItem.vue';
	import AppButton from '@/components/AppButton.vue';
	import GlobalMessage from '@/components/GlobalMessage.vue';
	import ConfirmModal from '@/components/ConfirmModal.vue';
	import GlobalNotification from '@/components/GlobalNotification.vue';
	import AppPicker from '@/components/AppPicker.vue';
	import { useAuthStore } from '@/stores/auth';
	const authStore = useAuthStore();
	const isDark = computed(() => authStore.isDark);
	const {
		isLoading, isLoadingCustomer,
		isLoadingHistory, historyList,
		form,
		statusOptions, sourceOptions, assigneeOptions,
		onStatusChange, onSourceChange, onAssigneeChange,
		saveTodo,
		historyFilterOptions, historyFilterIndex, onHistoryFilterChange,
		comments, isLoadingComments,
		newCommentText, isSubmittingComment, submitComment,
		isConfirmDeleteCommentOpen,
		onRequestDeleteComment,
		confirmDeleteComment,
		cancelDeleteComment,
		currentUserId,
		isEditingComment, onRequestEditComment, submitUpdateComment, onCancelEditComment,
		isConfirmCancelEditOpen, continueEditing, confirmCancelEdit,
		editingMemberName,

		isEmojiPickerOpen,
		emojiList,
		onToggleEmojiPicker,
		closeEmojiPicker,
		selectEmoji,

		isReplying,
		replyingMemberName,
		replyingCommentData,
		onRequestReply,
		onCancelReply,
		submitReply,
		isConfirmCancelReplyOpen,
		continueReplying,
		confirmCancelReply,

		commentFilterIndex,
		commentFilterOptions,
		onCommentFilterChange,

		isSavingDescription,
		onSaveDescription,

		onDateUpdate,
		isStatusDisabled,
		onSaveTitle,
		replyingMessagePreview,
		isHistoryOpen,
		toggleHistory, goBack, isDone,
	} = useTodoDetailController();
	const isCommentsOpen = ref(false);
	const scrollTarget = ref('');
	const toggleComments = () => {
		isCommentsOpen.value = !isCommentsOpen.value;
	};
	const todoEditorRef = ref<any>(null);
	const scrollToInput = () => {
		if (!isCommentsOpen.value) {
			isCommentsOpen.value = true;
		}
		setTimeout(() => {
			const query = uni.createSelectorQuery();
			query.select('#comment-input-anchor').boundingClientRect((data) => {
				if (data) {
					uni.createSelectorQuery().selectViewport().scrollOffset((res) => {
						if (res) {
							let topPosition = res.scrollTop + data.top - 100;

							uni.pageScrollTo({
								scrollTop: topPosition,
								duration: 300,
							});
						}
					}).exec();
				}
			}).exec();
		}, 150);
	};
	const handleReply = (data : any) => {
		onRequestReply(data);
		scrollToInput();
	};

	const handleEdit = (data : any) => {
		onRequestEditComment(data.id);
		scrollToInput();
	};
</script>
<style lang="scss" scoped>
	/* Import theme variables */
	@import '@/common/theme.scss';

	/* --- CONTAINER & LAYOUT --- */
	.container {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-color: var(--bg-page);
		/* Thay #f5f5f7 */
	}

	.detail-body {
		flex: 1;
		padding: 15px;
		box-sizing: border-box;
	}

	/* --- HEADER --- */
	.custom-header {
		height: 44px;
		background-color: var(--bg-surface);
		/* Thay #fff */
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10px;
		padding-top: var(--status-bar-height);
		border-bottom: 1px solid var(--border-color);
		/* Thay #eee */
		position: sticky;
		top: 0;
		z-index: 100;
	}

	.back-btn {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.back-icon {
		width: 20px;
		height: 20px;
		transform: rotate(90deg);
		filter: var(--icon-filter);
		/* Đảo màu icon */
	}

	.header-title {
		font-size: 17px;
		font-weight: bold;
		color: var(--text-primary);
		/* Thay #333 */
	}

	.header-right {
		width: 40px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.detail-header-content {
		background-color: var(--bg-surface);
		/* Thay #fff */
		padding: 15px 15px 10px 15px;
		border-bottom: 1px solid var(--border-color);
		/* Thay #eee */
	}

	.header-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.header-code {
		font-size: 13px;
		color: var(--text-secondary);
		/* Thay #888 */
		font-weight: bold;
		background: var(--bg-tag);
		/* Thay #f0f0f0 */
		padding: 2px 6px;
		border-radius: 4px;
	}

	.header-title-input {
		font-size: 18px;
		font-weight: bold;
		color: var(--text-primary);
		/* Thay #333 */
		width: 100%;
		min-height: 30px;
		line-height: 1.4;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.header-title-input[disabled] {
		color: var(--text-secondary);
		/* Thay #666 */
	}

	.input-placeholder {
		color: var(--text-hint);
	}

	/* --- SECTIONS --- */
	.section-block {
		margin-bottom: 20px;
	}

	.section-title {
		font-size: 14px;
		font-weight: bold;
		color: var(--text-secondary);
		/* Thay #666 */
		margin-bottom: 10px;
		margin-left: 5px;
		text-transform: uppercase;
	}

	.section-title.no-margin {
		margin-bottom: 0;
	}

	.info-group {
		background-color: var(--bg-surface);
		/* Thay #fff */
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
		margin-bottom: 20px;
	}

	.disabled-group {
		opacity: 0.7;
		pointer-events: none;
		background-color: var(--bg-input);
		/* Thay #f9f9f9 */
	}

	.flat-item {
		background-color: var(--bg-surface);
		/* Thay #fff */
		padding: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid var(--border-color);
		/* Thay #f5f5f5 */
	}

	.flat-item:last-child {
		border-bottom: none;
	}

	.item-left {
		display: flex;
		align-items: center;
		min-width: 120px;
	}

	.item-icon {
		width: 20px;
		height: 20px;
		opacity: 0.5;
		margin-right: 10px;
		filter: var(--icon-filter);
		/* Đảo màu icon */
	}

	.item-label {
		font-size: 15px;
		color: var(--text-primary);
		/* Thay #333 */
	}

	.item-picker-box {
		flex: 1;
		text-align: right;
	}

	.picker-text {
		font-size: 15px;
		color: #007aff;
		font-weight: 500;
	}

	.disabled-text {
		color: var(--text-hint) !important;
		pointer-events: none;
	}

	.customer-block {
		min-height: 80px;
		background: var(--bg-surface);
		/* Thay #fff */
	}

	.item-right-text {
		font-size: 15px;
		color: var(--text-primary);
		/* Thay #333 */
		font-weight: 500;
		text-align: right;
		flex: 1;
	}

	.phone-text {
		color: #007aff;
	}

	.highlight-text {
		color: #ff9500;
		font-weight: bold;
	}

	.loading-row,
	.empty-row {
		padding: 20px;
		text-align: center;
		color: var(--text-hint);
		/* Thay #999 */
		font-size: 14px;
		font-style: italic;
	}

	/* --- HISTORY TIMELINE --- */
	.history-container {
		background-color: var(--bg-surface);
		/* Thay #fff */
		border-radius: 8px;
		padding: 20px 15px;
		margin-bottom: 20px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
	}

	.timeline-list {
		position: relative;
	}

	.timeline-item {
		display: flex;
		position: relative;
		padding-bottom: 25px;
	}

	.timeline-item:last-child {
		padding-bottom: 0;
	}

	.timeline-dot {
		width: 10px;
		height: 10px;
		background-color: #007aff;
		border-radius: 50%;
		margin-top: 5px;
		z-index: 2;
		flex-shrink: 0;
	}

	.timeline-line {
		position: absolute;
		left: 4px;
		top: 15px;
		bottom: 0;
		width: 2px;
		background-color: var(--border-color);
		/* Thay #e5e5ea */
		z-index: 1;
	}

	.timeline-content {
		margin-left: 15px;
		flex: 1;
	}

	.timeline-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 4px;
	}

	.t-actor {
		font-size: 15px;
		font-weight: bold;
		color: var(--text-primary);
		/* Thay #333 */
	}

	.t-time {
		font-size: 12px;
		color: var(--text-hint);
		/* Thay #999 */
	}

	.t-action {
		font-size: 14px;
		color: var(--text-secondary);
		/* Thay #555 */
		line-height: 1.4;
	}

	/* --- COMMENTS SECTION --- */
	.section-header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		margin-left: 5px;
		margin-right: 5px;
	}

	.filter-badge {
		background-color: #e3f2fd;
		color: #007aff;
		font-size: 13px;
		font-weight: 600;
		padding: 4px 10px;
		border-radius: 15px;
		display: flex;
		align-items: center;
	}

	/* Dark mode override for badge */
	:global(.theme-dark) .filter-badge {
		background-color: rgba(0, 122, 255, 0.2);
	}

	.comments-section {
		background-color: var(--bg-surface);
		/* Thay #fff */
		padding: 15px;
		margin-bottom: 20px;
		border-radius: 8px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
	}

	.comment-input-block {
		margin-bottom: 20px;
	}

	.editor-container {
		margin-bottom: 10px;
		border: 1px solid var(--border-color);
		/* Thay #eee */
		border-radius: 8px;
		overflow: hidden;
	}

	.input-actions {
		display: flex;
		justify-content: flex-end;
	}

	.btn-save-comment {
		background-color: #007aff;
		color: #fff;
		font-size: 13px;
		font-weight: bold;
		padding: 0 20px;
		height: 32px;
		line-height: 32px;
		border-radius: 16px;
		border: none;
	}

	.divider-line {
		height: 1px;
		background-color: var(--border-color);
		/* Thay #eee */
		margin: 15px 0 20px 0;
	}

	/* --- ALERTS (Editing / Reply) --- */
	.editing-alert {
		margin-bottom: 10px;
		padding: 8px 12px;
		background-color: #fff7e6;
		border-radius: 6px;
		border: 1px solid #ffd591;
	}

	:global(.theme-dark) .editing-alert {
		background-color: rgba(212, 136, 6, 0.15);
		border-color: #d48806;
	}

	.editing-text {
		font-size: 13px;
		color: #d48806;
	}

	.reply-alert {
		margin-bottom: 10px;
		padding: 10px 12px;
		background-color: #e6f7ff;
		border-radius: 8px;
		border-left: 4px solid #1890ff;
	}

	:global(.theme-dark) .reply-alert {
		background-color: rgba(24, 144, 255, 0.15);
	}

	.reply-info {
		margin-bottom: 5px;
		font-size: 13px;
	}

	.reply-label {
		color: var(--text-secondary);
		/* Thay #666 */
	}

	.reply-name {
		font-weight: bold;
		color: #1890ff;
	}

	.reply-quote {
		font-style: italic;
		color: var(--text-secondary);
		/* Thay #555 */
		font-size: 13px;
		background-color: rgba(255, 255, 255, 0.6);
		padding: 4px 8px;
		border-radius: 4px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	:global(.theme-dark) .reply-quote {
		background-color: rgba(255, 255, 255, 0.05);
	}

	.quote-icon {
		font-size: 16px;
		color: var(--text-hint);
		/* Thay #999 */
		font-weight: bold;
	}

	.quote-content {
		display: inline;
	}

	/* --- TOGGLES & ACTIONS --- */
	.toggle-header {
		display: flex;
		align-items: center;
		padding: 5px 0;
	}

	.toggle-icon {
		width: 16px;
		height: 16px;
		margin-left: 8px;
		opacity: 0.6;
		transition: transform 0.3s ease;
		transform: rotate(-90deg);
		filter: var(--icon-filter);
		/* Đảo màu icon */
	}

	.toggle-icon.open {
		transform: rotate(0deg);
		opacity: 1;
	}

	.edit-actions-row {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.btn-cancel-edit {
		background-color: var(--bg-input);
		/* Thay #f5f5f5 */
		color: var(--text-secondary);
		/* Thay #666 */
		font-size: 13px;
		font-weight: bold;
		padding: 0 15px;
		height: 32px;
		line-height: 32px;
		border-radius: 16px;
		border: 1px solid var(--border-input);
		/* Thay #ddd */
	}

	/* --- EMOJI PICKER --- */
	.emoji-picker-container {
		background-color: var(--bg-surface);
		/* Thay #fff */
		border-radius: 12px;
		padding: 15px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
		z-index: 10000;
		width: 80%;
		max-width: 300px;
		animation: popIn 0.2s ease-out;
	}

	.emoji-grid {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		gap: 10px;
	}

	.emoji-item {
		font-size: 28px;
		padding: 5px;
		cursor: pointer;
		transition: transform 0.1s;
	}

	.emoji-item:active {
		transform: scale(1.2);
	}

	/* --- LOADING OVERLAY --- */
	.loading-bar {
		position: fixed;
		top: 0;
		left: 0;
		height: 3px;
		background-color: #007aff;
		z-index: 9999;
		animation: loading-animation 1.5s infinite ease-in-out;
		width: 100%;
	}

	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@keyframes loading-animation {
		0% {
			width: 0%;
			left: 0;
		}

		50% {
			width: 50%;
			left: 25%;
		}

		100% {
			width: 100%;
			left: 100%;
		}
	}

	@keyframes popIn {
		from {
			transform: scale(0.9);
			opacity: 0;
		}

		to {
			transform: scale(1);
			opacity: 1;
		}
	}

	/* Legacy/Unused classes kept for safety */
	.comment-thread {
		margin-bottom: 20px;
		border-bottom: 1px dashed #f0f0f0;
		padding-bottom: 15px;
	}

	.comment-thread:last-child {
		border-bottom: none;
		margin-bottom: 0;
	}

	.comment-row {
		display: flex;
		align-items: flex-start;
	}

	.avatar-char.small-char {
		font-size: 14px;
	}

	.c-action {
		font-size: 13px;
		color: #666;
	}

	.c-edited {
		font-size: 11px;
		color: #aaa;
		font-style: italic;
		margin-left: 5px;
	}

	.c-action-row {
		display: block;
		font-size: 12px;
		color: #888;
		margin-bottom: 4px;
	}

	.reaction-row {
		display: flex;
		gap: 5px;
		margin-top: 5px;
		flex: 1;
	}

	.emoji-tag {
		background-color: #fff;
		border: 1px solid #eee;
		border-radius: 10px;
		padding: 2px 6px;
		font-size: 12px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.replies-wrapper {
		margin-top: 12px;
		padding-left: 50px;
	}

	.child-row {
		margin-bottom: 10px;
	}

	.btn-delete {
		padding: 4px 8px;
		opacity: 0.6;
	}

	.btn-delete:active {
		opacity: 1;
	}

	.icon-trash {
		width: 16px;
		height: 16px;
	}

	.flex-1 {
		flex: 1;
	}

	.modal-btn.cancel {
		color: #666;
		border-right: 1px solid #eee;
	}

	.modal-btn.confirm {
		color: #ff3b30;
		font-weight: bold;
	}

	.mr-3 {
		margin-right: 12px;
	}

	.mr-2 {
		margin-right: 12px;
	}

	.btn-icon-action {
		padding: 4px;
		opacity: 0.6;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-icon-action:active {
		opacity: 1;
	}

	.icon-action {
		width: 18px;
		height: 18px;
	}

	.action-buttons-container {
		display: flex;
		gap: 15px;
		align-items: center;
		margin-left: auto;
	}

	.quote-content {
		display: inline;
	}

	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.8);
		z-index: 9999 !important;
		display: flex;
		justify-content: center;
		align-items: center;
		color: #007aff;
		font-weight: bold;
	}

	.loading-section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #fff;
	}

	.loading-text-large {
		color: #007aff;
		font-weight: 500;
		font-size: 16px;
	}
</style>