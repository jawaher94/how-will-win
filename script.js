const  sound=new Audio('background.mp3');

const questions = [
{ question: "ما هو الركن الرابع من أركان الإسلام؟", answers: ["الصوم", "الصلاة", "الزكاة", "الحج"], correct: 0 },
{ question: "كم يومًا يصوم المسلم في شهر رمضان؟", answers: ["30 يومًا دائمًا", "29 أو 30 يومًا", "28 يومًا", "31 يومًا"], correct: 1 },
{ question: "متى يبدأ وقت الإفطار في رمضان؟", answers: ["قبل غروب الشمس", "عند الغروب", "بعد العشاء", "عند منتصف الليل"], correct: 1 },
{ question: "ما هو الشهر الذي يلي رمضان؟", answers: ["ذو القعدة", "شعبان", "شوال", "رجب"], correct: 2 },
{ question: "ما هو السحور؟", answers: ["وجبة تُؤكل عند الفجر", "وجبة تُؤكل عند المغرب", "وجبة تُؤكل قبل النوم", "وجبة تُؤكل بعد الظهر"], correct: 0 },
{ question: "في أي سنة فرض صيام شهر رمضان؟", answers: ["السنة الأولى للهجرة", "السنة الثانية للهجرة", "السنة الثالثة للهجرة", "السنة الرابعة للهجرة"], correct: 1 },
{ question: "كم عدد ركعات صلاة التراويح؟", answers: ["8", "10", "20", "12"], correct: 2 },
{ question: "ما هي الليلة التي تُسمى بليلة القدر؟", answers: ["ليلة 21", "ليلة 23", "ليلة 25", "ليلة 27"], correct: 3 },
{ question: "ما هو الدعاء المستحب عند الإفطار؟", answers: ["اللهم إني صائم", "اللهم لك صمت وعلى رزقك أفطرت", "اللهم اجعلني من الصالحين", "اللهم اهدني وسامحني"], correct: 1 },
{ question: "ما هو حكم الصيام على المريض الذي لا يستطيع الصوم؟", answers: ["يجب أن يصوم رغم المرض", "يجوز له الفطر وعليه الكفارة", "لا يجوز له الفطر أبدًا", "يصوم نصف يوم فقط"], correct: 1 },
{ question: "في أي سورة وردت فرضية الصيام؟", answers: ["سورة البقرة", "سورة الفاتحة", "سورة آل عمران", "سورة المائدة"], correct: 0 },
{ question: "كم عدد آيات الصيام في سورة البقرة؟", answers: ["1", "2", "3", "4"], correct: 3 },
{ question: "من هو الصحابي الذي جمع الناس على صلاة التراويح؟", answers: ["أبو بكر الصديق", "عمر بن الخطاب", "عثمان بن عفان", "علي بن أبي طالب"], correct: 1 },
{ question: "ما هي كفارة من أفطر يومًا عمدًا في رمضان؟", answers: ["قضاء يوم واحد", "إطعام 10 مساكين", "عتق رقبة أو صيام شهرين متتابعين", "التوبة فقط"], correct: 2 },
{ question: "ما هو أول شيء يفطر عليه النبي ﷺ؟", answers: ["الماء", "التمر", "الحليب", "الخبز"], correct: 1 },
];
 

// تشغيل موسيقى الخلفية
function playBackgroundMusic() {
    sound.loop=true
    sound.play();
}

function playBackgroundMusic() {
    sound.loop = true;
    sound.play().then(() => {
        document.getElementById("play-music").style.display = "none";
    }).catch((error) => {
        console.log("تتطلب المتصفحات تفاعل المستخدم لتشغيل الصوت:", error);
    });
    sound.loop = true;
}

let currentQuestionIndex = 0;
let currentPrizeIndex = 14;
const prizeList = document.querySelectorAll(".prize");
let timer;
let timeLeft = 30;
let lifelinesUsed = { fifty: false, audience: false, phone: false };
let isPaused = false;


