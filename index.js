const inputEl = document.getElementById("input")
const infoTextEl = document.getElementById("info-text")
const meaningContainerEl = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio")
const errorEl = document.getElementById("error");
errorEl.style.display = "none"

async function fetchAPI(word) {
    try {
        infoTextEl.style.display = "block";
        infoTextEl.textContent = `searching for the word: ${word}`;
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res) => res.json());

        if (result.title) {
            meaningContainerEl.style.display = "block";
            infoTextEl.style.display = "none";
            titleEl.textContent = word;
            meaningEl.textContent = "N/A"
            audioEl.style.display = "none"
        } else {
            audioEl.style.display = "inline-flex"
            infoTextEl.style.display = "none";
            meaningContainerEl.style.display = "block";
            titleEl.textContent = result[0].word;
            meaningEl.textContent = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
            console.log(result);
        }

    } catch (error) {
        console.log(error);
        infoTextEl.style.display = "none";
        meaningContainerEl.style.display = "none"
        errorEl.style.display = "block"
    }
}

inputEl.addEventListener("keyup", (e) => {
    if (e.target.value && e.key === "Enter") {
        fetchAPI(e.target.value);
    }
});