class Student {

    #grade1;
    #grade2;
    #grade3;
    #attendance;

    constructor(name, grade1, grade2, grade3, attendance) {

        this.name = name;

        this.grade1 = grade1;
        this.grade2 = grade2;
        this.grade3 = grade3;
        this.attendance = attendance;
    }

    set grade1(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("درجة المادة الأولى يجب أن تكون من 0 إلى 100");
        }
        this.#grade1 = Number(value);
    }

    set grade2(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("درجة المادة الثانية يجب أن تكون من 0 إلى 100");
        }
        this.#grade2 = Number(value);
    }

    set grade3(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("درجة المادة الثالثة يجب أن تكون من 0 إلى 100");
        }
        this.#grade3 = Number(value);
    }

    set attendance(value) {
        if (value === "" || value < 0 || value > 100) {
            throw new Error("نسبة الحضور يجب أن تكون من 0 إلى 100");
        }
        this.#attendance = Number(value);
    }

    get average() {
        return (this.#grade1 + this.#grade2 + this.#grade3) / 3;
    }

}
// قائمة حفظ الطلاب
let studentsList = [];

// الإمساك بعناصر الشاشة
const studentName = document.getElementById("studentName");

const grade1 = document.getElementById("grade1");
const grade2 = document.getElementById("grade2");
const grade3 = document.getElementById("grade3");

const attendance = document.getElementById("attendance");

const addStudent = document.getElementById("addStudent");
const mercyBtn = document.getElementById("mercyBtn");

const errorBox = document.getElementById("errorBox");

const studentsDisplay = document.getElementById("studentsDisplay");

const reportDisplay = document.getElementById("reportDisplay");
// إضافة طالب جديد
addStudent.addEventListener("click", function () {
    try {
        errorBox.textContent = "";

        const name = studentName.value.trim();
      if (
    grade1.value === "" ||
    grade2.value === "" ||
    grade3.value === "" ||
    attendance.value === ""
) {
    throw new Error("من فضلك املي جميع الخانات");
      }

        if (name === "") {
            throw new Error("من فضلك اكتبي اسم الطالب");
        }

        const student = new Student(
            name,
            grade1.value,
            grade2.value,
            grade3.value,
            attendance.value
        );

        studentsList.push(student);

        const studentRow = document.createElement("p");
        studentRow.textContent =
            `${student.name} - المتوسط: ${student.average.toFixed(2)}`;

        studentsDisplay.appendChild(studentRow);

        studentName.value = "";
        grade1.value = "";
        grade2.value = "";
        grade3.value = "";
        attendance.value = "";

    } catch (error) {
        errorBox.textContent = error.message;
    }
});// تفعيل لجنة الرأفة
mercyBtn.addEventListener("click", function () {

    const strugglingStudents = studentsList.filter(student =>
        student.average >= 40 && student.average <= 49
    );

    const updatedStudents = strugglingStudents.map(student => ({
        name: student.name,
        newAverage: student.average + 5
    }));

    const total = updatedStudents.reduce(
        (sum, student) => sum + student.newAverage, 0
    );

    const generalAverage = updatedStudents.length > 0
        ? total / updatedStudents.length
        : 0;

    if (updatedStudents.length === 0) {
        reportDisplay.innerHTML =
            "لا يوجد طلاب متعثرون يستحقون الرأفة.";
        return;
    }

    const studentsReport = updatedStudents.map(student =>
        `<li>${student.name} - المتوسط بعد الرأفة: ${student.newAverage.toFixed(2)}</li>`
    ).join("");

    reportDisplay.innerHTML = `
        <p>عدد الطلاب المستحقين للرأفة: ${updatedStudents.length}</p>
        <ul>${studentsReport}</ul>
        <p>المتوسط العام بعد الرأفة: ${generalAverage.toFixed(2)}</p>
    `;
});