function resumeGame() {
    if (isPaused) {
        isPaused = false;
        document.getElementById("pause-resume-timer").innerHTML = "⏸  ";
        resumeTimer();
    }
}

function toggleTimer() {
    const button = document.getElementById("pause-resume-timer");

    if (isPaused) {
        isPaused = false;
        button.innerHTML = "⏸  ";
        resumeTimer();
    } else {
        isPaused = true;
        button.innerHTML = "▶  ";
        clearInterval(timer);
    }
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                showAlert("⏳ انتهى الوقت! انتهت اللعبة.");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        }
    }, 1000);
}

function resumeTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                showAlert("⏳ انتهى الوقت! انتهت اللعبة.");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        }
    }, 1000);
}
/*
function resumeTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            document.getElementById("timer").textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                showAlert("⏳ انتهى الوقت! انتهت اللعبة.");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }
        }
    }, 1000);
}
*/

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showAlert("🎉 تهانينا! لقد فزت بالمليون!");
        return;
    }

    const q = questions[currentQuestionIndex];
    document.getElementById("question-text").textContent = q.question;
    document.querySelectorAll(".answer").forEach((btn, index) => {
        btn.innerHTML =`<span class="answer-number">${index + 1}.</span> ${q.answers[index]}`;
        btn.style.display = "block";
        btn.classList.remove("correct", "wrong", "selected");
        btn.disabled = false;
    });

    updatePrizeIndicator();
    resetTimer();
}
/*
function checkAnswer(index) {
    clearInterval(timer);
    const buttons = document.querySelectorAll(".answer");
    buttons.forEach(btn => btn.disabled = true);

    buttons[index].classList.add("selected");

    setTimeout(() => {
        if (index === questions[currentQuestionIndex].correct) {
            buttons[index].classList.remove("selected");
            buttons[index].classList.add("correct");
            setTimeout(() => {
                currentQuestionIndex++;
                currentPrizeIndex--;
                setTimeout(() => {  // تأخير 5 ثوانٍ قبل الانتقال للسؤال التالي
                    loadQuestion();
                }, 4000);
            }, 1000);
        } else {
            buttons[index].classList.remove("selected");
            buttons[index].classList.add("wrong");
            setTimeout(() => {
                showAlert("❌ إجابة خاطئة! انتهت اللعبة.");
                setTimeout(() => {
                    location.reload();
                }, 3000);
            }, 1000);
        }
    }, 2000);
}
*/
function checkAnswer(index) {
    clearInterval(timer);
    const buttons = document.querySelectorAll(".answer");
    buttons.forEach(btn => btn.disabled = true);

    buttons[index].classList.add("selected");

    setTimeout(() => {
        if (index === questions[currentQuestionIndex].correct) {
            buttons[index].classList.remove("selected");
            buttons[index].classList.add("correct");
            setTimeout(() => {
                currentQuestionIndex++;
                currentPrizeIndex--;
                setTimeout(() => {
                    loadQuestion();
                }, 4000);
            }, 1000);
        } else {
            buttons[index].classList.remove("selected");
            buttons[index].classList.add("wrong");
            setTimeout(() => {
                showAlert("❌ إجابة خاطئة! لقد خسرت بسبب الإجابة الخاطئة.", true);
            }, 1000);
        }
    }, 2000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showAlert("⏳ انتهى الوقت! لقد خسرت بسبب انتهاء الوقت.", true);
        }
    }, 1000);
}

function updatePrizeIndicator() {
    prizeList.forEach((prize, index) => {
        prize.classList.remove("current-prize");
        if (index === currentPrizeIndex) {
            prize.classList.add("current-prize");
        }
    });
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    document.getElementById("timer").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            showAlert("⏳ انتهى الوقت! انتهت اللعبة.");
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    }, 1000);
}

