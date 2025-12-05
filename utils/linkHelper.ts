// utils/linkHelper.ts

export const extractLinksAndCleanHtml = (html: string) => {
    if (!html) return { cleanHtml: '', links: [] as string[] };

    const links: string[] = [];
    const iframeRegex = /<iframe[^>]+src="([^">]+)"[^>]*><\/iframe>/g;

    const cleanHtml = html.replace(iframeRegex, (match: any, src: string) => {
        if (src) links.push(src);
        return ''; 
    });

    return { cleanHtml, links };
};

export const composeHtmlWithIframes = (cleanHtml: string, links: string[]) => {
    let fullContent = cleanHtml;
    links.forEach(link => {
        const iframeStr = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${link}"></iframe>`;
        fullContent += iframeStr;
    });
    return fullContent;
};


export const getDomainFromUrl = (url: string) => {
    try {
        let tempUrl = url;
        if (!tempUrl.startsWith('http')) tempUrl = 'http://' + tempUrl;
        const domain = new URL(tempUrl).hostname;
        return domain.replace('www.', '');
    } catch (e) {
        return 'Liên kết ngoài';
    }
};


export const openExternalLink = (url: string) => {
    if (!url) return;
    
    // #ifdef APP-PLUS
  
    plus.runtime.openURL(url);
    // #endif

    // #ifdef H5

    window.open(url, '_blank');
    // #endif
};