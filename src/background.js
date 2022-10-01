chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
  const activeTabId = tabs[0].id;
  const tabUrl = tabs[0].url;
  let dollars;
  let cents;
  let dollarSum;
  let centsSum;
  let total;
  const isAmazon = tabUrl.includes("amazon.com/s");

  if (isAmazon) {
    chrome.scripting.executeScript({
      target: { tabId: activeTabId },
      function: () => {
        let sum = 0;
        let cSum = 0;
        dollars = document.getElementsByClassName("a-price-whole");
        cents = document.getElementsByClassName("a-price-fraction");
        for (let i = 0; i < dollars.length; i++) {
          sum += Number(dollars[i].innerHTML.split("<")[0]);
        }
        for (let i = 0; i < cents.length; i++) {
          cSum += Number(cents[i].innerHTML);
        }

        dollarSum = sum;
        centsSum = cSum;
        total = (dollarSum + centsSum / 100) / dollars.length;
        console.log("total", total);
        if (dollars && cents) {
          chrome.storage.local.set({ average: total }, function () {});
          chrome.runtime.sendMessage(
            { greeting: "hello" },
            function (response) {
              console.log("message sent");
            }
          );
        }
      }
    });
  }
});
