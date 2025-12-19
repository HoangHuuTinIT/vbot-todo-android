<template>
	<view class="container">
		<view class="header">
			<view class="header-left"></view>

			<text class="header-title">{{ $t('todo.page_title') }}</text>

			<view class="header-right">
				<view class="icon-btn" @click="openQuickComplete" style="margin-right: 15px;">
					<image src="/static/checked-checkbox.png" class="filter-icon" mode="aspectFit"></image>
				</view>

				<view class="icon-btn" @click="openFilter">
					<image src="/static/filter.png" class="filter-icon"></image>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="list-container">
				<view v-if="isLoading" class="loading-state">
					<text>{{ $t('common.loading') }}</text>
				</view>

				<view v-else-if="todos.length === 0" class="empty-state">
					<image src="/static/empty-box.png" mode="aspectFit" class="empty-icon"></image>
					<text class="empty-text">{{ $t('common.no_data') }}</text>
				</view>

				<scroll-view v-else scroll-y class="list-view">
					<view v-for="(item, index) in todos" :key="item.id || index" class="card-item"
						@click="goToDetail(item)">
						<view class="status-bar" :class="item.statusClass"></view>

						<view class="card-body">
							<view class="card-row top-row">
								<text class="card-title">{{ item.title }}</text>
								<view class="action-btn" @click.stop="openCustomMenu(item)">
									<text class="dots">•••</text>
								</view>
							</view>

							<view class="card-info-row">
								<image src="/static/create-time.png" class="icon-small"></image>
								<text class="card-date">
									{{ $t('todo.created_at') }}: {{ item.createdAtFormatted }}
								</text>
							</view>

							<view class="card-info-row" v-if="item.dueDateFormatted">
								<image src="/static/due-time.png" class="icon-small"></image>
								<text class="card-date text-danger">
									{{ $t('todo.expired_at') }}: {{ item.dueDateFormatted }}
								</text>
							</view>

							<view class="card-info-row" v-if="item.notifyAtFormatted">
								<image src="/static/notify-time.png" class="icon-small"></image>
								<text class="card-date text-primary">
									{{ $t('todo.notify_at') }}: {{ item.notifyAtFormatted }}
								</text>
							</view>

							<view class="card-row bot-row">
								<view class="code-tag">#{{ item.code }}</view>
								<StatusBadge :status="item.status" />
							</view>
						</view>
					</view>

					<view style="height: 20px;"></view>
				</scroll-view>
			</view>
			<Pagination :pageNo="pageNo" :pageSize="pageSize" :total="totalCount" :pageSizeOptions="pageSizeOptions"
				@changePage="onChangePage" @update:pageSize="onUpdatePageSize">
				<template #action>
					<view class="add-task-simple" @click="addNewTask">
						<text class="plus-icon">+</text>
						<text class="add-text">{{ $t('todo.add_task') }}</text>
					</view>
				</template>
			</Pagination>
		</view>
		<view class="filter-overlay" v-if="isFilterOpen" @click.stop="closeFilter">
			<view class="filter-panel" @click.stop>
				<view class="filter-header">
					<text class="filter-title">{{ $t('todo.filter_title') }}</text>
					<text class="close-btn" @click="closeFilter">✕</text>
				</view>

				<scroll-view scroll-y class="filter-body">
					<view class="f-group">
						<text class="f-label">{{ $t('todo.search_label') }}</text>
						<input class="f-input" v-model="filter.title" :placeholder="$t('todo.search_placeholder')" />
					</view>

					<view class="f-group">
						<text class="f-label">{{ $t('todo.code_prefix') }}</text>
						<input class="f-input" v-model="filter.jobCode"
							:placeholder="$t('todo.job_code_placeholder')" />
					</view>

					<view class="f-group">
						<text class="f-label">{{ $t('todo.status') }}</text>
						<picker mode="selector" :range="statusOptions" :value="statusIndex" @change="onStatusChange">
							<view class="f-picker">
								{{ statusOptions[statusIndex] }} <text class="arrow">▼</text>
							</view>
						</picker>
					</view>

					<view class="f-group">
						<text class="f-label">{{ $t('todo.creator') }}</text>
						<picker mode="selector" :range="creatorOptions" :value="creatorIndex" @change="onCreatorChange">
							<view class="f-picker">
								{{ creatorOptions[creatorIndex] }} <text class="arrow">▼</text>
							</view>
						</picker>
					</view>

					<view class="f-group">
						<text class="f-label">{{ $t('todo.customer') }}</text>
						<view class="f-input" @click="openCustomerPopup" style="justify-content: space-between;">
							<text :style="{ color: selectedCustomerName ? '#333' : '#999' }">
								{{ selectedCustomerName || $t('todo.select_customer') }}
							</text>
							<text class="arrow">›</text>
						</view>
					</view>

					<view class="f-group">
						<text class="f-label">{{ $t('todo.assignee') }}</text>
						<picker mode="selector" :range="assigneeOptions" :value="assigneeIndex"
							@change="onAssigneeChange">
							<view class="f-picker">
								{{ assigneeOptions[assigneeIndex] }} <text class="arrow">▼</text>
							</view>
						</picker>
					</view>

					<view class="f-group">
						<text class="f-label">{{ $t('todo.source') }}</text>
						<picker mode="selector" :range="sourceOptions" :value="sourceIndex" @change="onSourceChange">
							<view class="f-picker">
								{{ sourceOptions[sourceIndex] }} <text class="arrow">▼</text>
							</view>
						</picker>
					</view>

					<DateRangeFilter :title="$t('todo.time_create')" v-model:startDate="filter.createdFrom"
						v-model:endDate="filter.createdTo" />

					<DateRangeFilter :title="$t('todo.time_expired')" v-model:startDate="filter.dueDateFrom"
						v-model:endDate="filter.dueDateTo" />

					<DateRangeFilter :title="$t('todo.time_notify')" v-model:startDate="filter.notifyFrom"
						v-model:endDate="filter.notifyTo" />

					<view style="height: 20px;"></view>
				</scroll-view>

				<view class="filter-footer">
					<AppButton type="secondary" :label="$t('common.reset')" @click="resetFilter" />
					<AppButton type="primary" :label="$t('common.apply')" @click="applyFilter" />
				</view>
			</view>
		</view>
		<view class="filter-overlay" v-if="isQuickCompleteOpen" @click.stop="closeQuickComplete">
			<view class="filter-panel quick-panel" @click.stop>
				<view class="filter-header">
					<text class="filter-title">Đánh dấu hoàn thành nhanh</text>
					<text class="close-btn" @click="closeQuickComplete">✕</text>
				</view>

				<scroll-view scroll-y class="filter-body">
					<view v-if="isLoadingQuick" class="loading-state" style="height: 200px;">
						<text>{{ $t('common.loading') }}</text>
					</view>

					<view v-else-if="quickTodos.length === 0" class="empty-state" style="height: 200px;">
						<text class="empty-text">Không có công việc nào cần xử lý</text>
					</view>

					<view v-else class="quick-list">
						<view v-for="item in quickTodos" :key="item.id" class="quick-item">
							<view class="quick-info">
								<view class="quick-code">#{{ item.code }}</view>
								<view class="quick-title">{{ item.title }}</view>
							</view>

							<view class="quick-action">
								<button class="btn-complete" @click.stop="handleQuickMarkDone(item)">
									<text>Hoàn thành</text>
								</button>
							</view>
						</view>
						<view style="height: 40px;"></view>
					</view>
				</scroll-view>
			</view>
		</view>
		<CustomerModal :visible="showCustomerModal" :loading="loadingCustomer" :loadingMore="loadingMore"
			:customers="customerList" :managers="rawMemberList" @close="showCustomerModal = false"
			@select="onCustomerSelect" @filter="onFilterCustomerInModal" @loadMore="loadMoreCustomers" />

		<ConfirmModal v-model:visible="isConfirmDeleteOpen" :title="$t('common.notification')"
			:message="itemToDelete ? $t('todo.confirm_delete_msg').replace('{title}', itemToDelete.title) : ''"
			confirm-type="danger" :cancel-label="$t('common.cancel')" :confirm-label="$t('common.delete')"
			@confirm="confirmDelete" @cancel="cancelDelete" />

		<view class="custom-sheet-mask" :class="{ show: showCustomActionSheet }" @click="showCustomActionSheet = false">
			<view class="custom-sheet-panel" @click.stop>
				<view class="sheet-item delete" @click="handleCustomAction('delete')">
					<text>{{ $t('common.delete') }}</text>
				</view>

				<view class="sheet-gap"></view>

				<view class="sheet-item cancel" @click="showCustomActionSheet = false">
					<text>{{ $t('common.cancel') }}</text>
				</view>
			</view>
		</view>

		<GlobalMessage />
		<GlobalNotification />
	</view>
