// utils/linkHelper.ts
const getSafeHostname = (url : string) : string => {
	if (!url) return '';
	let tempUrl = url.trim();
	if (!/^https?:\/\//i.test(tempUrl)) {
		tempUrl = 'http://' + tempUrl;
	}
	try {
		return new URL(tempUrl).hostname;
	} catch (e) {
		const match = tempUrl.match(/^(?:https?:\/\/)?(?:www\.)?([^:\/\n?]+)/im);
		return match ? match[1] : '';
	}
};

export const extractLinksAndCleanHtml = (html : string) => {
	if (!html) return { cleanHtml: '', links: [] as string[] };
	const links : string[] = [];
	const iframeRegex = /<iframe[^>]+src="([^">]+)"[^>]*><\/iframe>/g;
	const cleanHtml = html.replace(iframeRegex, (match : any, src : string) => {
		if (src) links.push(src);
		return '';
	});
	return { cleanHtml, links };
};

export const composeHtmlWithIframes = (cleanHtml : string, links : string[]) => {
	let fullContent = cleanHtml;
	links.forEach(link => {
		const iframeStr = `<iframe class="ql-video" frameborder="0" allowfullscreen="true" src="${link}"></iframe>`;
		fullContent += iframeStr;
	});
	return fullContent;
};

export const getFaviconFromUrl = (url : string) => {
	const hostname = getSafeHostname(url);
	if (!hostname) return '';
	return `https://www.google.com/s2/favicons?domain=${hostname}&sz=64`;
};

export const getDomainFromUrl = (url : string) => {
	let hostname = getSafeHostname(url);
	if (!hostname) return 'Liên kết ngoài';

	try {
		hostname = hostname.replace(/^www\./, '');
		const parts = hostname.split('.');
		let name = parts[0];

		if (parts.length > 2) {
			const lastPart = parts[parts.length - 1];
			const secondLastPart = parts[parts.length - 2];
			if (lastPart.length === 2 && ['com', 'net', 'org', 'gov', 'edu'].includes(secondLastPart)) {
				if (parts.length >= 3) {
					name = parts[parts.length - 3];
				}
			} else {
				name = parts[parts.length - 2];
			}
		} else if (parts.length === 2) {
			name = parts[0];
		}
		return name.charAt(0).toUpperCase() + name.slice(1);
	} catch (e) {
		return hostname || 'Liên kết ngoài';
	}
};

export const openExternalLink = (url : string) => {
	if (!url) return;
	let safeUrl = url.trim();
	if (!safeUrl.startsWith('http')) {
		safeUrl = 'https://' + safeUrl;
	}

	// #ifdef APP-PLUS
	plus.runtime.openURL(safeUrl);
	// #endif

	// #ifdef H5
	window.open(safeUrl, '_blank');
	// #endif
};