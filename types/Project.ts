//types/Project.ts 
export interface ProjectMember {
    Id: number;
    UID: string;
    UserId: string | null;
    UserName: string;
    Avatar: string | null;
    AvatarColor: string;
    Code: string;
    Phone: string | null;
    Status: number;
    memberNo: string | null;
    memberUID: string; // ID dùng để gán việc (Assignee) thường là cái này hoặc UID
    [key: string]: any; // Các trường phụ khác
}