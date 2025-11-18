// models/create_todo.js

// Helper: Chuyển đổi chuỗi ngày giờ sang timestamp
const dateToTimestamp = (dateStr) => {
    if (!dateStr) return -1;
    // Thay thế dấu / bằng - để đảm bảo chuẩn ISO nếu cần (cho iOS)
    const safeDateStr = dateStr.replace(/\//g, '-');
    const dateObj = new Date(safeDateStr);
    return isNaN(dateObj.getTime()) ? -1 : dateObj.getTime();
};

/**
 * Model: Xây dựng Payload
 */
export const buildCreateTodoPayload = (form, config) => {
    
    // Ghép Ngày + Giờ cho phần thông báo
    // Ví dụ: "2025-11-18" + " " + "14:30" = "2025-11-18 14:30"
    const fullNotifyDateTime = `${form.notifyDate} ${form.notifyTime || '00:00'}`;

    // Với ngày hết hạn, thường mặc định là cuối ngày hoặc đầu ngày (ở đây để nguyên ngày)
    const fullDueDate = form.dueDate; 

    return {
        // 1. Các trường Text cơ bản
        title: form.name,
        description: form.desc || "", 
        
        // 2. Các trường Config / System
        projectCode: config.projectCode,
        createdBy: config.uid,
        status: 'TO_DO',
        
        // 3. Enum & Loại
        links: 'CALL', 
        pluginType: '', 
        
        // 4. Các trường Optional
        customerCode: form.customer || "", 
        assigneeId: form.assignee || "",    
        groupId: "",
        transId: "",
        tagCodes: "",
        groupMemberUid: "",
        files: "",
        phone: "",
        
        // 5. Các trường Thời gian (Đã xử lý ghép chuỗi ở trên)
        dueDate: dateToTimestamp(fullDueDate),
        notificationReceivedAt: dateToTimestamp(fullNotifyDateTime)
    };
};