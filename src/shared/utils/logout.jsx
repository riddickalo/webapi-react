import { useContext } from 'react';
import { UserContext } from "../contexts/User_Provider";

export function useLogout() {
    const { setUserInfo } = useContext(UserContext);
    
    const logout = () => {
        setUserInfo(null);                  // 清除使用者資訊
        localStorage.removeItem('token');   // Clear the token
        localStorage.removeItem('userInfo'); // Clear user info from localStorage
    }
    
    // 重新渲染畫面 (通常導向登入頁)
    // window.location.reload();
    return logout;
}