<template>
	<view class="editor-container">
		<editor 
			:id="editorId" 
			class="ql-container" 
			:placeholder="placeholder"
			show-img-size 
			show-img-toolbar 
			show-img-resize
			@ready="onEditorReady" 
			@input="onInput"
			@statuschange="onStatusChange">
		</editor>

	
		<view class="link-cards-area" v-if="insertedLinks.length > 0">
			<LinkCard 
				v-for="(link, index) in insertedLinks" 
				:key="index" 
				:url="link"
				:removable="true"
				@remove="removeLink(index)"
			/>
		</view>

		<!-- 🔹 TOOLBAR -->
		<view class="toolbar">
			<view class="tool-list">
				<view v-for="(item, index) in tools" :key="index"
					class="tool-item" 
					:class="{ 'active': isActive(item) }" 
					@touchend.prevent="handleToolClick(item)">
					
					<text v-if="item.iconText" 
						  :style="item.style" 
						  class="txt-icon"
						  :class="{'txt-dynamic': item.action}"> 
						{{ getDisplayText(item) }} 
					</text>
					
					<image v-else :src="getDisplayImage(item)" class="img-icon"></image>
				</view>

				<view class="tool-divider"></view>
				
				<view class="tool-item" @touchend.prevent="insertImage">
					<image src="https://img.icons8.com/ios/50/666666/image.png" class="img-icon"></image>
				</view>
				
				<view class="tool-item" :class="{'active': isLinkSelected}" @touchend.prevent="handleLink">
					<image src="https://img.icons8.com/ios/50/666666/link--v1.png" class="img-icon"></image>
				</view>

				
				<view class="tool-item" @touchend.prevent="openCardLinkModal">
					<image src="https://img.icons8.com/ios/50/666666/add-link.png" class="img-icon"></image>
				</view>
				
				<view class="tool-item" @touchend.prevent="clearFormat">
					<text class="txt-icon" style="font-size: 12px">Clear</text>
				</view>
			</view>
		</view>

	
		<view class="modal-overlay" v-if="showLinkModal" @tap="showLinkModal = false">
			<view class="modal-box" @tap.stop>
				<text class="modal-title">Chèn Hyperlink (Text)</text>
				<input class="modal-input" v-model="linkUrl" placeholder="https://example.com" :focus="showLinkModal" />
				<view class="modal-actions">
					<button class="btn-cancel" @tap="showLinkModal = false">Hủy</button>
					<button class="btn-confirm" @tap="confirmLink">Xác nhận</button>
				</view>
			</view>
		</view>

		
		<view class="modal-overlay" v-if="showCardLinkModal" @tap="showCardLinkModal = false">
			<view class="modal-box" @tap.stop>
				<text class="modal-title">Chèn Thẻ Liên Kết (Web)</text>
				<text class="modal-desc">Liên kết sẽ hiển thị dạng thẻ xem trước.</text>
				<input class="modal-input" v-model="cardLinkUrl" placeholder="https://youtube.com/..." :focus="showCardLinkModal" />
				<view class="modal-actions">
					<button class="btn-cancel" @tap="showCardLinkModal = false">Hủy</button>
					<button class="btn-confirm" @tap="confirmCardLink">Thêm thẻ</button>
				</view>
			</view>
		</view>

		
		<view class="modal-overlay" v-if="showColorModal" @tap="closeColorModal">
			<view class="modal-box color-box" @tap.stop>
				<view class="color-tabs">
					<view class="color-tab" :class="{ active: colorTab === 'color' }" @tap="colorTab = 'color'">
						Màu chữ
					</view>
					<view class="color-tab" :class="{ active: colorTab === 'backgroundColor' }" @tap="colorTab = 'backgroundColor'">
						Màu nền
					</view>
				</view>

				<view class="color-grid">
					<view class="color-circle no-color" @tap="applyColor('')">
						<text class="x-mark">✕</text>
					</view>
					<view v-for="(c, idx) in colorList" :key="idx" 
						class="color-circle" 
						:style="{ backgroundColor: c }"
						:class="{ selected: isColorSelected(c) }"
						@tap="applyColor(c)">
					</view>
				</view>
			</view>
		</view>

	</view>
</template>


<script setup lang="ts">
import { ref, watch, getCurrentInstance, onMounted } from 'vue';
import LinkCard from '@/components/Todo/LinkCard.vue';
import { extractLinksAndCleanHtml, composeHtmlWithIframes } from '@/utils/linkHelper'; 
const props = defineProps({
	modelValue: String,
	placeholder: { type: String, default: 'Nhập nội dung...' }
});
const emit = defineEmits(['update:modelValue']);

