const jokeSetup = document.querySelector("#joke-setup");
const jokePunchline = document.querySelector("#joke-punchline");
const categorySel = document.querySelector("#category-sel");
const jokeBtn = document.querySelector("#joke-btn");
const checkboxDiv = document.querySelector("#checkbox-div");

const apiUrl = "https://v2.jokeapi.dev/joke/";
const options = {
	method: "GET",
	headers: {
		"X-RapidAPI-Host": "jokeapi-v2.p.rapidapi.com",
		"X-RapidAPI-Key": "16661616damshe0032d9fb7530e3p18a74cjsne7bdc0ba54b8",
	}
};

console.log(process.env)

let blacklistFlags = ["nsfw", "religious", "political", "racist", "sexist", "explicit"];
checkboxDiv.childNodes.forEach((child) => {
	child.addEventListener("click", () => {
		if (child.checked) blacklistFlags.splice(blacklistFlags.indexOf(child.name), 1);
		else blacklistFlags.push(child.name);
	});
});

async function getJoke() {
	let selection = categorySel.value;
	console.log(`${apiUrl}${selection}?blacklistFlags=${blacklistFlags.join(",")}`)
	return await fetch(
		`${apiUrl}${selection}?blacklistFlags=${blacklistFlags.join(",")}`,
		options)
		.then((response) => response.json())
		.catch((error) => console.log(error));
};

jokeBtn.addEventListener("click", () => {
	getJoke().then((joke) => {
		if (joke.type === "twopart") {
			jokeSetup.textContent = joke.setup;
			jokePunchline.textContent = joke.delivery;
		} else {
			jokeSetup.textContent = joke.joke;
			jokePunchline.textContent = "";
		}
	});
});