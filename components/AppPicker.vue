<template>
	<view>
		<view @click="open">
			<slot></slot>
		</view>

		<view class="picker-mask" :class="{ 'show': isVisible }" @click="close" v-if="isVisible"></view>

		<view class="picker-panel" :class="{ 'show': isVisible }">
			<view class="picker-toolbar">
				<text class="btn-cancel" @click="close">{{ $t('common.cancel') }}</text>
				<text class="title">{{ title }}</text>
				<text class="btn-confirm" @click="confirm">{{ $t('common.confirm') || 'Xong' }}</text>
			</view>

			<picker-view :value="pickerValue" @change="bindChange" class="picker-view-box"
				indicator-style="height: 50px;">
				<picker-view-column>
					<view class="picker-item" v-for="(item, index) in range" :key="index">
						{{ item }}
					</view>
				</picker-view-column>
			</picker-view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, watch } from 'vue';

	const props = defineProps<{
		range : string[];
		value : number;   
		title ?: string;
	}>();

	const emit = defineEmits(['update:value', 'change']);

	const isVisible = ref(false);
	const pickerValue = ref([0]); 
	const tempIndex = ref(0);

	watch(() => props.value, (val) => {
		pickerValue.value = [val];
		tempIndex.value = val;
	}, { immediate: true });

	const open = () => {
		tempIndex.value = props.value;
		pickerValue.value = [props.value];
		isVisible.value = true;
	};

	const close = () => {
		isVisible.value = false;
	};

	const bindChange = (e : any) => {
		const val = e.detail.value;
		tempIndex.value = val[0];
	};

	const confirm = () => {
		emit('change', { detail: { value: tempIndex.value } });
		emit('update:value', tempIndex.value);
		close();
	};
</script>

<style scoped>
	.picker-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}

	.picker-panel {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: #fff;
		z-index: 9999;
		transform: translateY(100%);
		transition: transform 0.3s ease;
		padding-bottom: env(safe-area-inset-bottom);
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}

	.picker-panel.show {
		transform: translateY(0);
	}

	.picker-toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 44px;
		border-bottom: 1px solid #eee;
		padding: 0 15px;
		background-color: #f9f9f9;
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}

	.btn-cancel {
		color: #666;
		font-size: 15px;
	}

	.btn-confirm {
		color: #007aff;
		font-size: 15px;
		font-weight: bold;
	}

	.title {
		font-size: 15px;
		font-weight: 500;
		color: #333;
	}

	.picker-view-box {
		width: 100%;
		height: 250px;
		background-color: #fff;
	}

	.picker-item {
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		color: #333;
	}
</style>