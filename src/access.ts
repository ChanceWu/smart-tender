/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: API.CurrentUser, menuPermission?: string[] } | undefined) {
  const { currentUser, menuPermission } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    manageCenter: menuPermission?.includes('ibr_manage_center'),
  };
}
