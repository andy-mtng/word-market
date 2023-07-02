function useAuthenticated(): boolean {
    const cookies = document.cookie.split(";");
    console.log("useAuthenticated", cookies);
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith("authenticated")) {
            return true;
        }
    }
    return false;
}

export default useAuthenticated;
