async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const imageEl = document.getElementById("image");
  imageEl.src = "";

  if (!prompt.trim()) {
    alert("אנא הזן תיאור לתמונה.");
    return;
  }

  console.log("יוצר תמונה עבור:", prompt);

  try {
    const response = await fetch("https://ai-alpha-azure.vercel.app/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    if (data.image) {
      imageEl.src = data.image;
    } else {
      alert("❌ לא התקבלה תמונה. נסה שוב.");
      console.error("שגיאה מהשרת:", data);
    }
  } catch (error) {
    alert("🚫 שגיאה בעת שליחת הבקשה לשרת.");
    console.error("שגיאה:", error);
  }
}
console.log("📡 שולח בקשה לשרת עם prompt:", prompt);

const response = await fetch("https://ai-alpha-azure.vercel.app/generate", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ prompt })
});

console.log("📨 התקבלה תשובה מהשרת:", response);
