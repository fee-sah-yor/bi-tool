// Save the token in localStorage
export const saveToken = (token) => {
    localStorage.setItem('authToken', token); 
    // console.log("Token saved in localStorage:", token);
  };
  
  // Retrieve the token from localStorage
  export const getToken = () => {
    const token = localStorage.getItem('authToken'); 
    // console.log("Token retrieved from localStorage:", token);
    return token || null; 
  };
  
  // Remove the token from localStorage
  export const removeToken = () => {
    localStorage.removeItem('authToken'); 
    // console.log("Token removed from localStorage");
  };
  