const tools = [
	{ name: 'header', iconText: 'H', style: 'font-weight:bold', action: 'header-menu' },
	{ name: 'fontSize', iconText: 'A', style: 'font-weight:bold; font-size:16px', action: 'fontsize-menu' }, 
	{ name: 'bold', iconText: 'B', style: 'font-weight:900' },
	{ name: 'italic', iconText: 'I', style: 'font-style:italic' },
	{ name: 'underline', iconText: 'U', style: 'text-decoration:underline' },

	{ name: 'color', iconImg: 'https://img.icons8.com/ios-filled/50/000000/text-color.png', action: 'color-picker' },
	{ name: 'backgroundColor', iconImg: 'https://img.icons8.com/ios-filled/50/000000/marker-pen.png', action: 'bgcolor-picker' },

	{ name: 'strike', iconText: 'S', style: 'text-decoration:line-through' },
	{ name: 'align', iconImg: 'https://img.icons8.com/ios/50/666666/align-left.png', action: 'align-menu' },
	{ name: 'list', value: 'ordered', iconImg: 'https://img.icons8.com/ios/50/666666/numbered-list.png' },
	{ name: 'list', value: 'bullet', iconImg: 'https://img.icons8.com/ios/50/666666/list.png' },
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


const showLinkModal = ref(false);
const linkUrl = ref('');

const showCardLinkModal = ref(false);
const cardLinkUrl = ref('');

const showColorModal = ref(false);
const colorTab = ref<'color' | 'backgroundColor'>('color');

const insertedLinks = ref<string[]>([]);


const getDomain = (url: string) => {
	try {
		const domain = new URL(url).hostname;
		return domain.replace('www.', '');
	} catch (e) {
		return 'Website';
	}
};


const openLink = (url: string) => {
    // #ifdef APP-PLUS
    plus.runtime.openURL(url);
    // #endif
    // #ifdef H5
    window.open(url, '_blank');
    // #endif
}


const parseContent = (html: string) => {
	if (!html) return { cleanHtml: '', links: [] };
	
	const links: string[] = [];
	
	const iframeRegex = /<iframe[^>]+src="([^">]+)"[^>]*><\/iframe>/g;
	

	const cleanHtml = html.replace(iframeRegex, (match, src) => {
		if (src) links.push(src);
		return '';
	});

	return { cleanHtml, links };
};


