<template>
	<view class="editor-container" :class="{ 'is-readonly': readOnly }">
		<view class="editor-wrapper">
			<editor :id="editorId" class="ql-container"
				:placeholder="readOnly ? '' : (placeholder || $t('editor.placeholder'))" :read-only="readOnly"
				show-img-size show-img-toolbar show-img-resize @ready="onEditorReady" @input="onInput"
				@statuschange="onStatusChange">
			</editor>

			<view class="link-tooltip" v-if="showLinkTooltip" :style="tooltipStyle" @tap.stop
				:class="{ 'is-fixed': tooltipPositionMode === 'fixed' }">
				<view class="tooltip-content">
					<text class="tooltip-url">{{ currentActiveLink }}</text>
				</view>
				<view class="tooltip-actions">
					<view class="t-btn" @tap="handleTooltipOpen">{{ $t('common.open_link') || 'Mở' }}</view>
					<view class="t-divider"></view>
					<view class="t-btn" @tap="handleTooltipCopy">{{ $t('common.copy_link') || 'Copy' }}</view>
					<view class="t-divider"></view>
					<view class="t-btn" @tap="handleTooltipEdit">{{ $t('common.edit_link') || 'Sửa' }}</view>
				</view>

				<view class="tooltip-arrow" :class="tooltipPositionMode" v-if="tooltipPositionMode !== 'fixed'"></view>
			</view>
		</view>

		<view class="link-section-frame" v-if="insertedLinks.length > 0">
			<view class="link-section-header" @tap="toggleLinkList">
				<view class="header-left">
					<image src="/static/link.png" class="header-icon"></image>
					<text class="header-title">{{ $t('todo.attached_links') }} ({{ insertedLinks.length }})</text>
				</view>
				<image src="https://img.icons8.com/ios-glyphs/30/666666/expand-arrow--v1.png" class="toggle-arrow"
					:class="{ 'open': isLinkListOpen }"></image>
			</view>

			<view class="link-list-content" v-if="isLinkListOpen">
				<LinkCard v-for="(link, index) in insertedLinks" :key="index" :url="link" :removable="true"
					@remove="removeLink(index)" />
			</view>
		</view>

		<view class="toolbar" v-if="!readOnly">
			<view class="tool-list">
				<view v-for="(item, index) in tools" :key="index" class="tool-item"
					:class="{ 'active': isActive(item) }" @touchend.prevent="handleToolClick(item)">

					<text v-if="item.iconText" :style="item.style" class="txt-icon"
						:class="{'txt-dynamic': item.action}">
						{{ getDisplayText(item) }}
					</text>

					<image v-else :src="getDisplayImage(item)" class="img-icon"></image>
				</view>

				<view class="tool-divider"></view>

				<view class="tool-item" @touchend.prevent="insertImage">
					<image src="/static/choseImage.png" class="img-icon"></image>
				</view>

				<view class="tool-item" :class="{'active': isLinkSelected}" @touchend.prevent="handleLink">
					<image src="/static/link.png" class="img-icon"></image>
				</view>

				<view class="tool-item" @touchend.prevent="openCardLinkModal">
					<image src="/static/add-link.png" class="img-icon"></image>
				</view>

				<view class="tool-item" @touchend.prevent="clearFormat">
					<text class="txt-icon" style="font-size: 12px">Clear</text>
				</view>
			</view>
		</view>

		<view class="modal-overlay" v-if="showLinkModal" @tap="showLinkModal = false">
			<view class="modal-box" @tap.stop>
				<text class="modal-title">{{ $t('editor.link_modal_title') }}</text>
				<input class="modal-input" v-model="linkUrl" placeholder="https://example.com" :focus="showLinkModal" />
				<view class="modal-actions">
					<button class="btn-cancel" @tap="showLinkModal = false">{{ $t('common.cancel') }}</button>
					<button class="btn-confirm" @tap="confirmLink">{{ $t('common.confirm') }}</button>
				</view>
			</view>
		</view>

		<view class="modal-overlay" v-if="showCardLinkModal" @tap="showCardLinkModal = false">
			<view class="modal-box" @tap.stop>
				<text class="modal-title">{{ $t('editor.card_modal_title') }}</text>
				<text class="modal-desc">{{ $t('editor.card_modal_desc') }}</text>

				<input class="modal-input" v-model="cardLinkUrl" placeholder="https://youtube.com/..."
					:focus="showCardLinkModal" />
				<view class="modal-actions">
					<button class="btn-cancel" @tap="showCardLinkModal = false">{{ $t('common.cancel') }}</button>
					<button class="btn-confirm" @tap="confirmCardLink">{{ $t('common.confirm') }}</button>
				</view>
			</view>
		</view>

		<view class="modal-overlay" v-if="showColorModal" @tap="closeColorModal">
			<view class="modal-box color-box" @tap.stop>
				<view class="color-tabs">
					<view class="color-tab" :class="{ active: colorTab === 'color' }" @tap="colorTab = 'color'">
						{{ $t('editor.color_text') }}
					</view>
					<view class="color-tab" :class="{ active: colorTab === 'backgroundColor' }"
						@tap="colorTab = 'backgroundColor'">
						{{ $t('editor.color_bg') }}
					</view>
				</view>

				<view class="color-grid">
					<view class="color-circle no-color" @tap="applyColor('')">
						<text class="x-mark">✕</text>
					</view>
					<view v-for="(c, idx) in colorList" :key="idx" class="color-circle" :style="{ backgroundColor: c }"
						:class="{ selected: isColorSelected(c) }" @tap="applyColor(c)">
					</view>
				</view>
			</view>
		</view>

		<view class="custom-sheet-mask" :class="{ 'show': showActionSheet }" @tap="closeActionSheet">
			<view class="custom-sheet-panel" @tap.stop>
				<view v-for="(item, index) in currentActionSheetItems" :key="index" class="sheet-item"
					@tap="handleActionSheetItemClick(item)">
					<text>{{ item.text }}</text>
				</view>

				<view class="sheet-gap"></view>

				<view class="sheet-item cancel" @tap="closeActionSheet">
					<text>{{ $t('common.cancel') }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import { ref, watch, getCurrentInstance, computed } from 'vue';
	import LinkCard from '@/components/Todo/LinkCard.vue';
	import { extractLinksAndCleanHtml, composeHtmlWithIframes } from '@/utils/linkHelper';
	import { useI18n } from 'vue-i18n';

	const { t } = useI18n();
	const props = defineProps({
		modelValue: String,
		placeholder: { type: String, default: '' },
		readOnly: { type: Boolean, default: false }
	});
	const emit = defineEmits(['update:modelValue']);

	const tools = [
		{ name: 'header', iconText: 'H', style: 'font-weight:bold', action: 'header-menu' },
		{ name: 'fontSize', iconText: 'A', style: 'font-weight:bold; font-size:16px', action: 'fontsize-menu' },
		{ name: 'bold', iconText: 'B', style: 'font-weight:900' },
		{ name: 'italic', iconText: 'I', style: 'font-style:italic' },
		{ name: 'underline', iconText: 'U', style: 'text-decoration:underline' },
		{ name: 'color', iconImg: '/static/text_color.png', action: 'color-picker' },
		{ name: 'backgroundColor', iconImg: '/static/background_color.png', action: 'bgcolor-picker' },
		{ name: 'strike', iconText: 'S', style: 'text-decoration:line-through' },
		{ name: 'align', iconImg: '/static/align-left.png', action: 'align-menu' },
		{ name: 'list', value: 'ordered', iconImg: '/static/numbered-list.png' },
		{ name: 'list', value: 'bullet', iconImg: '/static/list.png' },
	];
	const colorList = [
		'#000000', '#333333', '#888888', '#aaaaaa',
		'#e60000', '#ff9900', '#ffff00', '#008a00',
		'#0066cc', '#880088', '#ffffff', '#facccc',
		'#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5'
	];

	const editorId = ref(`editor-${Math.random().toString(36).substr(2, 5)}`);
	const editorCtx = ref<any>(null);
	const formats = ref<any>({});
	const instance = getCurrentInstance();
	const isLinkSelected = ref(false);
	const lastVal = ref('');

	const isTyping = ref(false);
	const showLinkModal = ref(false);
	const linkUrl = ref('');
	const showCardLinkModal = ref(false);
	const cardLinkUrl = ref('');
	const showColorModal = ref(false);
	const colorTab = ref<'color' | 'backgroundColor'>('color');


	const insertedLinks = ref<string[]>([]);
	const isLinkListOpen = ref(false);
	const toggleLinkList = () => {
		isLinkListOpen.value = !isLinkListOpen.value;
	};
	interface ActionSheetItem {
		text : string;
		handler : () => void;
	}
	const showActionSheet = ref(false);
	const currentActionSheetItems = ref<ActionSheetItem[]>([]);

	const showLinkTooltip = ref(false);
	const currentActiveLink = ref('');
	const tooltipTop = ref(0);
	const tooltipLeft = ref(0);
	const tooltipPositionMode = ref<'top' | 'bottom' | 'fixed'>('top');
	const tooltipStyle = computed(() => {
		if (tooltipPositionMode.value === 'fixed') {
			return {};
		}
		return {
			top: `${tooltipTop.value}px`,
		};
	});

	const updateTooltipPosition = () => {
		if (!editorCtx.value) return;

		if (typeof editorCtx.value.getSelectionRect !== 'function') {
			tooltipPositionMode.value = 'fixed';
			return;
		}

		editorCtx.value.getSelectionRect({
			success: (rect : any) => {
				if (rect && rect.bottom !== undefined) {
					tooltipPositionMode.value = 'bottom';
					tooltipTop.value = rect.bottom + 8;
				} else {
					tooltipPositionMode.value = 'fixed';
				}
			},
			fail: () => {
				tooltipPositionMode.value = 'fixed';
			}
		});
	};

	const handleTooltipOpen = () => {
		if (!currentActiveLink.value) return;
		// #ifdef APP-PLUS
		plus.runtime.openURL(currentActiveLink.value);
		// #endif
		// #ifdef H5
		window.open(currentActiveLink.value, '_blank');
		// #endif
		showLinkTooltip.value = false;
	};

	const handleTooltipCopy = () => {
		if (!currentActiveLink.value) return;
		uni.setClipboardData({
			data: currentActiveLink.value,
			success: () => {
				uni.showToast({ title: 'Đã sao chép link', icon: 'none' });
				showLinkTooltip.value = false;
			}
		});
	};

	const handleTooltipEdit = () => {
		if (!currentActiveLink.value) return;
		linkUrl.value = currentActiveLink.value;
		showLinkTooltip.value = false;
		showLinkModal.value = true;
	};

	const getDomain = (url : string) => {
		try {
			const domain = new URL(url).hostname;
			return domain.replace('www.', '');
		} catch (e) {
			return 'Website';
		}
	};

	const openLink = (url : string) => {
		// #ifdef APP-PLUS
		plus.runtime.openURL(url);
		// #endif
		// #ifdef H5
		window.open(url, '_blank');
		// #endif
	}

	const parseContent = (html : string) => {
		if (!html) return { cleanHtml: '', links: [] };
		const links : string[] = [];
		const iframeRegex = /<iframe[^>]+src="([^">]+)"[^>]*><\/iframe>/g;
		const cleanHtml = html.replace(iframeRegex, (match, src) => {
			if (src) links.push(src);
			return '';
		});
		return { cleanHtml, links };
	};

	const composeContent = (cleanHtml : string, links : string[]) => {
		let fullContent = cleanHtml;
		links.forEach(link => {
			const iframeStr = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${link}"></iframe>`;
			fullContent += iframeStr;
		});
		return fullContent;
	};

	const openCardLinkModal = () => {
		cardLinkUrl.value = '';
		showCardLinkModal.value = true;
	};

	const confirmCardLink = () => {
		if (cardLinkUrl.value) {
			let url = cardLinkUrl.value.trim();
			if (!url.startsWith('http')) {
				url = 'https://' + url;
			}
			insertedLinks.value.push(url);
			triggerUpdate();
		}
		showCardLinkModal.value = false;
	};

	const removeLink = (index : number) => {
		insertedLinks.value.splice(index, 1);
		triggerUpdate();
	};

	const triggerUpdate = () => {
		if (editorCtx.value) {
			editorCtx.value.getContents({
				success: (res : any) => {
					const html = res.html;
					lastVal.value = html;
					const finalContent = composeHtmlWithIframes(html, insertedLinks.value);
					emit('update:modelValue', finalContent);
				}
			});
		}
	};

	const getDisplayText = (item : any) => {
		const formatVal = formats.value[item.name];
		if (item.action === 'header-menu') return formatVal ? `H${formatVal}` : 'H';
		if (item.action === 'fontsize-menu') {
			if (formatVal === 'small') return 'Sm';
			if (formatVal === 'large') return 'Lg';
			if (formatVal === 'huge') return 'Hg';
			return 'A';
		}
		return item.iconText;
	};

	const getDisplayImage = (item : any) => {
		if (item.action === 'align-menu') {
			const alignVal = formats.value.align || 'left';
			switch (alignVal) {
				case 'center': return '/static/align-center.png';
				case 'right': return '/static/align-right.png';
				case 'justify': return '/static/align-justify.png';
				default: return '/static/align-left.png';
			}
		}
		return item.iconImg;
	};

	const isActive = (item : any) => {
		const currentFormat = formats.value[item.name];
		if (item.action === 'header-menu') return !!currentFormat;
		if (item.action === 'fontsize-menu') return !!currentFormat;
		if (item.action === 'align-menu') return !!currentFormat && currentFormat !== 'left';
		if (item.name === 'color') return !!formats.value.color;
		if (item.name === 'backgroundColor') return !!formats.value.backgroundColor;
		if (item.value) return currentFormat === item.value;
		return !!currentFormat;
	};

	const closeActionSheet = () => {
		showActionSheet.value = false;
	};

	const handleActionSheetItemClick = (item : ActionSheetItem) => {
		item.handler();
		closeActionSheet();
	};


	const handleToolClick = (item : any) => {
		if (item.action === 'header-menu') return handleHeaderSetting();
		if (item.action === 'fontsize-menu') return handleFontSizeSetting();
		if (item.action === 'align-menu') return handleAlignSetting();

		if (item.action === 'color-picker') {
			colorTab.value = 'color';
			showColorModal.value = true;
			return;
		}
		if (item.action === 'bgcolor-picker') {
			colorTab.value = 'backgroundColor';
			showColorModal.value = true;
			return;
		}

		format(item.name, item.value);
	};

	const handleAlignSetting = () => {
		currentActionSheetItems.value = [
			{ text: t('editor.align_left'), handler: () => format('align', 'left') },
			{ text: t('editor.align_center'), handler: () => format('align', 'center') },
			{ text: t('editor.align_right'), handler: () => format('align', 'right') },
			{ text: t('editor.align_justify'), handler: () => format('align', 'justify') }
		];
		showActionSheet.value = true;
	};

	const handleFontSizeSetting = () => {
		currentActionSheetItems.value = [
			{ text: t('editor.size_small'), handler: () => format('fontSize', '12px') },
			{ text: t('editor.size_normal'), handler: () => format('fontSize', '16px') },
			{ text: t('editor.size_large'), handler: () => format('fontSize', '24px') },
			{ text: t('editor.size_huge'), handler: () => format('fontSize', '32px') }
		];
		showActionSheet.value = true;
	};

	const handleHeaderSetting = () => {
		currentActionSheetItems.value = [
			{ text: 'Heading 1', handler: () => format('header', 1) },
			{ text: 'Heading 2', handler: () => format('header', 2) },
			{ text: 'Heading 3', handler: () => format('header', 3) },
			{ text: 'Heading 4', handler: () => format('header', 4) },
			{ text: t('editor.size_normal'), handler: () => format('header', null) }
		];
		showActionSheet.value = true;
	};

	const insertImage = () => {
		currentActionSheetItems.value = [
			{
				text: t('editor.img_camera'),
				handler: () => {
					uni.chooseImage({
						count: 1,
						sourceType: ['camera'],
						success: (imageRes) => processImageSelection(imageRes)
					});
				}
			},
			{
				text: t('editor.img_album'),
				handler: () => {
					uni.chooseImage({
						count: 1,
						sourceType: ['album'],
						success: (imageRes) => processImageSelection(imageRes)
					});
				}
			}
		];
		showActionSheet.value = true;
	};
	const processImageSelection = (imageRes : any) => {
		const tempPath = imageRes.tempFilePaths[0];
		setTimeout(() => {
			if (editorCtx.value) {

				editorCtx.value.insertImage({
					src: tempPath,
					width: '80%',
					alt: 'image',
					success: function () {
						console.log('Chèn ảnh thành công');
					},
					fail: function (e : any) {
						console.error('Chèn ảnh thất bại', e);
					}
				});
			}
		}, 200);
	};


	const onEditorReady = () => {
		uni.createSelectorQuery().in(instance).select(`#${editorId.value}`).context((res) => {
			if (res && res.context) {
				editorCtx.value = res.context;
				if (props.modelValue) {
					const { cleanHtml, links } = extractLinksAndCleanHtml(props.modelValue);
					insertedLinks.value = links;
					editorCtx.value.setContents({ html: cleanHtml });
					lastVal.value = cleanHtml;
				}
			}
		}).exec();
	};

	const onInput = (e : any) => {
		showLinkTooltip.value = false;


		isTyping.value = true;

		const val = e.detail.html;
		lastVal.value = val;
		const finalContent = composeHtmlWithIframes(val, insertedLinks.value);
		emit('update:modelValue', finalContent);
	};

	const onStatusChange = (e : any) => {
		formats.value = e.detail;
		isLinkSelected.value = !!e.detail.link;
		if (e.detail.link) {
			currentActiveLink.value = e.detail.link;
			showLinkTooltip.value = true;
			updateTooltipPosition();
		} else {
			showLinkTooltip.value = false;
		}
	};

	const format = (name : string, value : any = null) => {
		if (!editorCtx.value) return;
		editorCtx.value.format(name, value);
	};

	const applyColor = (color : string) => {
		if (color) {
			format(colorTab.value, color);
		} else {
			format(colorTab.value, null);
		}
		showColorModal.value = false;
	};

	const closeColorModal = () => {
		showColorModal.value = false;
	};

	const isColorSelected = (color : string) => {
		return formats.value[colorTab.value] === color;
	};

	const handleLink = () => {
		if (isLinkSelected.value) {
			editorCtx.value.format('link', null);
			showLinkTooltip.value = false;
		} else {
			linkUrl.value = '';
			showLinkModal.value = true;
		}
	};

	const confirmLink = () => {
		if (linkUrl.value) {
			editorCtx.value.format('link', linkUrl.value);
		}
		showLinkModal.value = false;
	};

	const clearFormat = () => {
		editorCtx.value.removeFormat();
	};

	watch(() => props.modelValue, (newVal) => {
		if (editorCtx.value) {
			if (isTyping.value) {
				isTyping.value = false;
				return;
			}

			const { cleanHtml, links } = extractLinksAndCleanHtml(newVal || '');
			if (cleanHtml !== lastVal.value) {
				editorCtx.value.setContents({ html: cleanHtml });
				lastVal.value = cleanHtml;
			}

			if (JSON.stringify(links) !== JSON.stringify(insertedLinks.value)) {
				insertedLinks.value = links;
			}
		}
	});
