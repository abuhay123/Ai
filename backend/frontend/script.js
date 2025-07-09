async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const imageEl = document.getElementById("image");
  imageEl.src = "";

  const response = await fetch("https://your-backend.vercel.app/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  if (data.image) {
    imageEl.src = data.image;
  } else {
    alert("שגיאה ביצירת תמונה");
  }
}