function useFiftyFifty() {
    if (!lifelinesUsed.fifty) {
        lifelinesUsed.fifty = true;
        const q = questions[currentQuestionIndex];
        const correctIndex = q.correct;
        let wrongAnswers = q.answers.filter((_, index) => index !== correctIndex);
        wrongAnswers = wrongAnswers.sort(() => Math.random() - 0.5).slice(0, 2);

        document.querySelectorAll(".answer").forEach((btn, index) => {
            if (wrongAnswers.includes(q.answers[index])) {
                btn.style.display = "none";
            }
        });
    }
}
/*
function askAudience() {
    if (!lifelinesUsed.audience) {
        lifelinesUsed.audience = true;
        const q = questions[currentQuestionIndex];
        const correctIndex = q.correct;
        showAlert(`الجمهور يعتقد أن الإجابة الصحيحة هي "${q.answers[correctIndex]}"`);
    }
}
*/



// تعديل دالة مساعدة الجمهور
function askAudience() {
    if (!lifelinesUsed.audience) {
        lifelinesUsed.audience = true;

        const q = questions[currentQuestionIndex];
        const correctIndex = q.correct;

        // توزيع نسب تصويت عشوائية مؤقتة للتحريك
        let tempPercentages = [20, 30, 40, 50];
        tempPercentages = tempPercentages.sort(() => Math.random() - 0.5);

        // النسب النهائية مع رفع نسبة الإجابة الصحيحة
        let finalPercentages = [10, 15, 20, 25];
        finalPercentages[correctIndex] = Math.floor(Math.random() * 40) + 50;
        let remaining = 100 - finalPercentages[correctIndex];
        
        finalPercentages = finalPercentages.map((p, index) => 
            index !== correctIndex ? Math.floor(p * remaining / 50) : p
        );

        // إنشاء الرسم البياني مع الحركة
        showAudienceChart(q.answers, tempPercentages, finalPercentages, correctIndex);
    }
}