</script>

<style lang="scss" scoped>
	:deep(.ql-editor.ql-blank::before) {
		/* Ép màu placeholder dùng biến text-hint */
		color: var(--text-hint) !important;
		font-style: italic;
		/* (Tuỳ chọn) Chữ nghiêng cho đẹp */
	}

	/* --- CONTAINER CHÍNH --- */
	.editor-container {
		display: flex;
		flex-direction: column;
		/* Thay #fff */
		background: var(--bg-surface);
		/* Thay #e0e0e0 */
		border: 1px solid var(--border-color);
		border-radius: 8px;
		overflow: hidden;
		min-height: 250px;
	}

	.editor-container.is-readonly .ql-container {
		min-height: auto;
	}

	.editor-wrapper {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	/* --- TRÌNH SOẠN THẢO (QL-CONTAINER) --- */
	.ql-container {
		flex: 1;
		width: 100%;
		padding: 15px;
		font-size: 15px;
		line-height: 1.5;
		box-sizing: border-box;
		/* Thay #333 */
		color: var(--text-primary);
		min-height: 150px;
	}

	/* --- TOOLTIP LINK (POPUP KHI BẤM VÀO LINK) --- */
	.link-tooltip {
		position: absolute;
		z-index: 100;
		/* Giữ màu tối cho tooltip vì nó cần nổi bật */
		background-color: #333;
		border-radius: 8px;
		padding: 8px 12px;
		left: 50%;
		transform: translateX(-50%);
		width: max-content;
		max-width: 90%;
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
		display: flex;
		flex-direction: column;
		gap: 6px;
		min-width: 200px;
		animation: fadeIn 0.2s ease-out;
	}

	.tooltip-content {
		max-width: 250px;
	}

	.tooltip-url {
		color: #fff;
		font-size: 13px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		display: block;
		text-decoration: underline;
	}

	.tooltip-actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.t-btn {
		color: #fff;
		font-size: 13px;
		font-weight: 600;
		padding: 4px 8px;
	}

	.t-btn:active {
		opacity: 0.7;
	}

	.t-divider {
		width: 1px;
		height: 12px;
		background-color: #666;
	}

	.tooltip-arrow {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width: 0;
		height: 0;
		border-left: 6px solid transparent;
		border-right: 6px solid transparent;

		&.top {
			bottom: -6px;
			top: auto;
			border-top: 6px solid #333;
			border-bottom: none;
		}

		&.bottom {
			top: -6px;
			bottom: auto;
			border-bottom: 6px solid #333;
			border-top: none;
		}
	}

	.tooltip-arrow:not(.top):not(.bottom) {
		bottom: -6px;
		border-top: 6px solid #333;
	}

	/* --- KHUNG CHỨA LINK ĐÍNH KÈM (LINK SECTION) --- */
	.link-section-frame {
		margin: 0 15px 10px 15px;
		/* Thay #e9ecef và #f8f9fa */
		border: 1px solid var(--border-color);
		background-color: var(--bg-input);
		border-radius: 8px;
		overflow: hidden;
	}

	.link-section-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		/* Thay #f1f3f5 */
		background-color: var(--bg-input);
		cursor: pointer;
		border-bottom: 1px solid transparent;
	}

	/* Khi mở list ra thì thêm border bottom cho header */
	.link-section-header:has(+ .link-list-content) {
		border-bottom-color: var(--border-color);
	}

	.link-section-header:active {
		opacity: 0.8;
	}

	.header-left {
		display: flex;
		align-items: center;
	}

	.header-icon {
		width: 16px;
		height: 16px;
		margin-right: 8px;
		opacity: 0.6;
		/* Đảo màu icon khi dark mode */
		filter: var(--icon-filter);
	}

	.header-title {
		font-size: 13px;
		font-weight: 600;
		/* Thay #495057 */
		color: var(--text-primary);
	}

	.toggle-arrow {
		width: 14px;
		height: 14px;
		opacity: 0.5;
		transition: transform 0.3s ease;
		transform: rotate(-90deg);
		/* Đảo màu mũi tên */
		filter: var(--icon-filter);
	}

	.toggle-arrow.open {
		transform: rotate(0deg);
		opacity: 1;
	}

	.link-list-content {
		padding: 5px 10px 10px 10px;
		/* Thay #fff */
		background-color: var(--bg-surface);
		animation: slideDown 0.2s ease-out;
	}

	/* --- THANH CÔNG CỤ (TOOLBAR) --- */
	.toolbar {
		/* Thay #f5f7fa */
		background-color: var(--bg-input);
		/* Thay #eee */
		border-top: 1px solid var(--border-color);
		width: 100%;
		height: auto;
		padding: 8px 5px;
		box-sizing: border-box;
	}

	.tool-list {
		display: flex;
		align-items: center;
		width: 100%;
		flex-wrap: wrap;
		gap: 8px;
	}

	.tool-item {
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		/* Thay #fff */
		background-color: var(--bg-surface);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
		flex-shrink: 0;
		/* Viền mờ để rõ hơn trên nền tối */
		border: 1px solid var(--border-color);
	}

	.tool-item.active {
		/* Giữ màu xanh brand */
		background-color: #d0e4ff;
		color: #007aff;
		border: 1px solid #007aff;
	}

	/* Riêng trong dark mode, màu active này có thể hơi chói, ta điều chỉnh nhẹ */
	:global(.theme-dark) .tool-item.active {
		background-color: rgba(0, 122, 255, 0.2);
		/* Xanh trong suốt */
		color: #66b5ff;
		border-color: #007aff;
	}

	.txt-icon {
		font-size: 16px;
		/* Thay #555 */
		color: var(--text-secondary);
		font-weight: 600;
	}

	/* Khi active thì text icon đổi màu theo */
	.tool-item.active .txt-icon {
		color: inherit;
	}

	.txt-dynamic {
		font-size: 14px;
	}

	.img-icon {
		width: 18px;
		height: 18px;
		opacity: 0.7;
		/* Đảo màu icon ảnh */
		filter: var(--icon-filter);
	}

	.tool-divider {
		width: 1px;
		height: 20px;
		background-color: var(--border-color);
		/* Thay #ddd */
		display: none;
	}

	/* --- MODAL CHUNG (LINK, CARD LINK, COLOR) --- */
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.modal-box {
		width: 80%;
		/* Thay #fff */
		background-color: var(--bg-surface);
		padding: 20px;
		border-radius: 12px;
		animation: fadeIn 0.2s;
	}

	.modal-title {
		font-size: 16px;
		font-weight: bold;
		margin-bottom: 5px;
		display: block;
		text-align: center;
		/* Thay mặc định */
		color: var(--text-primary);
	}

	.modal-desc {
		font-size: 13px;
		/* Thay #888 */
		color: var(--text-hint);
		margin-bottom: 15px;
		display: block;
		text-align: center;
	}

	.modal-input {
		/* Thay border và màu chữ */
		border: 1px solid var(--border-input);
		color: var(--text-primary);
		padding: 10px;
		border-radius: 6px;
		margin-bottom: 20px;
		font-size: 15px;
		height: 40px;
		/* Thêm nền input */
		background-color: var(--bg-input);
	}

	.modal-actions {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	.btn-cancel,
	.btn-confirm {
		font-size: 14px;
		padding: 0 15px;
		height: 36px;
		line-height: 36px;
		border-radius: 4px;
		margin: 0;
		border: none;
	}

	.btn-cancel {
		/* Thay #f5f5f5 */
		background-color: var(--bg-input);
		/* Thay #666 */
		color: var(--text-secondary);
	}

	.btn-confirm {
		background-color: #007aff;
		color: #fff;
	}

	/* --- MODAL MÀU SẮC --- */
	.color-box {
		padding: 0;
		overflow: hidden;
		width: 85%;
	}

	.color-tabs {
		display: flex;
		border-bottom: 1px solid var(--border-color);
	}

	.color-tab {
		flex: 1;
		text-align: center;
		padding: 12px;
		font-size: 15px;
		font-weight: 500;
		/* Thay #666 và #f9f9f9 */
		color: var(--text-secondary);
		background: var(--bg-input);
	}

	.color-tab.active {
		/* Thay #fff */
		background: var(--bg-surface);
		color: #007aff;
		font-weight: bold;
		border-bottom: 2px solid #007aff;
	}

	.color-grid {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		padding: 20px;
		justify-content: center;
	}

	.color-circle {
		width: 36px;
		height: 36px;
		border-radius: 50%;
		border: 1px solid var(--border-color);
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		position: relative;
	}

	.color-circle.selected {
		border: 2px solid #007aff;
		transform: scale(1.1);
	}

	.color-circle.no-color {
		background: var(--bg-surface);
		display: flex;
		align-items: center;
		justify-content: center;
		border: 1px dashed var(--text-hint);
	}

	.x-mark {
		font-size: 20px;
		color: var(--text-hint);
		font-weight: bold;
	}

	/* --- ACTION SHEET --- */
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
		/* Thay #f1f1f1 bằng màu nền page */
		background-color: var(--bg-page);
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
		/* Thay #fff */
		background-color: var(--bg-surface);
		padding: 16px;
		text-align: center;
		font-size: 17px;
		/* Thay #eee */
		border-bottom: 1px solid var(--border-color);
		/* Thêm màu chữ */
		color: var(--text-primary);
	}

	.sheet-item:active {
		/* Thay #ddd */
		background-color: var(--bg-input);
	}

	.sheet-item.cancel {
		font-weight: 600;
	}

	.sheet-gap {
		height: 8px;
		background-color: var(--bg-page);
	}

	@keyframes fadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes slideDown {
		from {
			opacity: 0;
			transform: translateY(-5px);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>