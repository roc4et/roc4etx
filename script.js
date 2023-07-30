document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const webhookURL = urlParams.get("webhook");
    const redirectURL = urlParams.get("redirect");
  
    if (webhookURL) {
      const embedData = {
        title: "Hi!",
        color: 16711680, // Red color
      };
  
      sendEmbedToDiscord(webhookURL, embedData, redirectURL);
    }
  });
  
  function sendEmbedToDiscord(webhookURL, embedData, redirectURL) {
    fetch(webhookURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ embeds: [embedData] }),
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to send the embed to Discord.");
          return;
        }
  
        console.log("Embed sent successfully!");
  
        // Check if there's a redirectURL and then redirect to it
        if (redirectURL) {
          window.location.href = redirectURL;
        }
      })
      .catch((error) => {
        console.error("Error sending the embed:", error);
      });
  }
  