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
		/* Mask vẫn giữ màu tối mờ bất kể chế độ nào */
		background: rgba(0, 0, 0, 0.4);
		z-index: 9998;
	}

	.picker-panel {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		/* SỬA: Dùng màu nền surface (Trắng ở Light, Xám đậm ở Dark) */
		background-color: var(--bg-surface);
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
		/* SỬA: Border đổi theo theme */
		border-bottom: 1px solid var(--border-color);
		padding: 0 15px;
		/* SỬA: Nền toolbar dùng bg-input để hơi khác màu nền chính 1 chút */
		background-color: var(--bg-input);
		border-top-left-radius: 12px;
		border-top-right-radius: 12px;
	}

	.btn-cancel {
		/* SỬA: Màu text phụ */
		color: var(--text-secondary);
		font-size: 15px;
	}

	.btn-confirm {
		/* Nút confirm thường là màu Brand, nếu chưa có biến brand thì giữ cứng hoặc thêm --text-highlight */
		color: #007aff;
		font-size: 15px;
		font-weight: bold;
	}

	.title {
		font-size: 15px;
		font-weight: 500;
		/* SỬA: Màu text chính */
		color: var(--text-primary);
	}

	.picker-view-box {
		width: 100%;
		height: 250px;
		/* SỬA: Nền vùng cuộn */
		background-color: var(--bg-surface);
	}

	.picker-item {
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		/* SỬA: Màu text item trong vùng cuộn */
		color: var(--text-primary);
	}
</style>