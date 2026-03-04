const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then(res => res.json()) //promise of json data
        .then(json => displayLesson(json.data));
};

const removeActive = () => {
    const lessonBtn = document.querySelectorAll(".lesson-btn")
    lessonBtn.forEach(btn => btn.classList.remove("active"))
};

const createElements = (arr) =>{
    const htmlElements = arr.map((el) => `<span class = "btn">${el}</span>`)
    return htmlElements.join(" ");
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) =>{
    if(status == true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else{
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}


const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            removeActive();
            const clickBtn = document.getElementById(`lesson-btn-${id}`);
            clickBtn.classList.add("active");
            displayLevelWord(json.data)
        });
};

const displayLesson = (lessons) => {
    // 1. Get the container and empty it
    const lessonContainer = document.getElementById("level-container");
    lessonContainer.innerHTML = "";
    // 2. Get into every lesson
    lessons.forEach(lesson => {
        // 3. Create element
        const levels = document.createElement("div");
        levels.innerHTML = `
        <button id = "lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary lesson-btn"> <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}<button>
        `
        // 4. append element to the container
        lessonContainer.appendChild(levels);
    })

}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
        <div class= "text-center col-span-full space-y-3">
            <p class="text-8xl"><i class="fa-solid fa-triangle-exclamation"></i></p>
            <p class="text-sm font-bangla text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="text-3xl font-medium font-bangla">নেক্সট Lesson এ যান</p>
        </div>
        `;
        manageSpinner(false);
        return;
    }
    words.forEach(word => {
        const wordCard = document.createElement("div");
        wordCard.innerHTML = `
        <div class="bg-white py-10 px-5 text-center rounded-xl shadow-sm">
            <h2 class="font-bold text-3xl mb-6">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h2>
            <p>meaning/Pronounciation</p>
            <p class="font-bangla font-semibold text-3xl my-6">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"}/${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায়নি"}"</p>
            <div class="flex justify-between items-center">
                <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.appendChild(wordCard);
    })
    manageSpinner(false);
}

const loadWordDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => displayWordDetails(json.data));
}

const displayWordDetails = (word) => {
    const detailsBox = document.getElementById('details-container');
    detailsBox.innerHTML = `
    <div>
        <h2 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
    </div>
    <div>
        <h2 class="text-xl font-semibold">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
    </div>
    <div>
        <h2 class="text-xl">Example</h2>
        <p class="text-neutral/70">${word.sentence}</p>
    </div>
    <div>
        <h2 class="text-xl font-bangla">সমার্থক শব্দ গুলো</h2>
        <div class="">${createElements(word.synonyms)}</div>
    </div>
    
    `;
    document.getElementById('my_modal_5').showModal();
}


document.getElementById("btn-search").addEventListener("click", ()=>{
    removeActive();
    const input = document.getElementById("input-search");
    const inputValue = input.value.trim().toLowerCase();
    fetch("https://openapi.programming-hero.com/api/words/all")
    .then(res => res.json())
    .then(json =>{
        const allWords = json.data;
        const filterWords = allWords.filter(word => word.word.toLowerCase().includes(inputValue));
        displayLevelWord(filterWords);
    });
})

loadLessons();