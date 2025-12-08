//pages/todo/todo_detail.vue
<template>
	<view class="container">
		<view class="loading-bar" v-if="isLoading"></view>

		<view class="detail-header">
		    <view class="header-top">
		        <text class="header-code">#{{ form.code || '...' }}</text>
		    </view>
		    
		    <textarea 
		        class="header-title-input" 
		        v-model="form.title" 
		        placeholder="Đang tải tên công việc..." 
		        auto-height 
		        maxlength="256"
		        confirm-type="done"
		        @confirm="onSaveTitle"
		        @blur="onSaveTitle"
		    />
		</view>

		<view class="detail-body">

			<view class="section-title">Mô tả</view>
			<view class="section-block">
				<TodoEditor v-model="form.desc" placeholder="Nhập mô tả công việc..." />
				<view class="input-actions" style="margin-top: 10px;">
					<AppButton type="primary" size="small" :loading="isSavingDescription"
						:label="isSavingDescription ? 'Đang lưu...' : 'Lưu lại'" @click="onSaveDescription" />
				</view>
			</view>

			<view class="section-title">Thông tin công việc</view>
			<view class="info-group">
				<view class="flat-item">
					<view class="item-left">
						<image src="https://img.icons8.com/ios/50/666666/checked-checkbox.png" class="item-icon"></image>
						<text class="item-label">Trạng thái</text>
					</view>
					<picker mode="selector" :range="statusOptions" :value="form.statusIndex" :disabled="isStatusDisabled" @change="onStatusChange" class="item-picker-box">
						<view class="picker-text" :class="{ 'disabled-text': isStatusDisabled }">
							{{ statusOptions[form.statusIndex] || 'Đang tải...' }}
							<text v-if="!isStatusDisabled">▾</text>
						</view>
					</picker>
				</view>
				
				<view class="flat-item">
					<view class="item-left">
						<image src="https://img.icons8.com/ios/50/666666/internet.png" class="item-icon"></image>
						<text class="item-label">Nguồn</text>
					</view>
					<view class="item-picker-box">
						<view class="picker-text disabled-text">
							{{ sourceOptions[form.sourceIndex] || '...' }}
						</view>
					</view>
				</view>

				<view class="flat-item">
					<view class="item-left">
						<image src="https://img.icons8.com/ios/50/666666/user.png" class="item-icon"></image>
						<text class="item-label">Người được giao</text>
					</view>
					<picker mode="selector" :range="assigneeOptions" :value="form.assigneeIndex" @change="onAssigneeChange" class="item-picker-box">
						<view class="picker-text">
							{{ (assigneeOptions.length > 0 && form.assigneeIndex > -1) ? assigneeOptions[form.assigneeIndex] : 'Đang tải...' }} ▾
						</view>
					</picker>
				</view>

				<TodoDatePicker v-model:dueDate="form.dueDate" v-model:notifyDate="form.notifyDate" v-model:notifyTime="form.notifyTime" @change="onDateUpdate" />
			</view>

			<view class="section-title">Thông tin khách hàng</view>
			<view class="info-group customer-block">
				<view v-if="isLoadingCustomer" class="loading-row">
					<text class="loading-text">⏳ Đang tải thông tin từ CRM...</text>
				</view>
				<view v-else-if="!form.customerCode" class="empty-row">
					<text>(Công việc này chưa gắn với khách hàng nào)</text>
				</view>
				<view v-else>
					<view class="flat-item">
						<view class="item-left">
							<image src="https://img.icons8.com/ios/50/666666/user-male-circle.png" class="item-icon"></image>
							<text class="item-label">{{ form.customerNameLabel || 'Khách hàng' }}</text>
						</view>
						<view class="item-right-text">{{ form.customerName }}</view>
					</view>
					<view class="flat-item">
						<view class="item-left">
							<image src="https://img.icons8.com/ios/50/666666/phone.png" class="item-icon"></image>
							<text class="item-label">{{ form.customerPhoneLabel || 'SĐT' }}</text>
						</view>
						<view class="item-right-text phone-text">{{ form.customerPhone }}</view>
					</view>
					<view class="flat-item">
						<view class="item-left">
							<image src="https://img.icons8.com/ios/50/666666/manager.png" class="item-icon"></image>
							<text class="item-label">{{ form.customerManagerLabel || 'Phụ trách' }}</text>
						</view>
						<view class="item-right-text highlight-text">
							{{ form.customerManagerName || '(Chưa có)' }}
						</view>
					</view>
				</view>
			</view>

			<view class="section-header-row">
				<view class="toggle-header" @click="toggleComments">
					<text class="section-title no-margin">Bình luận và hoạt động</text>
					<image src="https://img.icons8.com/ios-glyphs/30/666666/expand-arrow--v1.png" class="toggle-icon" :class="{ 'open': isCommentsOpen }"></image>
				</view>
				<picker mode="selector" :range="commentFilterOptions" :value="commentFilterIndex" @click.stop @change="onCommentFilterChange">
					<view class="filter-badge">{{ commentFilterOptions[commentFilterIndex] }} ▾</view>
				</picker>
			</view>

			<view class="comments-section" v-if="isCommentsOpen">
				<view class="comment-input-block" id="comment-input-anchor">
					<view class="editor-container">
						<TodoEditor v-model="newCommentText" :placeholder="isEditingComment ? 'Đang chỉnh sửa...' : (isReplying ? 'Viết câu trả lời...' : 'Viết bình luận')" />
					</view>
					<view v-if="isEditingComment" class="editing-alert">
						<text class="editing-text">Đang chỉnh sửa bình luận của <text class="editing-name">{{ editingMemberName }}</text></text>
					</view>
					<view v-if="isReplying && replyingCommentData" class="reply-alert">
					    <view class="reply-info">
					        <text class="reply-label">Đang trả lời bình luận của </text>
					        <text class="reply-name">{{ replyingMemberName }}</text>
					    </view>
					    <view class="reply-quote">
					        <text class="quote-icon">“</text>
					        
					        <rich-text :nodes="replyingMessagePreview" class="quote-content"></rich-text>
					        
					        <text class="quote-icon">”</text>
					    </view>
					</view>

					<view class="input-actions">
						<AppButton v-if="!isEditingComment && !isReplying" type="primary" size="small" :loading="isSubmittingComment" :label="isSubmittingComment ? 'Đang lưu...' : 'Lưu lại'" @click="submitComment" />
						<view v-else-if="isEditingComment" class="edit-actions-row">
							<AppButton type="secondary" size="small" label="Hủy" :disabled="isSubmittingComment" @click="onCancelEditComment" />
							<AppButton type="primary" size="small" :loading="isSubmittingComment" :label="isSubmittingComment ? 'Đang cập nhật...' : 'Cập nhật'" @click="submitUpdateComment" />
						</view>
						<view v-else-if="isReplying" class="edit-actions-row">
							<AppButton type="secondary" size="small" label="Hủy" :disabled="isSubmittingComment" @click="onCancelReply" />
							<AppButton type="primary" size="small" :loading="isSubmittingComment" :label="isSubmittingComment ? 'Đang gửi...' : 'Trả lời'" @click="submitReply" />
						</view>
					</view>
				</view>

				<view class="divider-line"></view>

				<view v-if="isLoadingComments" class="loading-row">
					<text>⏳ Đang tải bình luận...</text>
				</view>
				<view v-else-if="comments.length === 0" class="empty-row">
					<text>Chưa có bình luận nào.</text>
				</view>
				<view v-else>
					<CommentItem v-for="item in comments" :key="item.id" :data="item" @react="onToggleEmojiPicker" @reply="(data) => handleReply(data)" @edit="(data) => handleEdit(data)" @delete="(id) => onRequestDeleteComment(id)" />
				</view>
			</view>

			<view class="section-header-row">
			    <view class="toggle-header" @click="toggleHistory">
			        <text class="section-title no-margin">Lịch sử tương tác khách hàng</text>
			        <image 
			            src="https://img.icons8.com/ios-glyphs/30/666666/expand-arrow--v1.png" 
			            class="toggle-icon" 
			            :class="{ 'open': isHistoryOpen }"
			        ></image>
			    </view>
			    
			    <picker mode="selector" :range="historyFilterOptions" :value="historyFilterIndex" @click.stop @change="onHistoryFilterChange">
			        <view class="filter-badge">{{ historyFilterOptions[historyFilterIndex] }} ▾</view>
			    </picker>
			</view>
			
			<view class="history-container" v-if="isHistoryOpen">
			                <view v-if="isLoadingHistory" class="loading-row">
								<text class="loading-text">⏳ Đang tải lịch sử...</text>
							</view>
			
			                <view v-else-if="historyList.length === 0" class="empty-row">
								<text>(Không tìm thấy dữ liệu)</text>
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

		<ConfirmModal v-model:visible="isConfirmCancelEditOpen" title="Xác nhận hủy" message="Bạn có chắc muốn hủy chỉnh sửa? Các thay đổi sẽ không được lưu." cancel-label="Tiếp tục sửa" confirm-label="Hủy bỏ" confirm-type="danger" @cancel="continueEditing" @confirm="confirmCancelEdit" />
		<ConfirmModal v-model:visible="isConfirmCancelReplyOpen" title="Hủy trả lời" message="Bạn có chắc muốn hủy trả lời? Nội dung đã nhập sẽ bị mất." cancel-label="Tiếp tục viết" confirm-label="Hủy bỏ" confirm-type="danger" @cancel="continueReplying" @confirm="confirmCancelReply" />
		<ConfirmModal v-model:visible="isConfirmDeleteCommentOpen" title="Xác nhận xóa" message="Bạn có chắc muốn xóa bình luận này không?" confirm-type="danger" @confirm="confirmDeleteComment" @cancel="cancelDeleteComment" />
		
		<view class="modal-overlay" v-if="isEmojiPickerOpen" @click="closeEmojiPicker">
			<view class="emoji-picker-container" @click.stop>
				<view class="emoji-grid">
					<view v-for="(emoji, index) in emojiList" :key="index" class="emoji-item" @click="selectEmoji(emoji)">{{ emoji }}</view>
				</view>
			</view>
		</view>
		<GlobalMessage />
	</view>
