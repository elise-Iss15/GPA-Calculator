#!/usr/bin/env node
const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

const nameInput = document.getElementById("assignmentName");
const gradeInput = document.getElementById("assignmentGrade");
const button = document.getElementById("Button");
const list = document.getElementById("assignmentList");
const gpaDisplay = document.getElementById("gpa");

function updateGpa() {
  if (assignments.length === 0) {
    gpaDisplay.textContent = "0.00";
    return;
  }
  const total = assignments.reduce((sum, item) => sum + item.grade, 0);
  const GPA = total / assignments.length;
  gpaDisplay.textContent = GPA.toFixed(2);
}

function addToList() {
  list.innerHTML = "";
  assignments.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - Grade: ${item.grade}`;
    list.appendChild(li);
  });
}

function saveToStorage() {
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

button.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const grade = parseFloat(gradeInput.value);

  if (!name || isNaN(grade) || grade < 0 || grade > 5) {
    alert("Please enter a valid name and grade (0 to 5).");
    return;
  }

  const assignment = { name, grade };
  assignments.push(assignment);
  saveToStorage();
  addToList();
  updateGpa();

  nameInput.value = "";
  gradeInput.value = "";
  nameInput.focus();
});

document.addEventListener("keydown", (e) => {
  if (e.key.toLowerCase() === "s") {
    console.log("All Assignments:", assignments);
  }
});

addToList();
updateGpa();

