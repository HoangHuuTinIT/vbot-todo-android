import { useAuthStore } from '@/stores/auth';
import { PROJECT_API_URL } from '@/utils/config';
import type { ApiResponse } from '@/types/common';
import type { ProjectMember } from '@/types/Project';
import { request } from '@/utils/request';
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
                
                const body = res.data as ApiResponse<ProjectMember[]>;
               
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

export const getProjectByCode = (code: string): Promise<any> => {
    const authStore = useAuthStore();
    
    return new Promise((resolve, reject) => {
        uni.request({
            url: `${PROJECT_API_URL}/getByProjectCode`,
            method: 'GET',
            data: { code: code },
            header: {
                'Authorization': `Bearer ${authStore.rootToken}`, 
                'Content-Type': 'application/json'
            },
            success: (res: UniApp.RequestSuccessCallbackResult) => {
                const data = res.data as any;
                if (res.statusCode === 200) {
                    resolve(data.data || data); 
                } else {
                    reject(data);
                }
            },
            fail: (err) => reject(err)
        });
    });
};