import { useAuthStore } from '@/stores/auth';
import { PROJECT_API_URL } from '@/utils/config';
import type { ApiResponse } from '@/types/common';
import type { ProjectMember } from '@/types/Project';

export const getAllMembers = (): Promise<ProjectMember[]> => {
    const authStore = useAuthStore();
    const { rootToken, projectCode } = authStore;

    return new Promise((resolve, reject) => {
        uni.request({
            url: `${PROJECT_API_URL}/getAllMember`,
            method: 'GET',
            data: {
                projectCode: projectCode,
                status: 'all'
            },
            header: {
                'Authorization': `Bearer ${rootToken}`,
                'Content-Type': 'application/json'
            },
            success: (res: UniApp.RequestSuccessCallbackResult) => {
                // Ép kiểu res.data về ApiResponse chứa mảng ProjectMember
                const body = res.data as ApiResponse<ProjectMember[]>;
                
                // Kiểm tra status = 1 (Success)
                if (body.status === 1 && body.data) {
                    resolve(body.data);
                } else {
                    reject(body.message || 'Lỗi lấy danh sách thành viên');
                }
            },
            fail: (err) => {
                reject(err);
            }
        });
    });
};