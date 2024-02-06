
const saved_theme = localStorage.getItem("theme");

console.log("---- setting the theme... " + saved_theme);

console.log("size of rem: " + getComputedStyle(document.documentElement).fontSize);

if (saved_theme) {
	//document.body.setAttribute("data-theme", saved_theme);
	document.body.classList.remove('light-theme', 'dark-theme');
	document.body.classList.add(saved_theme + "-theme");
	//document.documentElement.classList.remove('light-theme', 'dark-theme');https://github.com/zedkaido/website.git
	//document.documentElement.classList.add(saved_theme + "-theme")
	console.log("saved theme: " + saved_theme);
} else {
	const prefers_dark = window.matchMedia(
		"(prefers-color-scheme: dark)"
	).matches;
	const theme = prefers_dark ? "dark" : "light";
	//document.body.setAttribute("data-theme", theme);
	localStorage.setItem("theme", theme);

	console.log("setting the theme... " + theme);
}

