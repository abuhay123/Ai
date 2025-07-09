function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const imageEl = document.getElementById("image");
  imageEl.src = "";

  if (!prompt.trim()) {
    alert("אנא הזן תיאור לתמונה.");
    return;
  }

  console.log("🎯 נשלחת בקשה עם טקסט:", prompt);

  fetch("https://ai-alpha-azure.vercel.app/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
    .then(res => res.json())
    .then(data => {
      console.log("📸 קיבלנו נתונים:", data);
      if (data.image) {
        imageEl.src = data.image;
      } else {
        alert("❌ לא התקבלה תמונה");
      }
    })
    .catch(error => {
      alert("🚫 שגיאה בחיבור לשרת");
      console.error("שגיאה:", error);
    });
}