// دالة عرض الرسم البياني لمساعدة الجمهور مع الحركة والتصميم الذهبي
function showAudienceChart(answers, tempPercentages, finalPercentages, correctIndex) {
    // إنشاء عنصر Canvas للرسم البياني
    const chartContainer = document.createElement("div");
    chartContainer.id = "audience-chart-container";
    chartContainer.style.position = "fixed";
    chartContainer.style.top = "50%";
    chartContainer.style.left = "50%";
    chartContainer.style.transform = "translate(-50%, -50%)";
    chartContainer.style.backgroundColor = "#1a1a1a";
    chartContainer.style.padding = "30px";
    chartContainer.style.border = "3px solid gold";
    chartContainer.style.zIndex = "9999";
    chartContainer.style.boxShadow = "0 4px 15px rgba(255, 215, 0, 0.7)";
    chartContainer.style.borderRadius = "10px";
    chartContainer.style.width = "70vw";  // تكبير الحجم
    chartContainer.style.height = "70vh"; // تكبير الحجم

    const canvas = document.createElement("canvas");
    canvas.id = "audience-chart";
    chartContainer.appendChild(canvas);
    document.body.appendChild(chartContainer);

    const chart = new Chart(canvas, {
        type: 'bar',
        data: {
            labels: answers,
            datasets: [{
                label: 'نسبة تصويت الجمهور (%)',
                data: tempPercentages,
                backgroundColor: ['#FFD700', '#DAA520', '#B8860B', '#8B7500'],
                borderColor: '#333',
                borderWidth: 2
            }]
        },
        options: {
            animation: {
                duration: 2000,  // مدة الحركة الأولية
                easing: 'easeOutBounce'
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        color: 'gold'
                    },
                    grid: {
                        color: 'rgba(255, 215, 0, 0.2)'
                    }
                },
                x: {
                    ticks: {
                        color: 'gold'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    // حركة الأعمدة وثباتها عند الإجابة الصحيحة
    setTimeout(() => {
        chart.data.datasets[0].data = finalPercentages;
        chart.update();

        // تمييز العمود الصحيح
        setTimeout(() => {
            chart.data.datasets[0].backgroundColor = answers.map((_, index) => 
                index === correctIndex ? '#32CD32' : '#8B7500'
            );
            chart.update();
        }, 2000);  // تأخير قبل تمييز الإجابة الصحيحة
    }, 3000);  // تأخير قبل ثبات الأعمدة

    // زر إغلاق الرسم البياني
    const closeButton = document.createElement("button");
    closeButton.textContent = "إغلاق";
    closeButton.style.marginTop = "10px";
    closeButton.style.padding = "10px 15px";
    closeButton.style.backgroundColor = "gold";
    closeButton.style.color = "black";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.cursor = "pointer";
    closeButton.style.fontWeight = "bold";
    closeButton.onclick = () => {
        document.body.removeChild(chartContainer);
    };
    chartContainer.appendChild(closeButton);
}

function callFriend() {
    if (!lifelinesUsed.phone) {
        lifelinesUsed.phone = true;
        const q = questions[currentQuestionIndex];
        const correctIndex = q.correct;
        showAlert(`صديقك يقول: أعتقد أن الإجابة الصحيحة هي "${q.answers[correctIndex]}"`);
    }
}

function showAlert(message) {
    const alertBox = document.getElementById("message-popup");
    alertBox.textContent = message;
    alertBox.style.display = "block";
    setTimeout(() => {
        alertBox.style.display = "none";
    }, 3000);
}

loadQuestion();
// إضافة زر الانسحاب
const withdrawButton = document.createElement("button");
withdrawButton.textContent = "انسحب";
withdrawButton.style.position = "fixed";
withdrawButton.style.top = "10%";
withdrawButton.style.right = "10%";
withdrawButton.style.padding = "10px 20px";
withdrawButton.style.fontSize = "18px";
withdrawButton.style.backgroundColor = "#DAA520";
withdrawButton.style.color = "black";
withdrawButton.style.border = "none";
withdrawButton.style.borderRadius = "5px";
withdrawButton.style.cursor = "pointer";
withdrawButton.style.zIndex = "9999";
document.body.appendChild(withdrawButton);

// عند الضغط على زر الانسحاب
withdrawButton.addEventListener("click", () => {
    const currentPrize = prizeList[currentPrizeIndex].textContent.trim();
    showWithdrawMessage(currentPrize);
});
// دالة عرض رسالة الانسحاب
function showWithdrawMessage(prize) {
    const messageBox = document.createElement("div");
    messageBox.id = "withdraw-message";
    messageBox.style.position = "fixed";
    messageBox.style.top = "50%";
    messageBox.style.left = "50%";
    messageBox.style.transform = "translate(-50%, -50%)";
    messageBox.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    messageBox.style.padding = "30px";
    messageBox.style.borderRadius = "10px";
    messageBox.style.color = "white";
    messageBox.style.fontSize = "24px";
    messageBox.style.fontWeight = "bold";
    messageBox.style.textAlign = "center";
    messageBox.style.zIndex = "10000";
    messageBox.style.boxShadow = "0 4px 15px rgba(255, 215, 0, 0.7)";

    messageBox.innerHTML = `
        <p>لقد انسحبت من اللعبة!</p>
        <p>المبلغ الذي وصل إليه: <span style="color: gold;">${prize}</span></p>
    `;

    const closeButton = document.createElement("button");
    closeButton.textContent = "إغلاق";
    closeButton.style.marginTop = "15px";
    closeButton.style.padding = "10px 20px";
    closeButton.style.backgroundColor = "#FFD700";
    closeButton.style.color = "black";
    closeButton.style.border = "none";
    closeButton.style.borderRadius = "5px";
    closeButton.style.fontSize = "18px";
    closeButton.style.cursor = "pointer";
    closeButton.addEventListener("click", () => {
        location.reload();  // إعادة تحميل الصفحة أو إنهاء اللعبة
    });

    messageBox.appendChild(closeButton);
    document.body.appendChild(messageBox);
}
