const fetch = require("node-fetch");

const getProduct = async () => {
  const res = await fetch("https://www.mediamarkt.es/api/v1/graphql?operationName=productRecommendationBoxes&variables=%7B%22boxNames%22%3A%5B%22box01%22%2C%22box03_U2P-Campaign%22%2C%22box02%22%2C%22box04_UserHistory%22%5D%2C%22recommendationContext%22%3A%22home01%22%2C%22params%22%3A%22%22%2C%22manualProducts%22%3A%5B%5B%221498650%22%2C%221476983%22%2C%221497533%22%2C%221479134%22%2C%221487426%22%2C%221483039%22%2C%221487742%22%2C%221436667%22%2C%221485228%22%2C%221492442%22%2C%221487331%22%2C%221472995%22%2C%221485869%22%2C%221481563%22%2C%221463121%22%2C%221483038%22%2C%221487743%22%2C%221501383%22%2C%221479088%22%2C%221492442%22%5D%2C%5B%5D%2C%5B%5D%2C%5B%5D%5D%2C%22sid%22%3A%22325e2853-8d1e-4b79-aa79-434ba15c67a3%22%2C%22tracking%22%3Atrue%7D&extensions=%7B%22pwa%22%3A%7B%22salesLine%22%3A%22Media%22%2C%22country%22%3A%22ES%22%2C%22language%22%3A%22es%22%7D%2C%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%22258bb20614ddfbd26958fa3f1dc341bf2c54226b1ac447e1c1d06ba3361131f4%22%7D%7D", {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "apollographql-client-name": "pwa-client",
      "apollographql-client-version": "6.122.0",
      "content-type": "application/json",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-cacheable": "true",
      "x-flow-id": "680e9f0f-514b-49b7-abb6-d8cf972c6f5d",
      "x-mms-country": "ES",
      "x-mms-language": "es",
      "x-mms-salesline": "Media",
      "x-operation": "productRecommendationBoxes",
      "cookie": "__cfduid=dcb4a78669ae48cac83fb70ccdebd34d21614888408; abhomeab=B; ts_id=8c5ecf5a-044e-4bc2-8f09-59b6e030bb4c; _msbps=98; a=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Im8yc2lnbiJ9.eyJzdWIiOiI2ZWFlOTkzOS0wNjZhLTQ2YzEtOThiNS0xZTUyYTRiZjA4Y2EiLCJpc3MiOiJtbXNlIiwiaWF0IjoxNjE0ODg4NDEzLCJleHAiOjE2MTYwOTgwMTMsImF1ZCI6IndlYm1vYmlsZSIsInQiOiJ1IiwibyI6MTExOX0.O86Tv7mNWeoe0PwtxxpqAEYTCmy_oTgXy00rVFxanvu9WM_Mt5RP4taidjo5gN7VkZ4PpQBylAC2HnE7aCUcmZ6GgptRz1d9lwpWF7IXFzjrABAU7NlHilM4pQUX8zRAGRyfwxKybmHsIfnoliUuDR9Z0wdI5ZRJ0oYW_RgWeMd3QNfqdBXaKBrZ4r5SM-dlZx25hY8q6WxkAEScvqf-SUhQ9yXDGQX9lSVbI57Y1fz92vlc0_sQEo7JqxwwunF51VWc3FCj06bBmfzL3iQ8APTWneToejXjdTWyKnGMa_JONVjA15iPWdB8KYJrg56Dvu0hAZOjv56KkCvhlIQWHA; r=8cqG8I86b8LSMTQf7/CMwnLD7+UfrfFv92T4O+8FUVRbAolWjDQcx/yih7ycCc8B; s_id=325e2853-8d1e-4b79-aa79-434ba15c67a3; MC_PS_SESSION_ID=325e2853-8d1e-4b79-aa79-434ba15c67a3; p_id=325e2853-8d1e-4b79-aa79-434ba15c67a3; MC_PS_USER_ID=325e2853-8d1e-4b79-aa79-434ba15c67a3; MC_GDPR_COOKIE=|m=1|c=1|a=1|f=1|; _ga=GA1.2.8c5ecf5a-044e-4bc2-8f09-59b6e030bb4c; _gid=GA1.2.361922769.1614888452"
    },
    "referrer": "https://www.mediamarkt.es/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });

  if (res.ok) {
    const products = await res.json();
    return products.data;
  }
}

getProduct()
  .then((data) => console.log(data))
  .catch(err => console.error(err));

