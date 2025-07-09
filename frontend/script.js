function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const imageEl = document.getElementById("image");
  imageEl.src = "";

  if (!prompt.trim()) {
    alert("אנא הזן תיאור.");
    return;
  }

  console.log("שולח בקשה עם:", prompt);

  fetch("https://ai-alpha-azure.vercel.app/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  })
    .then((res) => {
      if (!res.ok) throw new Error("שגיאה מהשרת: " + res.status);
      return res.json();
    })
    .then((data) => {
      console.log("תשובה:", data);
      if (data.image) {
        imageEl.src = data.image;
      } else {
        alert("לא התקבלה תמונה.");
      }
    })
    .catch((err) => {
      alert("❌ שגיאה בחיבור לשרת:\n" + err.message);
      console.error("שגיאה:", err);
    });
}
