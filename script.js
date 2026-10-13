 
 
  const tabLinks = document.querySelectorAll(".tab-link");
const tabPages = document.querySelectorAll(".tab-page");

const searchInput = document.querySelector("#courseSearch");
const searchButton = document.querySelector("#searchCourse");
const courseBoxes = document.querySelectorAll(".course-box");
const enrollButtons = document.querySelectorAll(".enroll-btn");


// ================================
// TAB SWITCHING
// ================================

tabLinks.forEach(link => {

    link.addEventListener("click", () => {

        const pageName = link.dataset.page;

        tabLinks.forEach(item => {
            item.classList.remove("active-tab");
        });

        tabPages.forEach(page => {
            page.style.display = "none";
        });

        link.classList.add("active-tab");

        document.querySelector(`#${pageName}`).style.display = "block";

        if (pageName === "dashboard-page") {
            displayEnrolledCourses();
        }

    });

});


// ================================
// COURSE SEARCH
// ================================

searchButton.addEventListener("click", searchCourses);

searchInput.addEventListener("keyup", event => {

    if (event.key === "Enter") {
        searchCourses();
    }

});


function searchCourses() {

    const searchValue = searchInput.value.toLowerCase().trim();

    courseBoxes.forEach(course => {

        const courseName =
            course.querySelector("h3").textContent.toLowerCase();

        if (courseName.includes(searchValue)) {
            course.style.display = "block";
        } else {
            course.style.display = "none";
        }

    });

}


// ================================
// AUTHENTICATION ELEMENTS
// ================================

const loginTrigger = document.querySelector(".login-trigger");
const authOverlay = document.querySelector("#authOverlay");
const closeAuth = document.querySelector("#closeAuth");

const loginForm = document.querySelector("#loginForm");
const signupForm = document.querySelector("#signupForm");

const showSignup = document.querySelector("#showSignup");
const showLogin = document.querySelector("#showLogin");

const loginFormElement =
    document.querySelector("#loginFormElement");

const signupFormElement =
    document.querySelector("#signupFormElement");

const logoutButton =
    document.querySelector("#logoutButton");


// ================================
// OPEN LOGIN
// ================================

loginTrigger.addEventListener("click", () => {

    authOverlay.classList.add("show-auth");

});


// ================================
// CLOSE LOGIN
// ================================

closeAuth.addEventListener("click", () => {

    authOverlay.classList.remove("show-auth");

});


// Close when clicking outside the box

authOverlay.addEventListener("click", event => {

    if (event.target === authOverlay) {
        authOverlay.classList.remove("show-auth");
    }

});


// ================================
// SWITCH TO SIGNUP
// ================================

showSignup.addEventListener("click", () => {

    loginForm.classList.add("hidden-auth");
    signupForm.classList.remove("hidden-auth");

});


// ================================
// SWITCH TO LOGIN
// ================================

showLogin.addEventListener("click", () => {

    signupForm.classList.add("hidden-auth");
    loginForm.classList.remove("hidden-auth");

});


// ================================
// CREATE ACCOUNT
// ================================

signupFormElement.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.querySelector("#signupName").value;

    const email =
        document.querySelector("#signupEmail").value;

    const password =
        document.querySelector("#signupPassword").value;


    const user = {
        name: name,
        email: email,
        password: password
    };


    localStorage.setItem(
        "easycodeUser",
        JSON.stringify(user)
    );


    alert("Account created successfully!");

    signupFormElement.reset();

    signupForm.classList.add("hidden-auth");
    loginForm.classList.remove("hidden-auth");

});


// ================================
// LOGIN
// ================================

loginFormElement.addEventListener("submit", event => {

    event.preventDefault();

    const email =
        document.querySelector("#loginEmail").value;

    const password =
        document.querySelector("#loginPassword").value;


    const savedUser =
        JSON.parse(localStorage.getItem("easycodeUser"));


    if (!savedUser) {

        alert("No account found. Please create an account first.");

        return;

    }


    if (
        email === savedUser.email &&
        password === savedUser.password
    ) {

        localStorage.setItem(
            "easycodeLoggedIn",
            "true"
        );

        alert(`Welcome back, ${savedUser.name}!`);

        authOverlay.classList.remove("show-auth");

        loginFormElement.reset();

        updateUserInterface();

    } else {

        alert("Incorrect email or password.");

    }

});


// ================================
// ENROLLMENT
// ================================

enrollButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedCourse =
            button.dataset.course;


        let enrolledCourses =
            JSON.parse(
                localStorage.getItem("easycodeCourses")
            ) || [];


        if (!enrolledCourses.includes(selectedCourse)) {

            enrolledCourses.push(selectedCourse);

            localStorage.setItem(
                "easycodeCourses",
                JSON.stringify(enrolledCourses)
            );

            button.textContent =
                `${selectedCourse} Added`;

            button.style.background =
                "#65d69a";

            button.style.color =
                "#090a0f";

        } else {

            alert(
                `You are already enrolled in ${selectedCourse}.`
            );

        }

    });

});


// ================================
// DISPLAY DASHBOARD COURSES
// ================================

function displayEnrolledCourses() {

    const enrolledCoursesContainer =
        document.querySelector("#enrolledCourses");


    const enrolledCourses =
        JSON.parse(
            localStorage.getItem("easycodeCourses")
        ) || [];


    if (enrolledCourses.length === 0) {

        enrolledCoursesContainer.innerHTML = `
            <p class="dashboard-welcome">
                You have not enrolled in any courses yet.
            </p>
        `;

        return;

    }


    enrolledCoursesContainer.innerHTML = enrolledCourses.map(course => {

        return `
            <div class="enrolled-course">

                <h3>
                    ${course}
                </h3>

                <p>
                    Enrolled
                </p>

            </div>
        `;

    }).join("");

}


