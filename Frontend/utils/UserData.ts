import { dataUser } from "./MyTypes";

export default async function SetUserData(userData: dataUser) {
    try {
        const response = await fetch('http://localhost:4444/something', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {"Content-Type": "application/json"},
        })

        const repJson = await response.json();
        if(response) {

        } else {

        }
    } catch (error) {
        
    }
}
