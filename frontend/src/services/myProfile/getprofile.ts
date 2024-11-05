export const redirectToProfile = (): void => {
    const userId = localStorage.getItem('userId');
    
    if (userId) {
      window.location.href = `/profile/${userId}`;
    } else {
      console.error("User ID not found in localStorage");
    }
};
  