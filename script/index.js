const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then(res => res.json()) //promise of json data
        .then(json => displayLesson(json.data));
};

const loadLevelWord = (id) =>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(json => displayLevelWord(json.data));
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
        <button onclick = "loadLevelWord(${lesson.level_no})" class = "btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}<button>
        `
        // 4. append element to the container
        lessonContainer.appendChild(levels);
    })

}

const displayLevelWord = (words) =>{
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if(words.length == 0){
        wordContainer.innerHTML= `
        <div class= "text-center col-span-full space-y-3">
            <p class="text-8xl"><i class="fa-solid fa-triangle-exclamation"></i></p>
            <p class="text-sm font-bangla text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <p class="text-3xl font-medium font-bangla">নেক্সট Lesson এ যান</p>
        </div>
        `
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
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
                <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
            </div>
        </div>
        `
        wordContainer.appendChild(wordCard);
    })
}

loadLessons();