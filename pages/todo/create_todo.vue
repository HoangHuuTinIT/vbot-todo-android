//pages/todo/create_todo.vue
<template>
	<view class="container">
		<view class="flat-item">
			<view class="item-left">
				<image src="https://img.icons8.com/ios/50/666666/edit--v1.png" class="item-icon"></image>
			</view>
            <textarea class="item-input title-textarea" v-model="form.name" :placeholder="$t('todo.enter_task_name')"
				maxlength="256" auto-height />
			<text class="char-count">
			    {{ $t('todo.char_count')
			        .replace('{current}', String(form.name ? form.name.length : 0))
			        .replace('{max}', '256') 
			    }}
			</text>
		</view>

        <TodoEditor v-model="form.desc" :placeholder="$t('editor.placeholder')" />

		<view class="flat-item" @click="openCustomerPopup">
			<view class="item-left">
				<image src="https://img.icons8.com/ios/50/666666/price-tag.png" class="item-icon"></image>
			</view>
			<view class="input-trigger" :class="{ 'placeholder': !form.customer }">
				{{ form.customer || $t('todo.select_customer') }}
			</view>
			<text class="arrow-icon">›</text>
		</view>

		<CustomerModal :visible="showCustomerModal" :loading="loadingCustomer" :loadingMore="loadingMore"
			:customers="customerList" :managers="memberList" @close="showCustomerModal = false"
			@select="onCustomerSelect" @filter="onCustomerFilter" @loadMore="loadMoreCustomers" />
		
        <view class="flat-item">
			<view class="item-left">
				<image src="https://img.icons8.com/ios/50/666666/internet.png" class="item-icon"></image>
			</view>

			<picker mode="selector" :range="sourceOptions" @change="onSourceChange" class="full-width-picker">
				<view class="picker-display" :class="{ 'placeholder-color': sourceIndex === -1 }">
					{{ sourceIndex > -1 ? sourceOptions[sourceIndex] : $t('todo.select_source') }}
				</view>
			</picker>

			<text class="arrow-icon">›</text>
		</view>

		<view class="flat-item">
			<view class="item-left">
				<image src="https://img.icons8.com/ios/50/666666/user.png" class="item-icon"></image>
			</view>

			<picker mode="selector" :range="memberOptions" @change="onMemberChange" class="full-width-picker">
				<view class="picker-display" :class="{ 'placeholder-color': !currentAssigneeName }">
					{{ currentAssigneeName ? currentAssigneeName : $t('todo.assignee') }}
				</view>
			</picker>
		</view>

		<TodoDatePicker 
		    v-model:dueDate="form.dueDate" 
		    v-model:notifyAt="form.notifyAt" 
		/>

		<view class="footer-action">
			<AppButton type="secondary" :label="$t('common.cancel_action')" class="btn-cancel" @click="goBack" />
			<AppButton type="primary" :label="loading ? $t('common.saving') : $t('common.save')" :loading="loading"
				class="btn-submit" @click="submitForm" />
		</view>
		<GlobalMessage />
		<GlobalNotification />
	</view>
</template>
<script setup lang="ts">
	import { useCreateTodoController } from '@/controllers/create_todo';
	import TodoEditor from '@/components/Todo/TodoEditor.vue';
	import TodoDatePicker from '@/components/Todo/TodoDatePicker.vue';
	import CustomerModal from '@/components/Todo/CustomerModal.vue';
	import AppButton from '@/components/AppButton.vue';
	import GlobalMessage from '@/components/GlobalMessage.vue';
	import GlobalNotification from '@/components/GlobalNotification.vue';
	const {
		loading, form, goBack, submitForm,
		memberOptions, onMemberChange, currentAssigneeName,
		showCustomerModal, loadingCustomer, customerList,
		openCustomerPopup, onCustomerSelect,
		sourceOptions,
		sourceIndex,
		onSourceChange,
		memberList,
		onCustomerFilter,
		loadingMore,
		loadMoreCustomers
	} = useCreateTodoController();
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #f5f5f7;
		padding: 15px;
		box-sizing: border-box;
	}

	.flat-item {
		background-color: #fff;
		margin-bottom: 12px;
		padding: 15px;
		display: flex;
		align-items: center;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
	}

	.item-left {
		display: flex;
		align-items: center;
		margin-right: 15px;
	}

	.item-icon {
		width: 22px;
		height: 22px;
		opacity: 0.6;
	}

	.item-input {
		flex: 1;
		text-align: left;
		font-size: 15px;
		color: #333;
		min-height: 24px;
		line-height: 1.4;
		padding: 5px 0;
	}

	.title-textarea {
		width: 100%;
		overflow: hidden;
	}

	.char-count {
		font-size: 12px;
		color: #999;
		margin-left: 10px;
		flex-shrink: 0;
	}

	.full-width-picker {
		flex: 1;
	}

	.picker-display {
		font-size: 15px;
		color: #333;
		width: 100%;
	}

	.placeholder-color {
		color: #808080;
	}

	.footer-action {
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
		gap: 15px;
	}

	.btn {
		border-radius: 0;
		font-size: 15px;
		font-weight: bold;
		height: 45px;
		line-height: 45px;
		border: none;
	}

	.btn-cancel {
		width: 35%;
	}

	.btn-submit {
		width: 60%;
	}

	.btn-submit[disabled] {
		background-color: #8dc2ff;
	}

	.input-trigger {
		flex: 1;
		font-size: 15px;
		color: #333;
	}

	.input-trigger.placeholder {
		color: #808080;
	}

	.arrow-icon {
		color: #ccc;
		font-size: 18px;
		margin-left: 5px;
		padding-bottom: 2px;
	}
</style>