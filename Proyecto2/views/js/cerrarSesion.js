window.onload = () => {
    //localStorage.removeItem("user"); // Borrar el nombre de usuario del local Storage
    sessionStorage.removeItem("user"); // Borrar el nombre de usuario del session Storage
    location.href = "/";
}