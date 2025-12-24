<template>
	<view class="uni-calendar-item__weeks-box" :class="{
		'uni-calendar-item--disable':weeks.disable,
		'uni-calendar-item--before-checked-x':weeks.beforeMultiple,
		'uni-calendar-item--multiple': weeks.multiple,
		'uni-calendar-item--after-checked-x':weeks.afterMultiple,
		}" @click="choiceDate(weeks)" @mouseenter="handleMousemove(weeks)">
		<view class="uni-calendar-item__weeks-box-item" :class="{
				'uni-calendar-item--checked':calendar.fullDate === weeks.fullDate && (calendar.userChecked || !checkHover),
				'uni-calendar-item--checked-range-text': checkHover,
				'uni-calendar-item--before-checked':weeks.beforeMultiple,
				'uni-calendar-item--multiple': weeks.multiple,
				'uni-calendar-item--after-checked':weeks.afterMultiple,
				'uni-calendar-item--disable':weeks.disable,
				}">
			<text v-if="selected && weeks.extraInfo" class="uni-calendar-item__weeks-box-circle"></text>
			<text
				class="uni-calendar-item__weeks-box-text uni-calendar-item__weeks-box-text-disable uni-calendar-item--checked-text">{{weeks.date}}</text>
		</view>
		<view :class="{'uni-calendar-item--today': weeks.isToday}"></view>
	</view>
</template>

<script>
	export default {
		props: {
			weeks: {
				type: Object,
				default () {
					return {}
				}
			},
			calendar: {
				type: Object,
				default: () => {
					return {}
				}
			},
			selected: {
				type: Array,
				default: () => {
					return []
				}
			},
			checkHover: {
				type: Boolean,
				default: false
			}
		},
		methods: {
			choiceDate(weeks) {
				this.$emit('change', weeks)
			},
			handleMousemove(weeks) {
				this.$emit('handleMouse', weeks)
			}
		}
	}
</script>

<style lang="scss">
	/* 1. IMPORT THEME ĐỂ DÙNG BIẾN */
	@import '@/common/theme.scss';

	$uni-primary: #007aff !default;

	.uni-calendar-item__weeks-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: 1px 0;
		position: relative;
	}

	.uni-calendar-item__weeks-box-text {
		font-size: 14px;
		font-weight: bold;
		/* SỬA 1: Thay màu cứng darken(...) bằng biến text-primary */
		color: var(--text-primary);
	}

	.uni-calendar-item__weeks-box-item {
		position: relative;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 40px;
		/* #ifdef H5 */
		cursor: pointer;
		/* #endif */
	}


	.uni-calendar-item__weeks-box-circle {
		position: absolute;
		top: 5px;
		right: 5px;
		width: 8px;
		height: 8px;
		border-radius: 8px;
		background-color: #dd524d;

	}

	.uni-calendar-item__weeks-box .uni-calendar-item--disable {
		cursor: default;
	}

	.uni-calendar-item--disable .uni-calendar-item__weeks-box-text-disable {
		/* SỬA 2: Thay màu xám cứng #D1D1D1 bằng biến text-hint (mờ) */
		color: var(--text-hint);
	}

	.uni-calendar-item--today {
		position: absolute;
		top: 10px;
		right: 17%;
		background-color: #dd524d;
		width: 6px;
		height: 6px;
		border-radius: 50%;
	}

	.uni-calendar-item--extra {
		color: #dd524d;
		opacity: 0.8;
	}

	.uni-calendar-item__weeks-box .uni-calendar-item--checked {
		background-color: $uni-primary;
		border-radius: 50%;
		box-sizing: border-box;
		border: 3px solid #fff;
		/* SỬA 3: Khi theme tối, viền trắng quanh ô được chọn sẽ quá gắt, đổi thành viền theo màu nền surface */
		border-color: var(--bg-surface);
	}

	.uni-calendar-item--checked .uni-calendar-item--checked-text {
		color: #fff;
	}

	.uni-calendar-item--multiple .uni-calendar-item--checked-range-text {
		color: #333;
		/* SỬA 4: Màu text khi chọn range cũng phải đổi theo theme */
		color: var(--text-primary);
	}

	.uni-calendar-item--multiple {
		/* SỬA 5: Màu nền khi chọn khoảng (Range). #F6F7FC là màu sáng, cần đổi sang biến background phù hợp */
		background-color: var(--bg-tag);
	}

	.uni-calendar-item--multiple .uni-calendar-item--before-checked,
	.uni-calendar-item--multiple .uni-calendar-item--after-checked {
		background-color: $uni-primary;
		border-radius: 50%;
		box-sizing: border-box;
		/* SỬA 6: Border trùng với màu nền range (đã sửa ở SỬA 5) */
		border: 3px solid var(--bg-tag);
	}

	.uni-calendar-item--before-checked .uni-calendar-item--checked-text,
	.uni-calendar-item--after-checked .uni-calendar-item--checked-text {
		color: #fff;
	}

	.uni-calendar-item--before-checked-x {
		border-top-left-radius: 50px;
		border-bottom-left-radius: 50px;
		box-sizing: border-box;
		/* SỬA 7: Màu nền range */
		background-color: var(--bg-tag);
	}

	.uni-calendar-item--after-checked-x {
		border-top-right-radius: 50px;
		border-bottom-right-radius: 50px;
		/* SỬA 8: Màu nền range */
		background-color: var(--bg-tag);
	}
</style>