const composeContent = (cleanHtml: string, links: string[]) => {
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
const removeLink = (index: number) => {
	insertedLinks.value.splice(index, 1);
	triggerUpdate();
};

const triggerUpdate = () => {
	if (editorCtx.value) {
		editorCtx.value.getContents({
			success: (res: any) => {
				const html = res.html;
				lastVal.value = html; 
				
				const finalContent = composeHtmlWithIframes(html, insertedLinks.value);
				emit('update:modelValue', finalContent);
			}
		});
	}
};



const getDisplayText = (item: any) => {
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


const getDisplayImage = (item: any) => {
	if (item.action === 'align-menu') {
		const alignVal = formats.value.align || 'left';
		switch (alignVal) {
			case 'center': return 'https://img.icons8.com/ios/50/666666/align-center.png';
			case 'right': return 'https://img.icons8.com/ios/50/666666/align-right.png';
			case 'justify': return 'https://img.icons8.com/ios/50/666666/align-justify.png';
			default: return 'https://img.icons8.com/ios/50/666666/align-left.png';
		}
	}
	return item.iconImg;
};

const handleToolClick = (item: any) => {
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
}

const applyColor = (color: string) => {
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

const isColorSelected = (color: string) => {
	return formats.value[colorTab.value] === color;
};

const handleAlignSetting = () => {
	const options = ['Căn trái', 'Căn giữa', 'Căn phải', 'Căn đều'];
	uni.showActionSheet({
		itemList: options,
		success: (res) => {
			const index = res.tapIndex;
			if (index === 0) format('align', 'left');
			if (index === 1) format('align', 'center');
			if (index === 2) format('align', 'right');
			if (index === 3) format('align', 'justify');
		}
	});
}

const handleFontSizeSetting = () => {
	const options = ['Nhỏ', 'Bình thường', 'Lớn', 'Rất lớn'];
	uni.showActionSheet({
		itemList: options,
		success: (res) => {
			const index = res.tapIndex;
			if (index === 0) format('fontSize', 'small');
			if (index === 1) format('fontSize', null);
			if (index === 2) format('fontSize', 'large');
			if (index === 3) format('fontSize', 'huge');
		}
	});
}

const handleHeaderSetting = () => {
	const options = ['Tiêu đề 1 (H1)', 'Tiêu đề 2 (H2)', 'Tiêu đề 3 (H3)', 'Tiêu đề 4 (H4)', 'Tiêu đề 5 (H5)', 'Tiêu đề 6 (H6)', 'Văn bản thường'];
	uni.showActionSheet({
		itemList: options,
		success: (res) => {
			if (res.tapIndex < 6) {
				format('header', res.tapIndex + 1);
			} else {
				format('header', null);
			}
		}
	});
}

const isActive = (item: any) => {
	const currentFormat = formats.value[item.name];
	if (item.action === 'header-menu') return !!currentFormat;
	if (item.action === 'fontsize-menu') return !!currentFormat;
	if (item.action === 'align-menu') return !!currentFormat && currentFormat !== 'left';
	
	if (item.name === 'color') return !!formats.value.color;
	if (item.name === 'backgroundColor') return !!formats.value.backgroundColor;

	if (item.value) return currentFormat === item.value;
	return !!currentFormat;
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

const onInput = (e: any) => {
	const val = e.detail.html;
	lastVal.value = val; 
	const finalContent = composeHtmlWithIframes(val, insertedLinks.value);
	emit('update:modelValue', finalContent);
};

const onStatusChange = (e: any) => {
	formats.value = e.detail;
	isLinkSelected.value = !!e.detail.link;
};

const format = (name: string, value: any = null) => {
	if (!editorCtx.value) return;
	editorCtx.value.format(name, value);
};

const insertImage = () => {
	uni.showActionSheet({
		itemList: ['Chụp ảnh mới', 'Chọn từ thư viện'],
		success: (res) => {
			const index = res.tapIndex;
			let source: 'camera' | 'album' = 'album';
			if (index === 0) source = 'camera';
			if (index === 1) source = 'album';

			uni.chooseImage({
				count: 1,
				sourceType: [source],
				success: (imageRes) => {
					const tempPath = imageRes.tempFilePaths[0];
					if (editorCtx.value) {
						editorCtx.value.insertImage({
							src: tempPath, 
							width: '80%',
							alt: 'image'
						});
					}
				}
			});
		}
	});
};

const handleLink = () => {
	if(isLinkSelected.value) {
		editorCtx.value.format('link', null); 
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
.editor-container {
	display: flex;
	flex-direction: column;
	background: #fff;
	border: 1px solid #e0e0e0;
	border-radius: 8px;
	overflow: hidden;
	min-height: 250px; 
}
.ql-container {
	flex: 1;
	width: 100%;
	padding: 15px;
	font-size: 15px;
	line-height: 1.5;
	box-sizing: border-box;
	color: #333;
	min-height: 150px;
}

.link-cards-area {
	padding: 0 15px 10px 15px;
	background: #fff;
}
.link-card {
	display: flex;
	align-items: center;
	background-color: #f8f9fa;
	border: 1px solid #e9ecef;
	border-radius: 8px;
	padding: 10px;
	margin-bottom: 8px;
	box-shadow: 0 1px 2px rgba(0,0,0,0.03);
}
.link-card-icon {
	width: 40px;
	height: 40px;
	background-color: #e7f1ff;
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-right: 10px;
	flex-shrink: 0;
}
.card-icon-img {
	width: 20px;
	height: 20px;
}
.link-card-content {
	flex: 1;
	overflow: hidden;
	display: flex;
	flex-direction: column;
}
.link-domain {
	font-size: 14px;
	font-weight: 600;
	color: #333;
	margin-bottom: 2px;
}
.link-url {
	font-size: 12px;
	color: #888;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.link-card-remove {
	padding: 5px;
	margin-left: 5px;
}
.remove-btn {
	color: #999;
	font-size: 16px;
	font-weight: bold;
}

.toolbar {
	background-color: #f5f7fa;
	border-top: 1px solid #eee;
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
	background-color: #fff;
	box-shadow: 0 1px 2px rgba(0,0,0,0.05);
	flex-shrink: 0; 
}
.tool-item.active {
	background-color: #d0e4ff;
	color: #007aff;
	border: 1px solid #007aff;
}
.txt-icon { font-size: 16px; color: #555; font-weight: 600; }
.txt-dynamic { font-size: 14px; } 
.img-icon { width: 18px; height: 18px; opacity: 0.7; }
.tool-divider { width: 1px; height: 20px; background-color: #ddd; display: none; }

.modal-overlay {
	position: fixed;
	top: 0; left: 0; right: 0; bottom: 0;
	background-color: rgba(0,0,0,0.5);
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
}
.modal-box {
	width: 80%;
	background-color: #fff;
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
}
.modal-desc {
	font-size: 13px;
	color: #888;
	margin-bottom: 15px;
	display: block;
	text-align: center;
}
.modal-input {
	border: 1px solid #ddd;
	padding: 10px;
	border-radius: 6px;
	margin-bottom: 20px;
	font-size: 15px;
	height: 40px;
}
.modal-actions {
	display: flex;
	justify-content: flex-end;
	gap: 10px;
}
.btn-cancel, .btn-confirm {
	font-size: 14px;
	padding: 0 15px;
	height: 36px;
	line-height: 36px;
	border-radius: 4px;
	margin: 0;
	border: none;
}
.btn-cancel { background-color: #f5f5f5; color: #666; }
.btn-confirm { background-color: #007aff; color: #fff; }

.color-box {
	padding: 0; 
	overflow: hidden;
	width: 85%;
}
.color-tabs {
	display: flex;
	border-bottom: 1px solid #eee;
}
.color-tab {
	flex: 1;
	text-align: center;
	padding: 12px;
	font-size: 15px;
	font-weight: 500;
	color: #666;
	background: #f9f9f9;
}
.color-tab.active {
	background: #fff;
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
	border: 1px solid #e0e0e0;
	box-shadow: 0 2px 4px rgba(0,0,0,0.1);
	position: relative;
}
.color-circle.selected {
	border: 2px solid #007aff;
	transform: scale(1.1);
}
.color-circle.no-color {
	background: #fff;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px dashed #999;
}
.x-mark {
	font-size: 20px;
	color: #999;
	font-weight: bold;
}

@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>