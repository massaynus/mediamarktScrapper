const fetch = require("node-fetch");

const getCategories = async () => {
  const res = await fetch("https://www.mediamarkt.es/api/v1/graphql?operationName=GetConsentCategories&variables=%7B%7D&extensions=%7B%22pwa%22%3A%7B%22salesLine%22%3A%22Media%22%2C%22country%22%3A%22ES%22%2C%22language%22%3A%22es%22%2C%22contentful%22%3Atrue%7D%2C%22persistedQuery%22%3A%7B%22version%22%3A1%2C%22sha256Hash%22%3A%229ed21db321a32e0ba2d6c3f9adfc973d1f0c77afe8202108fc4a9424d4af8e36%22%7D%7D", {
    "headers": {
      "accept": "*/*",
      "apollographql-client-name": "Hey devs",
      "apollographql-client-version": "666~rc",
      "content-type": "application/json",
      "x-cacheable": "true",
      "x-flow-id": "6cb3180d-6dcf-49ad-b2be-7e5f1c82cd33",
      "x-mms-country": "ES",
      "x-mms-language": "es",
      "x-mms-salesline": "Media",
      "x-operation": "GetConsentCategories"
    },
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors"
  });

  if (res.ok) {
    const categories = await res.json();
    return categories.data;
  }
}

getCategories()
  .then((data) => console.log(data))
  .catch(err => console.error(err));