<template>
	<view class="rounded-full flex items-center justify-center overflow-hidden shrink-0" :style="{
      width: size + 'px',
      height: size + 'px',
      backgroundColor: finalBgColor,
      borderRadius: '50%'
    }">
		<image v-if="avatarUrl" :src="avatarUrl" class="w-full h-full" mode="aspectFill" />

		<text v-else class="font-bold flex items-center justify-center" :class="textColorClass" :style="{ 
          fontSize: (size * 0.45) + 'px',
          lineHeight: '1', 
          display: 'flex' 
      }">
			{{ initialChar }}
		</text>
	</view>
</template>

<script setup>
	import {
		computed,
		defineProps
	} from 'vue';

	const props = defineProps({
		name: {
			type: String,
			default: ''
		},
		avatarUrl: {
			type: String,
			default: ''
		},
		avatarColor: {
			type: String,
			// Nếu bạn muốn mặc định là một màu cụ thể thì để mã màu.
			// Nếu muốn mặc định ăn theo theme thì để chuỗi rỗng ''.
			default: '#3b82f6'
		},
		size: {
			type: Number,
			default: 40
		}
	});

	const initialChar = computed(() => {
		if (!props.name) return '?';
		return props.name.trim().charAt(0).toUpperCase();
	});

	// Xử lý màu nền: Nếu có màu chỉ định thì dùng, không thì dùng biến theme
	const finalBgColor = computed(() => {
		return props.avatarColor ? props.avatarColor : 'var(--bg-input)';
	});

	// Xử lý màu chữ: 
	// - Nếu có màu nền chỉ định (thường là màu đậm) -> Chữ trắng.
	// - Nếu là nền fallback (thường là xám nhạt/đậm theo theme) -> Chữ theo theme.
	const textColorClass = computed(() => {
		return props.avatarColor ? 'text-white' : 'text-adaptive';
	});
</script>

<style scoped>
	.shrink-0 {
		flex-shrink: 0;
	}

	.w-full {
		width: 100%;
	}

	.h-full {
		height: 100%;
	}

	.flex {
		display: flex;
	}

	.items-center {
		align-items: center;
	}

	.justify-center {
		justify-content: center;
	}

	.overflow-hidden {
		overflow: hidden;
	}

	.font-bold {
		font-weight: bold;
	}

	/* Class màu chữ trắng cố định (dùng khi avatar có màu nền nổi bật) */
	.text-white {
		color: white;
	}

	/* Class màu chữ thay đổi theo theme (dùng khi avatar không có màu nền) */
	.text-adaptive {
		/* Thay #666666 bằng biến text phụ */
		color: var(--text-secondary);
	}
</style>