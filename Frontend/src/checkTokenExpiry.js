export const checkTokenExpiration = () => {
    const token = localStorage.getItem("freelancerToken");
    if (!token) return;
  
    // Decode JWT payload (Base64 decode)
    const decoded = JSON.parse(atob(token.split(".")[1])); 
    const currentTime = Date.now() / 1000; // Convert to seconds
  
    if (decoded.exp < currentTime) {
      
      localStorage.removeItem("freelancerToken");
      window.location.href = "/freelancerLogin"; // Redirect to login page
    }
  };


  export const checkClientTokenExpiration = () => {
    const token = localStorage.getItem("clientToken");
    if (!token) return;
  
    // Decode JWT payload (Base64 decode)
    const decoded = JSON.parse(atob(token.split(".")[1])); 
    const currentTime = Date.now() / 1000; // Convert to seconds
  
    if (decoded.exp < currentTime) {
     
      localStorage.removeItem("clientToken");
      window.location.href = "/clientLogin"; // Redirect to login page
    }
  };
  

  export const checkAdminTokenExpiration = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
  
    // Decode JWT payload (Base64 decode)
    const decoded = JSON.parse(atob(token.split(".")[1])); 
    const currentTime = Date.now() / 1000; // Convert to seconds
  
    if (decoded.exp < currentTime) {
      
      localStorage.removeItem("adminToken");
      window.location.href = "/adminLogin"; // Redirect to login page
    }
  };
  
