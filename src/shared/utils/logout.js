export function clearLocalToken() {
    // 清除 localStorage 的 token
    localStorage.removeItem('token');

    // 重新渲染畫面 (通常導向登入頁)
    window.location.reload();
}