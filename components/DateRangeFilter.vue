<template>
	<view class="date-filter-block">
		<view class="f-section-title" v-if="title">{{ title }}</view>

		<view class="f-row">
			<view class="f-group half">
				<uni-datetime-picker :key="`start-${locale}`" type="date" :value="startDate" @change="onStartChange"
					:border="false">
					<view class="f-picker date" :class="{ 'placeholder': !startDate }">
						{{ startDate ? formatDateDisplay(startDate) : $t('common.from_date') }}
					</view>
				</uni-datetime-picker>
			</view>

			<view class="f-group half">
				<uni-datetime-picker :key="`end-${locale}`" type="date" :value="endDate" @change="onEndChange"
					:border="false">
					<view class="f-picker date" :class="{ 'placeholder': !endDate }">
						{{ endDate ? formatDateDisplay(endDate) : $t('common.to_date') }}
					</view>
				</uni-datetime-picker>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { formatDateDisplay } from '@/utils/dateUtils';
	import { useI18n } from 'vue-i18n';
	const { locale } = useI18n();
	const props = defineProps<{
		title ?: string;
		startDate : string;
		endDate : string;
	}>();

	const emit = defineEmits(['update:startDate', 'update:endDate']);

	const onStartChange = (val : string) => {
		emit('update:startDate', val);
	};

	const onEndChange = (val : string) => {
		emit('update:endDate', val);
	};
</script>

<style lang="scss" scoped>
	/* Mapping biến màu:
   - Border Top: #eee -> var(--border-color)
   - Bg Input: #f8f9fa -> var(--bg-input)
   - Border Input: #e0e0e0 -> var(--border-input)
   - Text Value: #333 -> var(--text-primary)
   - Text Placeholder: #999 -> var(--text-hint)
*/

	.f-section-title {
		margin-top: 20px;
		margin-bottom: 10px;
		font-weight: bold;
		font-size: 14px;
		color: #009688;
		/* Thay #eee */
		border-top: 1px dashed var(--border-color);
		padding-top: 15px;
	}

	.f-row {
		display: flex;
		justify-content: space-between;
	}

	.f-group {
		margin-bottom: 15px;
	}

	.half {
		width: 48%;
	}

	.f-picker {
		/* Thay #f8f9fa */
		background-color: var(--bg-input);
		/* Thay #e0e0e0 */
		border: 1px solid var(--border-input);
		border-radius: 8px;
		padding: 10px;
		font-size: 14px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		/* Thay #333 */
		color: var(--text-primary);
	}

	.f-picker.placeholder {
		/* Thay #999 */
		color: var(--text-hint);
	}
</style>