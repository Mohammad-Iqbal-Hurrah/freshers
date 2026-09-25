const video = document.getElementById("inviteVideo");
const playBtn = document.getElementById("playInvite");

playBtn?.addEventListener("click", () => {
  if (!video) return;
  if (video.paused) {
    video.play();
    playBtn.textContent = "❚❚ Pause Invitation";
  } else {
    video.pause();
    playBtn.textContent = "▶ Play Invitation";
  }
});

video?.addEventListener("play", () => playBtn && (playBtn.textContent = "❚❚ Pause Invitation"));
video?.addEventListener("pause", () => playBtn && (playBtn.textContent = "▶ Play Invitation"));
video?.addEventListener("ended", () => playBtn && (playBtn.textContent = "↻ Replay Invitation"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("calendarBtn")?.addEventListener("click", () => {
  const event = {
    title: "Freshers' Party 2026 — Data Science & AIML",
    start: "20260928T100000",
    end: "20260928T140000",
    location: "Main Campus, Cluster University",
    description: "Freshers' Party hosted by Students of Data Science and AIML Batch 2025. Dress Code: Indian Traditional."
  };

  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Freshers Party 2026//EN",
    "BEGIN:VEVENT",
    `DTSTART:${event.start}`,
    `DTEND:${event.end}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.location}`,
    `DESCRIPTION:${event.description}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], {type:"text/calendar;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "Freshers-Party-2026.ics";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});
