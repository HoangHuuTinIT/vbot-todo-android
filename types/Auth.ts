//types/Auth.ts 
export interface TokenData {
    token: string;
    refreshToken: string;
    tokenType: string;
}

// Params trên URL khi gọi lấy token
export interface GetTokenParams {
    projectCode: string;
    uid: string;
    type: 'TODO' | 'CRM';
    source: string; // VD: 'Desktop-RTC'
}