</template>

<script setup lang="ts">
	import { ref, nextTick } from 'vue';
	import { useTodoDetailController } from '@/controllers/todo_detail';
	import TodoEditor from '@/components/Todo/TodoEditor.vue';
	import TodoDatePicker from '@/components/Todo/TodoDatePicker.vue';
	import UserAvatar from '@/components/UserAvatar.vue';
	import CommentItem from '@/components/Todo/CommentItem.vue';
	import AppButton from '@/components/AppButton.vue';
	import GlobalMessage from '@/components/GlobalMessage.vue';
	import ConfirmModal from '@/components/ConfirmModal.vue';
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
		isHistoryOpen,  // <-- Thêm vào đây
		        toggleHistory,
	} = useTodoDetailController();
	const isCommentsOpen = ref(false);
	const scrollTarget = ref('');
	const toggleComments = () => {
		isCommentsOpen.value = !isCommentsOpen.value;
	};
	const scrollToInput = () => {
	        if (!isCommentsOpen.value) {
	            isCommentsOpen.value = true;
	        }
	        scrollTarget.value = '';
	        setTimeout(() => {
	            scrollTarget.value = 'comment-input-anchor';
	        }, 100);
	    };

	    const handleReply = (data: any) => {
	        onRequestReply(data);
	        scrollToInput();
	    };
	
	    const handleEdit = (data: any) => {
	        onRequestEditComment(data.id);
	        scrollToInput();
	    };
