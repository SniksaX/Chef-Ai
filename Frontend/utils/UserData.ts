import { userDataForm } from "./MyTypes";

export async function SetUserData(userData: userDataForm) {
    try {
        const response = await fetch('http://localhost:4444/api/userPrefInfo', {
            method: 'POST',
            credentials: "include",
            body: JSON.stringify(userData),
            headers: {"Content-Type": "application/json"},
        })
        
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

// export function pushImage(imageData: File, onProgress: any) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "http://localhost:4444/api/pushImage", true);
//     xhr.withCredentials = true; // If you need credentials

//     xhr.upload.onprogress = (event) => {
//       if (event.lengthComputable) {
//         const progress = (event.loaded / event.total) * 100;
//         onProgress(progress); // Callback function to update progress
//       }
//     };

//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         resolve(JSON.parse(xhr.responseText));
//       } else {
//         reject(new Error("Upload failed: " + xhr.statusText));
//       }
//     };

//     xhr.onerror = () => reject(new Error("XMLHttpRequest error: " + xhr.statusText));
//     xhr.send(imageData); // Send the form data
//   });
// }

export async function pushImage(image: FormData) {
  try {
      const response = await fetch("http://localhost:4444/api/pushImage", {
      method: "POST",
      credentials: "include", 
      body: image,
    });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.error("Server responded with a non-OK status:", response.status);
      return { success: false };
    }
  } catch (error) {
      console.error("Error pushing file:", error);
      return { success: false, error };
  }
}

export async function fetchHistory(){
  try {
    const response = await fetch("http://localhost:4444/api/getHistory", {
    method: "GET",
    credentials: "include", 
    headers: {"Content-Type": "application/json"},
  });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.error("Server responded with a non-OK status:", response.status);
      return { success: false };
    }
  } catch (error) {
    console.error("Error pushing file:", error);
    return { success: false, error };
  }
}

export async function pushShopping(shoppingList: string[]){
  try {
    const response = await fetch("http://localhost:4444/api/createOrAppendShoppingList", {
    method: "POST",
    credentials: "include", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(shoppingList),
  });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.error("Server responded with a non-OK status:", response.status);
      return { success: false };
    }
  } catch (error) {
    console.error("Error pushing file:", error);
    return { success: false, error };
  }
}

export async function updateShopping(shoppingList: string[]){
  try {
    const response = await fetch("http://localhost:4444/api/updateShoppingList", {
    method: "POST",
    credentials: "include", 
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(shoppingList),
  });

    if (response.ok) {
      const data = await response.json();
      return { success: true, data };
    } else {
      console.error("Server responded with a non-OK status:", response.status);
      return { success: false };
    }
  } catch (error) {
    console.error("Error pushing file:", error);
    return { success: false, error };
  }
}

export async function fetchShopping(){
  try {
    const response = await fetch(`http://localhost:4444/api/fetchShoppingList`, {
      method: "GET",
      credentials: "include",
      headers: { 'Content-type': 'application/json' },
    })

    if (response.ok) {
      const data = await response.json();
      return {success: true, data: data}
    } else {
      console.error("server responded with a non ok reponse", response.status)
      return {success: false}
    }
  }catch (error) {
    console.error("Error pushing file:", error);
    return { success: false, error };
  }
}
