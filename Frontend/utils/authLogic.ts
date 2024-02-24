//frontened/utils/authLogic.ts

import { userDataLoginType, userDataRegisterType } from "./MyTypes";


export async function SignIn(userData: userDataRegisterType) {
    try {
        const response = await fetch('http://localhost:4444/api/userSignIn', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {"Content-Type": "application/json"},
        })
        
        console.log(response.json)
        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
          } else {
            console.error("Server responded with a non-OK status:", response.status);
            return { success: false };
          }
    } catch (error) {
        console.log(error);
    }
}

export async function userLogin(userData: userDataLoginType) {
    try {
        const response = await fetch('http://localhost:4444/api/userLogin', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {"Content-Type": "application/json"},
        })
        
        console.log(response.json)
        if (response.ok) {
            const data = await response.json();
            return { success: true, data };
          } else {
            console.error("Server responded with a non-OK status:", response.status);
            return { success: false };
          }
    } catch (error) {
        console.log(error);
    }
}