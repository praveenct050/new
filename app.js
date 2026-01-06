document.addEventListener("DOMContentLoaded", () => {
  loadActivities();
  checkNotification();
  document.getElementById("addBtn").addEventListener("click", addActivity);
});

function addActivity() {
  const title = document.getElementById("title").value;
  const time = document.getElementById("time").value;

  if (!title || !time) {
    alert("Please fill all fields");
    return;
  }

  const activities = JSON.parse(localStorage.getItem("activities")) || [];

  activities.push({ title, time });
  localStorage.setItem("activities", JSON.stringify(activities));

  document.getElementById("title").value = "";
  document.getElementById("time").value = "";

  loadActivities();
}

function loadActivities() {
  const list = document.getElementById("activityList");
  list.innerHTML = "";

  const activities = JSON.parse(localStorage.getItem("activities")) || [];

  activities.forEach(act => {
    const li = document.createElement("li");
    li.textContent = `${act.title} at ${act.time}`;
    list.appendChild(li);
  });
}

function checkNotification() {
  const activities = JSON.parse(localStorage.getItem("activities")) || [];
  const now = new Date();
  const currentTime = now.toTimeString().slice(0, 5);

  activities.forEach(act => {
    if (act.time === currentTime) {
      alert("📢 Reminder: " + act.title);
    }
  });
}
