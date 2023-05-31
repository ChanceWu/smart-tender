import { request } from 'umi';

// 素材库 权限
export async function findUserOperate() {
    return request<API.FindUserOperateResult>(`/inter-api/rbac/v1/userPermission/findUserOperate`, {
        method: 'get',
        params: {
            menuInfoCode: 'ibr_manage_center'
        }
    });
}

// 菜单 权限
export async function getMenusPermission() {
    return request<API.GetMenusPermission>(`/inter-api/rbac/v1/menus/runtime/currentUser`, {
        method: 'get',
    });
}