</template>



<script setup lang="ts">
	import { ref } from 'vue';
	import CustomerModal from '@/components/Todo/CustomerModal.vue';
	import { useListTodoController } from '@/controllers/list_todo';
	import StatusBadge from '@/components/StatusBadge.vue';
	import DateRangeFilter from '@/components/DateRangeFilter.vue';
	import AppButton from '@/components/AppButton.vue';
	import GlobalMessage from '@/components/GlobalMessage.vue';
	import ConfirmModal from '@/components/ConfirmModal.vue';
	import Pagination from '@/components/Pagination.vue';
	import GlobalNotification from '@/components/GlobalNotification.vue';
	import { useI18n } from 'vue-i18n';
	const {
		todos, isLoading, isFilterOpen, filter,
		isConfirmDeleteOpen, itemToDelete,
		pageSizeOptions, pageSizeIndex, currentPage, totalPages, onPageSizeChange, changePage,
		statusOptions, statusIndex, onStatusChange,
		creatorOptions, creatorIndex, onCreatorChange,
		customerOptions, customerIndex, onCustomerChange,
		assigneeOptions, assigneeIndex, onAssigneeChange,
		sourceOptions, sourceIndex, onSourceChange,
		addNewTask, openFilter, closeFilter, resetFilter, applyFilter,
		showActionMenu, cancelDelete, confirmDelete, goToDetail,
		showCustomerModal, loadingCustomer, customerList, selectedCustomerName,
		openCustomerPopup, onCustomerSelect, onFilterCustomerInModal,
		pageNo, pageSize,
		totalCount,
		onChangePage,
		onUpdatePageSize,
		rawMemberList,
		loadingMore,
		loadMoreCustomers,
		isQuickCompleteOpen,
		quickTodos,
		isLoadingQuick,
		openQuickComplete,
		closeQuickComplete,
		handleQuickMarkDone
	} = useListTodoController();
	const showCustomActionSheet = ref(false);
	const selectedItemForAction = ref<any>(null);


	const openCustomMenu = (item : any) => {
		selectedItemForAction.value = item;
		showCustomActionSheet.value = true;
	};

	const handleCustomAction = (action : string) => {
		showCustomActionSheet.value = false;

		if (action === 'delete') {

			itemToDelete.value = selectedItemForAction.value;
			isConfirmDeleteOpen.value = true;
		}
	};
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		height: 100vh;
		background-color: #f0f2f5;
		overflow: hidden;
	}

	.header {
		height: 50px;
		padding: 40px 20px 10px 20px;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
	}

	.header-left {
		width: 30px;
	}

	.header-title {
		font-size: 20px;
		font-weight: bold;
		color: #333;
		flex: 1;
		text-align: center;
	}

	.header-right {
		width: 30px;
		display: flex;
		justify-content: flex-end;
	}

	.filter-icon {
		width: 24px;
		height: 24px;
	}

	.content {
		flex: 1;
		padding: 0;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.list-container {
		flex: 1;
		padding: 15px;
		overflow: hidden;
		display: flex;
		flex-direction: column;
	}

	.fixed-footer {
		flex-shrink: 0;
		background-color: #fff;
		padding: 10px 15px;
		padding-bottom: calc(10px + env(safe-area-inset-bottom));
		border-top: 1px solid #eee;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.page-size-selector {
		display: flex;
		align-items: center;
		border: 1px solid #ddd;
		border-radius: 4px;
		padding: 4px 8px;
		background-color: #f9f9f9;
	}

	.size-text {
		font-size: 12px;
		color: #333;
		margin-right: 4px;
	}

	.dropdown-arrow {
		font-size: 10px;
		color: #666;
	}

	.pagination-controls {
		display: flex;
		align-items: center;
		gap: 5px;
	}

	.page-arrow {
		font-size: 18px;
		color: #666;
		padding: 0 10px;
		font-weight: bold;
		cursor: pointer;
		transition: opacity 0.2s;
	}

	.page-arrow.disabled {
		opacity: 0.3;
		pointer-events: none;
	}

	.page-box {
		width: 26px;
		height: 26px;
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 12px;
		color: #333;
	}

	.page-box.active {
		background-color: #2dce89;
		color: #fff;
		border-color: #2dce89;
		font-weight: bold;
	}

	.add-task-simple {
		display: flex;
		align-items: center;
		color: #007aff;
		padding: 5px 0;
	}

	.add-task-simple:active {
		opacity: 0.6;
	}

	.plus-icon {
		font-size: 20px;
		margin-right: 4px;
		font-weight: 400;
		line-height: 1;
		margin-top: -2px;
	}

	.add-text {
		font-size: 14px;
		font-weight: 600;
		white-space: nowrap;
	}

	.list-view {
		flex: 1;
		height: 1px;
	}

	.card-item {
		background-color: #fff;
		border-radius: 12px;
		margin-bottom: 15px;
		padding: 0;
		position: relative;
		overflow: hidden;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	}

	.status-bar {
		width: 6px;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.card-body {
		padding: 15px 15px 15px 20px;
	}

	.card-row {
		display: flex;
		align-items: center;
		margin-bottom: 8px;
	}

	.top-row {
		margin-bottom: 8px;
		align-items: flex-start;
		justify-content: space-between;
	}

	.card-title {
		font-size: 16px;
		font-weight: 600;
		color: #32325d;
		flex: 1;
		line-height: 1.4;
		padding-right: 10px;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
		word-break: break-word;
	}

	.action-btn {
		padding: 0 5px;
		height: 24px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.dots {
		font-size: 18px;
		color: #999;
		font-weight: bold;
		letter-spacing: 1px;
		transform: rotate(90deg);
	}

	.card-info-row {
		display: flex;
		align-items: center;
		margin-bottom: 6px;
	}

	.icon-small {
		width: 14px;
		height: 14px;
		margin-right: 8px;
		opacity: 0.7;
		flex-shrink: 0;
	}

	.card-date {
		font-size: 13px;
		color: #8898aa;
	}

	.bot-row {
		justify-content: space-between;
		align-items: center;
		margin-bottom: 0;
		margin-top: 10px;
		padding-top: 10px;
		border-top: 1px dashed #eee;
	}

	.code-tag {
		background-color: #f0f2f5;
		color: #525f7f;
		padding: 4px 10px;
		border-radius: 6px;
		font-size: 13px;
		font-weight: 600;
		letter-spacing: 0.5px;
	}

	.empty-state,
	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #999;
	}

	.empty-icon {
		width: 80px;
		height: 80px;
		margin-bottom: 20px;
	}

	.filter-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		justify-content: flex-end;
	}

	.filter-panel {
		width: 85%;
		height: 100%;
		background-color: #fff;
		display: flex;
		flex-direction: column;
		animation: slideIn 0.3s ease-out;
	}

	@keyframes slideIn {
		from {
			transform: translateX(100%);
		}

		to {
			transform: translateX(0);
		}
	}

	.filter-header {
		padding: 40px 20px 20px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 1px solid #eee;
		font-weight: bold;
		font-size: 18px;
	}

	.close-btn {
		font-size: 24px;
		padding: 5px;
		color: #666;
	}

	.filter-body {
		flex: 1;
		height: 1px;
		width: 100%;
		padding: 20px;
		box-sizing: border-box;
	}

	.f-group {
		margin-bottom: 15px;
	}

	.f-label {
		font-size: 13px;
		color: #666;
		margin-bottom: 5px;
		display: block;
	}

	.f-input,
	.f-picker {
		background-color: #f8f9fa;
		border: 1px solid #e0e0e0;
		border-radius: 8px;
		padding: 10px;
		font-size: 14px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.f-section-title {
		margin-top: 20px;
		margin-bottom: 10px;
		font-weight: bold;
		font-size: 14px;
		color: #009688;
		border-top: 1px dashed #eee;
		padding-top: 15px;
	}

	.f-row {
		display: flex;
		justify-content: space-between;
	}

	.half {
		width: 48%;
	}

	.arrow {
		font-size: 10px;
		color: #999;
	}

	.date {
		color: #333;
	}

	.filter-footer {
		padding: 20px;
		padding-bottom: calc(20px + env(safe-area-inset-bottom));
		border-top: 1px solid #eee;
		display: flex;
		justify-content: space-between;
		background-color: #fff;
		gap: 15px;
	}

	.btn-filter-reset {
		width: 35%;
	}

	.btn-filter-apply {
		width: 60%;
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

	.modal-btn::after {
		border: none;
	}

	.modal-btn.cancel {
		color: #666;
		border-right: 1px solid #eee;
	}

	.modal-btn.confirm {
		color: #ff3b30;
		font-weight: bold;
	}

	.modal-btn:active {
		background-color: #f9f9f9;
	}

	.add-task-simple {
		display: flex;
		align-items: center;
		color: #007aff;
		padding: 5px 0;
		margin-left: 10px;
	}

	.custom-sheet-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 9999;
		visibility: hidden;
		opacity: 0;
		transition: all 0.2s;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}

	.custom-sheet-mask.show {
		visibility: visible;
		opacity: 1;
	}

	.custom-sheet-panel {
		background-color: #f1f1f1;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
		transform: translateY(100%);
		transition: transform 0.2s;
		overflow: hidden;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.custom-sheet-mask.show .custom-sheet-panel {
		transform: translateY(0);
	}

	.sheet-item {
		background-color: #fff;
		padding: 16px;
		text-align: center;
		font-size: 17px;
		border-bottom: 1px solid #eee;
	}

	.sheet-item:active {
		background-color: #ddd;
	}

	.sheet-item.delete text {
		color: #ff3b30;
	}

	.sheet-item.cancel {
		font-weight: 600;
	}

	.sheet-gap {
		height: 8px;
		background-color: #f1f1f1;
	}

	.icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 30px;
		height: 30px;
	}

	.quick-panel {
		background-color: #f5f5f7;
	}

	.quick-list {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.quick-item {
		background-color: #fff;
		padding: 12px 15px;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
	}

	.quick-info {
		flex: 1;
		padding-right: 10px;
		overflow: hidden;
	}

	.quick-code {
		font-size: 12px;
		color: #888;
		font-weight: bold;
		background-color: #f0f0f0;
		display: inline-block;
		padding: 2px 6px;
		border-radius: 4px;
		margin-bottom: 4px;
	}

	.quick-title {
		font-size: 15px;
		color: #333;
		font-weight: 500;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.quick-action {
		flex-shrink: 0;
	}

	.btn-complete {
		background-color: #2dce89;
		color: #fff;
		font-size: 12px;
		padding: 0 12px;
		height: 30px;
		line-height: 30px;
		border-radius: 15px;
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn-complete:active {
		opacity: 0.8;
	}
</style>