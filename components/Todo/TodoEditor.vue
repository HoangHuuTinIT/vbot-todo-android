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

		<view class="toolbar">
			<view class="tool-list">
				<view v-for="(item, index) in tools" :key="index"
					class="tool-item" 
					:class="{ 'active': isActive(item) }" 
					@touchend.prevent="handleToolClick(item)">
					
					<text v-if="item.iconText" :style="item.style" class="txt-icon">{{ item.iconText }}</text>
					<image v-else :src="item.iconImg" class="img-icon"></image>
				</view>

				<view class="tool-divider"></view>
				
				<view class="tool-item" @touchend.prevent="insertImage">
					<image src="https://img.icons8.com/ios/50/666666/image.png" class="img-icon"></image>
				</view>
                
                <view class="tool-item" :class="{'active': isLinkSelected}" @touchend.prevent="handleLink">
					<image src="https://img.icons8.com/ios/50/666666/link--v1.png" class="img-icon"></image>
				</view>
                
                <view class="tool-item" @touchend.prevent="clearFormat">
					<text class="txt-icon" style="font-size: 12px">Clear</text>
				</view>
			</view>
		</view>

		<view class="link-modal" v-if="showLinkModal" @tap="showLinkModal = false">
			<view class="modal-box" @tap.stop>
				<text class="modal-title">Chèn liên kết</text>
				<input class="modal-input" v-model="linkUrl" placeholder="https://example.com" :focus="showLinkModal" />
				<view class="modal-actions">
					<button class="btn-cancel" @tap="showLinkModal = false">Hủy</button>
					<button class="btn-confirm" @tap="confirmLink">Xác nhận</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
import { ref, watch, getCurrentInstance } from 'vue';

const props = defineProps({
	modelValue: String,
	placeholder: { type: String, default: 'Nhập nội dung...' }
});
const emit = defineEmits(['update:modelValue']);

const tools = [
	{ name: 'header', iconText: 'H', style: 'font-weight:bold', action: 'header-menu' },
    { name: 'fontSize', iconText: 'A', style: 'font-weight:bold; font-size:18px', action: 'fontsize-menu' }, 
	{ name: 'bold', iconText: 'B', style: 'font-weight:900' },
	{ name: 'italic', iconText: 'I', style: 'font-style:italic' },
	{ name: 'underline', iconText: 'U', style: 'text-decoration:underline' },
	{ name: 'strike', iconText: 'S', style: 'text-decoration:line-through' },
	{ name: 'align', value: 'left', iconImg: 'https://img.icons8.com/ios/50/666666/align-left.png' },
	{ name: 'align', value: 'center', iconImg: 'https://img.icons8.com/ios/50/666666/align-center.png' },
	{ name: 'align', value: 'right', iconImg: 'https://img.icons8.com/ios/50/666666/align-right.png' },
	{ name: 'align', value: 'justify', iconImg: 'https://img.icons8.com/ios/50/666666/align-justify.png' },
	{ name: 'list', value: 'ordered', iconImg: 'https://img.icons8.com/ios/50/666666/numbered-list.png' },
	{ name: 'list', value: 'bullet', iconImg: 'https://img.icons8.com/ios/50/666666/list.png' },
];

const editorId = ref(`editor-${Math.random().toString(36).substr(2, 5)}`);
const editorCtx = ref<any>(null);
const formats = ref<any>({});
const instance = getCurrentInstance();
const isLinkSelected = ref(false);
const showLinkModal = ref(false);
const linkUrl = ref('');

const handleToolClick = (item: any) => {
    if (item.action === 'header-menu') {
        handleHeaderSetting();
        return;
    }
    if (item.action === 'fontsize-menu') {
        handleFontSizeSetting();
        return;
    }
    format(item.name, item.value);
}

const handleFontSizeSetting = () => {
    const options = [
        'Nhỏ',    
        'Bình thường', 
        'Lớn',   
        'Rất lớn'  
    ];

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

    if (item.value) return currentFormat === item.value;
    return !!currentFormat;
};

const onEditorReady = () => {
	uni.createSelectorQuery().in(instance).select(`#${editorId.value}`).context((res) => {
		if (res && res.context) {
			editorCtx.value = res.context;
			if (props.modelValue) editorCtx.value.setContents({ html: props.modelValue });
		}
	}).exec();
};

const onInput = (e: any) => emit('update:modelValue', e.detail.html);

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
                    if (editorCtx.value) {
                        editorCtx.value.insertImage({ 
                            src: imageRes.tempFilePaths[0], 
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

const lastVal = ref('');
watch(() => props.modelValue, (val) => {
    if (val !== lastVal.value && editorCtx.value) {
        if (!val) {
            editorCtx.value.clear();
        } else {
            editorCtx.value.setContents({
                html: val
            });
        }
    }
    lastVal.value = val || '';
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
.img-icon { width: 18px; height: 18px; opacity: 0.7; }
.tool-divider { width: 1px; height: 20px; background-color: #ddd; display: none; }

.link-modal {
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

@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
</style>