</script>

<style lang="scss" scoped>
	.container {
	     
			min-height: 100vh; 
			display: flex;
			flex-direction: column;
			background-color: #f5f5f7;
		}

	.detail-header {
			background-color: #fff;
			padding: 15px 15px 10px 15px;
			border-bottom: 1px solid #eee;
	        position: sticky; 
	        top: 0;
	        z-index: 100;
		}

	.header-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 8px;
	}

	.header-code {
		font-size: 13px;
		color: #888;
		font-weight: bold;
		background: #f0f0f0;
		padding: 2px 6px;
		border-radius: 4px;
	}

	.btn-text {
		color: #007aff;
		font-weight: bold;
		font-size: 15px;
	}

	.header-title-input {
		font-size: 18px;
		font-weight: bold;
		color: #333;
		width: 100%;
		min-height: 30px;
		line-height: 1.4;
		white-space: pre-wrap;
		word-break: break-word;
	}

	.detail-body {
			flex: 1;
			padding: 15px;
			box-sizing: border-box;
	    
		}

	.section-block {
		margin-bottom: 20px;
	}

	.section-title {
		font-size: 14px;
		font-weight: bold;
		color: #666;
		margin-bottom: 10px;
		margin-left: 5px;
		text-transform: uppercase;
	}

	.info-group {
		background-color: #fff;
		border-radius: 8px;
		overflow: hidden;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
		margin-bottom: 20px;
	}

	.flat-item {
		background-color: #fff;
		padding: 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid #f5f5f5;
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
	}

	.item-label {
		font-size: 15px;
		color: #333;
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

	.customer-block {
		min-height: 80px;
		background: #fff;
	}

	.item-right-text {
		font-size: 15px;
		color: #333;
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
		color: #999;
		font-size: 14px;
		font-style: italic;
	}

	.history-container {
		background-color: #fff;
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
		background-color: #e5e5ea;
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
		color: #333;
	}

	.t-time {
		font-size: 12px;
		color: #999;
	}

	.t-action {
		font-size: 14px;
		color: #555;
		line-height: 1.4;
	}

	.section-header-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10px;
		margin-left: 5px;
		margin-right: 5px;
	}

	.section-title.no-margin {
		margin-bottom: 0;
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

	.comments-section {
		background-color: #fff;
		padding: 15px;
		margin-bottom: 20px;
		border-radius: 8px;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
	}

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

	.comment-input-block {
		margin-bottom: 20px;
	}

	.editor-container {

		margin-bottom: 10px;
	}

	.input-actions {
		display: flex;
		justify-content: flex-end;
	}



	.divider-line {
		height: 1px;
		background-color: #eee;
		margin: 15px 0 20px 0;
	}

	.comment-input-block {
		margin-bottom: 10px;
	}

	.editor-container {
		margin-bottom: 10px;
		border: 1px solid #eee;
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
		background-color: #eee;
		margin: 20px 0;
	}


	.reaction-row {
		flex: 1;
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

	.edit-actions-row {
		display: flex;
		gap: 10px;
		align-items: center;
	}

	.mr-3 {
		margin-right: 12px;
	}

	.mr-2 {
		margin-right: 12px;
	}

	.btn-cancel-edit {
		background-color: #f5f5f5;
		color: #666;
		font-size: 13px;
		font-weight: bold;
		padding: 0 15px;
		height: 32px;
		line-height: 32px;
		border-radius: 16px;
		border: 1px solid #ddd;
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

	.editing-alert {
		margin-bottom: 10px;
		padding: 8px 12px;
		background-color: #fff7e6;
		border-radius: 6px;
		border: 1px solid #ffd591;
	}

	.editing-text {
		font-size: 13px;
		color: #d48806;
	}

	.emoji-picker-container {
		background-color: #fff;
		border-radius: 12px;
		padding: 15px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);

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


	.action-buttons-container {
		display: flex;
		gap: 15px;
		align-items: center;

		margin-left: auto;
	}

	.reply-alert {
		margin-bottom: 10px;
		padding: 10px 12px;
		background-color: #e6f7ff;
		border-radius: 8px;
		border-left: 4px solid #1890ff;
	}

	.reply-info {
		margin-bottom: 5px;
		font-size: 13px;
	}

	.reply-label {
		color: #666;
	}

	.reply-name {
		font-weight: bold;
		color: #1890ff;
	}

	.reply-quote {
		font-style: italic;
		color: #555;
		font-size: 13px;
		background-color: rgba(255, 255, 255, 0.6);
		padding: 4px 8px;
		border-radius: 4px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.quote-icon {
		font-size: 16px;
		color: #999;
		font-weight: bold;
	}

	.quote-content {
		display: inline;
	}

	.picker-text {
		font-size: 15px;
		color: #007aff;
		font-weight: 500;
	}


	.disabled-text {
		color: #999 !important;
		pointer-events: none;
	}

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
	}

	.toggle-icon.open {
		transform: rotate(0deg);
		opacity: 1;
	}

	.loading-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(255, 255, 255, 0.8);
		z-index: 100;
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
	@keyframes loading-animation {
	        0% { width: 0%; left: 0; }
	        50% { width: 50%; left: 25%; }
	        100% { width: 100%; left: 100%; }
	    }
</style>