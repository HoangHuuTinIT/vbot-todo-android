<template>
	<view>
		<view @click="open">
			<slot></slot>
		</view>

		<view class="picker-mask" :class="{ 'show': isVisible }" @click="close" v-if="isVisible"></view>

		<view class="picker-panel" :class="{ 'show': isVisible }">
			<view class="picker-toolbar">
				<text class="btn-cancel" @click="close">{{ $t('common.cancel') || 'Hủy' }}</text>
				<text class="title">{{ title }}</text>
				<text class="btn-confirm" @click="confirm">{{ $t('common.confirm') || 'Xong' }}</text>
			</view>

			<picker-view :value="pickerValue" @change="bindChange" class="picker-view-box"
				:indicator-style="indicatorStyle" :mask-style="maskStyle">

				<block v-if="isMultiColumn">
					<picker-view-column v-for="(col, i) in range" :key="i">
						<view class="picker-item" v-for="(item, k) in col" :key="k">
							{{ item }}
						</view>
					</picker-view-column>
				</block>

				<block v-else>
					<picker-view-column>
						<view class="picker-item" v-for="(item, index) in range" :key="index">
							{{ item }}
						</view>
					</picker-view-column>
				</block>

			</picker-view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, watch, computed } from 'vue';

	const props = defineProps<{
		range : any[];
		value : number | number[];
		title ?: string;
	}>();

	const emit = defineEmits(['update:value', 'change']);

	const isVisible = ref(false);
	const pickerValue = ref<number[]>([0]);
	const tempValue = ref<any>(0);

	// Style cho khung chọn ở giữa (Indicator)
	// Dùng biến --border-color để đường kẻ tự đổi màu theo theme, z-index thấp để không che chữ
	const indicatorStyle = `
		height: 50px; 
		border-top: 1px solid var(--border-color); 
		border-bottom: 1px solid var(--border-color);
		z-index: 0;
	`;

	// Style cho lớp mặt nạ mờ (Mask)
	// QUAN TRỌNG: Sử dụng linear-gradient từ var(--bg-surface) (màu nền) đến trong suốt.
	// Điều này giúp loại bỏ hiệu ứng "sương mù trắng" xấu xí trên nền tối.
	const maskStyle = `
		background-image: linear-gradient(to bottom, var(--bg-surface), rgba(0,0,0,0)), linear-gradient(to top, var(--bg-surface), rgba(0,0,0,0));
		z-index: 0;
	`;

	const isMultiColumn = computed(() => {
		return props.range.length > 0 && Array.isArray(props.range[0]);
	});

	watch(() => props.value, (val) => {
		if (Array.isArray(val)) {
			pickerValue.value = val;
			tempValue.value = [...val];
		} else {
			pickerValue.value = [val];
			tempValue.value = val;
		}
	}, { immediate: true });

	const open = () => {
		if (Array.isArray(props.value)) {
			tempValue.value = [...props.value];
			pickerValue.value = [...props.value];
		} else {
			tempValue.value = props.value;
			pickerValue.value = [props.value];
		}
		isVisible.value = true;
	};

	const close = () => {
		isVisible.value = false;
	};

	const bindChange = (e : any) => {
		const val = e.detail.value;
		if (isMultiColumn.value) {
			tempValue.value = val;
		} else {
			tempValue.value = val[0];
		}
	};

	const confirm = () => {
		emit('change', { detail: { value: tempValue.value } });
		emit('update:value', tempValue.value);
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
		background: rgba(0, 0, 0, 0.6);
		/* Tăng độ tối của mask nền một chút cho tập trung hơn */
		z-index: 9998;
		backdrop-filter: blur(2px);
		/* Hiệu ứng mờ nền phía sau (nếu trình duyệt hỗ trợ) */
	}

	.picker-panel {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: var(--bg-surface);
		z-index: 9999;
		transform: translateY(100%);
		transition: transform 0.3s cubic-bezier(0.19, 1, 0.22, 1);
		/* Hiệu ứng trượt mượt hơn */
		padding-bottom: env(safe-area-inset-bottom);
		border-top-left-radius: 16px;
		/* Bo tròn nhiều hơn chút cho hiện đại */
		border-top-right-radius: 16px;
	}

	.picker-panel.show {
		transform: translateY(0);
	}

	.picker-toolbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 48px;
		/* Tăng chiều cao toolbar chút cho thoáng */
		border-bottom: 1px solid var(--border-color);
		padding: 0 16px;
		background-color: var(--bg-surface);
		/* Đồng bộ màu nền với panel để liền mạch */
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
	}

	.btn-cancel {
		color: var(--text-secondary);
		font-size: 16px;
	}

	.btn-confirm {
		color: #007aff;
		font-size: 16px;
		font-weight: 600;
	}

	.title {
		font-size: 16px;
		font-weight: 600;
		color: var(--text-primary);
	}

	.picker-view-box {
		width: 100%;
		height: 240px;
		background-color: var(--bg-surface);
	}

	.picker-item {
		line-height: 50px;
		text-align: center;
		font-size: 17px;
		/* Tăng size chữ lên xíu cho dễ đọc */
		font-weight: 400;
		color: var(--text-primary);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		z-index: 10;
		/* Đảm bảo text nổi lên trên các lớp mask */
	}
</style>