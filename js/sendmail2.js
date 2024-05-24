const appointmentForm = document.getElementById("appointmentForm");

function getCurrentDateTime() {
	const now = new Date();

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

const dateField = document.getElementById("date");
dateField.min = getCurrentDateTime();

function getData(event) {
	// Prevent the default form submission
	event.preventDefault();

	// Get the form element
	const form = event.target;

	// Create a new FormData object
	const formData = new FormData(form);

	// Log the form data
	// for (const [key, value] of formData.entries()) {
	// 	console.log(`${key}: ${value}`);
	// }

	// You can also convert the form data to an object or JSON if needed
	const formDataObject = Object.fromEntries(formData.entries());
	makeBodyMessage(formDataObject);

	// console.log(formDataObject);
}
function convertToLocalDate(dateString) {
	// Split the date string into year, month, and day parts
	const [year, month, day] = dateString.split("-");

	// Create a new Date object with the provided year, month, and day
	const date = new Date(year, month - 1, day); // Note: months are 0-based in Date objects

	// Get the local date string in the format "MM/DD/YYYY"
	const localDateString = date.toLocaleDateString();

	return localDateString;
}

function makeBodyMessage(data) {
	console.log(data);
	const bodyMessage =
		"<strong >Full Name:</strong> " +
		data.name +
		"<br><strong>Email:</strong> " +
		data.email +
		"<br><strong>Phone Number:</strong> " +
		data.phone +
		"<br><strong>Appointment Date:</strong> " +
		convertToLocalDate(data.date);
	console.log(bodyMessage);

	sendEmail("info@kmckenya.co.ke", "Appointment", bodyMessage);
}

async function sendEmail(email, subject, body) {
	try {
		const message = await Email.send({
			SecureToken: "b9749664-6cd7-42e4-ac29-36d4337dc1f2",
			To: "katitomedicalcentre@gmail.com",
			From: email,
			Subject: subject,
			Body: body,
		});

		if (message === "OK") {
			Swal.fire({
				icon: "success",
				title: "Message was sent successfully. ",
				imageUrl: "../image/image.png",
				imageWidth: 400,
				imageHeight: 200,
				imageAlt: "Custom image",
			});
			resetForm(appointmentForm);
			console.log("Message was sent successfully.");
		} else {
			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: "Something went wrong! Message was not sent.",
			});
			// console.log("Message was not sent.");
		}
	} catch (error) {
		Swal.fire({
			icon: "error",
			title: "Oops...",
			text: "An error occurred while sending the email.",
		});
		console.error("Error sending email:", error);
	}
}

function resetForm(form) {
	form.reset();
}

appointmentForm.addEventListener("submit", getData);
