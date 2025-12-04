// src/utils/file.ts

/**
 * Chuyển đổi đường dẫn file (temp path) sang Base64
 * Hỗ trợ đa nền tảng: H5, App, MiniProgram
 * @param path Đường dẫn file tạm
 * @returns Promise<string> Chuỗi Base64
 */
export const pathToBase64 = (path: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        // 1. Trường hợp chạy trên H5 (Trình duyệt)
        // #ifdef H5
        uni.request({
            url: path,
            responseType: 'blob',
            success: (res: any) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (reader.result) {
                        resolve(reader.result as string);
                    } else {
                        reject('FileReader error');
                    }
                };
                reader.readAsDataURL(res.data);
            },
            fail: (err) => reject(err)
        });
        return; 
        // #endif

        // 2. Trường hợp chạy trên APP (Android/iOS)
        // #ifdef APP-PLUS
        plus.io.resolveLocalFileSystemURL(path, (entry) => {
            entry.file((file) => {
                const fileReader = new plus.io.FileReader();
                fileReader.onloadend = (evt: any) => {
                    resolve(evt.target.result);
                };
                fileReader.onerror = (e) => reject(e);
                fileReader.readAsDataURL(file);
            }, (e) => reject(e));
        }, (e) => reject(e));
        return;
        // #endif

        // 3. Trường hợp chạy trên Mini Program (WeChat, v.v...)
        // #ifdef MP
        if (uni.getFileSystemManager) {
            uni.getFileSystemManager().readFile({
                filePath: path,
                encoding: 'base64',
                success: (res) => {
                    let format = 'jpeg';
                    if (path.toLowerCase().endsWith('.png')) format = 'png';
                    // MiniProgram trả về raw base64, cần thêm prefix
                    resolve(`data:image/${format};base64,` + res.data);
                },
                fail: (err) => reject(err)
            });
        } else {
            reject('FileSystemManager not supported');
        }
        return;
        // #endif

        // Fallback
        // reject('Platform not supported for image conversion');
    });
};