import { userDataForm } from "./MyTypes";

export async function middlewareCheck(sessioncookie: any) {
  console.log(sessioncookie)
  try {
      const response = await fetch ('http://localhost:4444/api/middleware', {
        method: 'POST',
        credentials: 'include',
        headers: {
          "content-type": "application/json",
      },
        body: JSON.stringify(sessioncookie)
      })
      console.log(response)
      if (response.ok) {
        return {success: true};
      } else {
        return {success: false};
      }
  } catch (error) {
    console.error(error);
  };
}

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

export async function LogOutUser(){
  try {
    const response = await fetch("http://localhost:4444/api/userLogout", {
      method: "POST",
      credentials: "include",
      headers: {"Content-Type": "application"},
    })

    if (response.ok) {
      return { success: true}
    }
    else {
      return {success: false}
    }
  } catch (error) {
    console.error(error, "something went wrong")
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
