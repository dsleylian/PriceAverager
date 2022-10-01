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
        //get prices in $s and cents
        dollars = document.getElementsByClassName("a-price-whole");
        cents = document.getElementsByClassName("a-price-fraction");
        //get number values from the html elements and add them up
        for (let i = 0; i < dollars.length; i++) {
          sum += Number(dollars[i].innerHTML.split("<")[0]);
        }
        for (let i = 0; i < cents.length; i++) {
          cSum += Number(cents[i].innerHTML);
        }
        dollarSum = sum;
        centsSum = cSum;
        //calculate average
        total = (dollarSum + centsSum / 100) / dollars.length;
        if (dollars && cents) {
          //put value in storage
          chrome.storage.local.set({ average: total }, function () {});
          //send message to popup.js
          chrome.runtime.sendMessage(
            { greeting: "hello" },
            function (response) {}
          );
        }
      }
    });
  }
});
