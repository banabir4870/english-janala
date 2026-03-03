const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then(res => res.json()) //promise of json data
        .then(json => displayLesson(json.data));
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
        <button class = "btn btn-outline btn-primary"> <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}<button>
        `
        // 4. append element to the container
        lessonContainer.appendChild(levels);
    })

}

loadLessons();