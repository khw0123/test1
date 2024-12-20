let randomQuestions = []; // 전역 변수로 선언

function getRandomQuestions() {
  const selectedQuestions = [];

  const traits = Object.keys(questions)
    .sort(() => Math.random() - 0.5)
    .slice(0, 2); // 랜덤으로 2개 속성 선택
  traits.forEach((trait) => {
    const traitQuestions = questions[trait];
    const randomTraitQuestions = traitQuestions
      .sort(() => Math.random() - 0.5)
      .slice(0, 2); // 랜덤으로 2문항 선택
    selectedQuestions.push(...randomTraitQuestions);
  });

  return selectedQuestions;
}

function displayQuestions() {
  const container = document.getElementById("question-container");
  randomQuestions = getRandomQuestions(); // 전역 변수에 저장

  randomQuestions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.innerHTML = `<label>${question} 
      <input type="radio" name="question${index}" value="1">1 
      <input type="radio" name="question${index}" value="2">2 
      <input type="radio" name="question${index}" value="3">3
    </label>`;
    container.appendChild(questionDiv);
  });
}

function calculateTraits(answers) {
  const traitValues = { pride: 0, cruelty: 0, empathy: 0, leadership: 0 };

  answers.forEach((answer, index) => {
    const traitKey = Object.keys(questions).find((trait) =>
      questions[trait].some((question) => question === randomQuestions[index])
    );
    if (traitKey) {
      traitValues[traitKey] += parseInt(answer);
    }
  });

  return traitValues;
}