// ================================
// UPDATE USER INTERFACE
// ================================

function updateUserInterface() {

    const savedUser =
        JSON.parse(
            localStorage.getItem("easycodeUser")
        );

    const loggedIn =
        localStorage.getItem("easycodeLoggedIn");


    if (savedUser && loggedIn === "true") {

        loginTrigger.textContent =
            savedUser.name;

        document.querySelector("#profileName")
            .textContent = savedUser.name;

        document.querySelector("#profileEmail")
            .textContent = savedUser.email;

        document.querySelector(".profile-avatar")
            .textContent =
            savedUser.name.charAt(0).toUpperCase();

    } else {

        loginTrigger.textContent = "Login";

        document.querySelector("#profileName")
            .textContent = "Guest Student";

        document.querySelector("#profileEmail")
            .textContent =
            "Sign in to view your profile.";

        document.querySelector(".profile-avatar")
            .textContent = "?";

    }

}


// ================================
// LOGOUT
// ================================

logoutButton.addEventListener("click", () => {

    localStorage.removeItem("easycodeLoggedIn");

    updateUserInterface();

    alert("You have been logged out.");

});


// ================================
// CHECK LOGIN ON PAGE LOAD
// ================================

updateUserInterface();

const openCourseButtons =
    document.querySelectorAll(".open-course-btn");

const courseLearningPage =
    document.querySelector("#course-learning-page");

const learningArea =
    document.querySelector(".learning-area");

const backToCourses =
    document.querySelector("#backToCourses");

const lessonList =
    document.querySelector("#lessonList");

const lessonTitle =
    document.querySelector("#lessonTitle");

const lessonText =
    document.querySelector("#lessonText");

const lessonNumber =
    document.querySelector("#lessonNumber");

const lessonProgress =
    document.querySelector("#lessonProgress");

const completeLesson =
    document.querySelector("#completeLesson");


const javascriptLessons = [

    {
        title: "Introduction to JavaScript",

        content: `
            <p>
                JavaScript is a programming language used to make
                websites interactive and dynamic.
            </p>

            <p>
                HTML creates the structure of a website.
                CSS controls the appearance.
                JavaScript controls the behavior.
            </p>

            <code>
const message = "Hello EasyCode";

console.log(message);
            </code>
        `
    },


    {
        title: "Variables",

        content: `
            <p>
                Variables are containers used to store data.
            </p>

            <code>
let name = "Jonah";

const age = 22;

console.log(name);
console.log(age);
            </code>

            <p>
                Use let when the value may change.
                Use const when the value should remain constant.
            </p>
        `
    },


    {
        title: "Data Types",

        content: `
            <p>
                JavaScript has different types of data.
            </p>

            <code>
let name = "Jonah";   // String

let age = 22;        // Number

let isStudent = true; // Boolean
            </code>
        `
    },


    {
        title: "Functions",

        content: `
            <p>
                Functions are reusable blocks of code.
            </p>

            <code>
function greet() {
    console.log("Hello EasyCode");
}

greet();
            </code>
        `
    },


    {
        title: "DOM Manipulation",

        content: `
            <p>
                The DOM allows JavaScript to interact with HTML
                elements on a webpage.
            </p>

            <code>
const heading =
    document.querySelector("h1");

heading.textContent =
    "JavaScript is powerful!";
            </code>
        `
    }

];

let currentLesson = 0;

let completedLessons =
    JSON.parse(
        localStorage.getItem("javascriptProgress")
    ) || [];


openCourseButtons.forEach(button => {

    button.addEventListener("click", () => {

        const courseName =
            button.dataset.course;

        if (courseName === "JavaScript") {

            learningArea.style.display = "none";

            courseLearningPage.style.display = "block";

            loadLessons();

        }

    });

});


function loadLessons() {

    lessonList.innerHTML = "";

    javascriptLessons.forEach((lesson, index) => {

        const lessonButton =
            document.createElement("button");

        lessonButton.classList.add("lesson-item");

        lessonButton.textContent =
            `${index + 1}. ${lesson.title}`;


        if (index === currentLesson) {

            lessonButton.classList.add(
                "active-lesson"
            );

        }


        if (completedLessons.includes(index)) {

            lessonButton.classList.add(
                "completed-lesson"
            );

        }


        lessonButton.addEventListener("click", () => {

            currentLesson = index;

            loadLessons();

            displayLesson();

        });


        lessonList.appendChild(lessonButton);

    });


    displayLesson();

}


function displayLesson() {

    const lesson =
        javascriptLessons[currentLesson];


    lessonNumber.textContent =
        `LESSON ${currentLesson + 1}`;


    lessonTitle.textContent =
        lesson.title;


    lessonText.innerHTML =
        lesson.content;


    const progress =
        Math.round(
            completedLessons.length /
            javascriptLessons.length *
            100
        );


    lessonProgress.textContent =
        `${progress}% Complete`;


    if (
        completedLessons.includes(currentLesson)
    ) {

        completeLesson.textContent =
            "Lesson Completed ✓";

        completeLesson.classList.add(
            "completed"
        );

    } else {

        completeLesson.textContent =
            "Mark Lesson Complete";

        completeLesson.classList.remove(
            "completed"
        );

    }

}


completeLesson.addEventListener("click", () => {

    if (
        !completedLessons.includes(currentLesson)
    ) {

        completedLessons.push(currentLesson);

        localStorage.setItem(
            "javascriptProgress",
            JSON.stringify(completedLessons)
        );

        displayLesson();

        loadLessons();

    }

});


backToCourses.addEventListener("click", () => {

    courseLearningPage.style.display =
        "none";

    learningArea.style.display =
        "block";

});
