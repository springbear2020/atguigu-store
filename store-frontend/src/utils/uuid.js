import {v4 as uuidv4} from 'uuid';

// uuid
export const guestUUID = () => {
    // 先从本地存储中获取，若不存在则生成并保存
    let uuid = localStorage.getItem('guestUUID')
    if (!uuid) {
        uuid = uuidv4();
        localStorage.setItem('guestUUID', uuid)
    }
    return uuid
}