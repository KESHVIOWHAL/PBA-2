function showSection(id) {
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('visible'));
    document.getElementById(id).classList.add('visible');
}

// Live Clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    document.getElementById("clock").textContent = `🕒 Current Time: ${time}`;
}
setInterval(updateClock, 1000);
updateClock();
// New Patient Registration
function registerPatient() {
    const name = document.getElementById('patientName').value;
    const age = parseInt(document.getElementById('patientAge').value);
    const gender = document.getElementById('patientGender').value;
    const contact = document.getElementById('patientContact').value;

    if (!name || !age || !gender || !contact) {
        document.getElementById('registrationResult').textContent = "⚠️ Please fill all fields.";
        return;
    }

    const patient = { name, age, gender, contact };
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    patients.push(patient);
    localStorage.setItem("patients", JSON.stringify(patients));

    document.getElementById('registrationResult').textContent =
        `✅ Patient ${name} registered successfully.`;
}

// Login
function login() {
    const role = document.getElementById('role').value;
    const email = document.getElementById('email').value;
    document.getElementById('loginStatus').textContent = `Logged in as ${role} (${email})`;
}

// Appointment
function bookAppointment() {
    const name = document.getElementById('patientName').value;
    const date = document.getElementById('appointmentDate').value;
    const doctor = document.getElementById('doctor').value;

    const appointment = { name, date, doctor };
    const appointments = JSON.parse(localStorage.getItem("appointments") || "[]");
    appointments.push(appointment);
    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById('bookingResult').textContent =
        `Appointment booked for ${name} with ${doctor} on ${date}.`;
}

// Policy Recommendation
function recommendPolicy() {
    const income = parseInt(document.getElementById('income').value);
    const age = parseInt(document.getElementById('age').value);
    const family = parseInt(document.getElementById('familySize').value);
    const history = document.getElementById('medicalHistory').value.toLowerCase();
    const employment = document.getElementById('employment').value;

    let result = "<strong>Recommended Policy:</strong><br>";

    if (income < 200000) {
        result += "✅ <b>Ayushman Bharat Yojana</b> (Govt Scheme)<br>";
        result += "✔️ Low premium or free<br>";
    } else {
        result += "✅ <b>Star Health Silver Plan</b> or <b>Max Bupa</b><br>";
        result += `✔️ Estimated premium: ₹${Math.floor(income * 0.02)} per year<br>`;
    }

    if (family >= 2) {
        result += "👨‍👩‍👧 Recommended: <b>Family Floater Policy</b><br>";
    } else {
        result += "👤 Recommended: <b>Individual Policy</b><br>";
    }

    if (history.includes("diabetes")) {
        result += "⚠️ Include <b>Diabetes rider</b><br>";
    }
    if (employment === "student") {
        result += "🎓 Consider: <b>Student Health Plan (discounted)</b><br>";
    }

    result += `<br><i>Note: Always cross-check with insurers before finalizing.</i>`;
    document.getElementById("policyResult").innerHTML = result;
}


// Chatbot
function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
}

function chat() {
    const input = document.getElementById('chatInput');
    const message = input.value;
    if (message.trim() !== "") {
        const reply = `<p><strong>You:</strong> ${message}</p><p><strong>Bot:</strong> I'm still learning! Try checking the sections above.</p>`;
        document.getElementById('chatWindow').innerHTML += reply;
        input.value = "";
    }
}