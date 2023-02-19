function toggleTheme() {
    var body = document.getElementsByTagName("body")[0];
    var toggle = document.getElementById("toggle");
    if (body.classList.contains("dark")) {
        body.classList.remove("dark");
        toggle.innerHTML = "🌗";
        localStorage.setItem("theme", "light");
    } else {
        body.classList.add("dark");
        toggle.innerHTML = "🌕";
        localStorage.setItem("theme", "dark");
    }
}
