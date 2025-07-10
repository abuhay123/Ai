async function generateImage() {
  const prompt = document.getElementById("prompt").value;
  const image = document.getElementById("image");
  const loading = document.getElementById("loading");

  if (!prompt) return alert("נא להזין תיאור!");

  image.src = "";
  loading.style.display = "block";

  try {
    const response = await fetch("https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: prompt })
    });

    if (!response.ok) throw new Error("שגיאה ביצירת תמונה");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    image.src = url;
  } catch (err) {
    alert("אירעה שגיאה: " + err.message);
  } finally {
    loading.style.display = "none";
  }
}
