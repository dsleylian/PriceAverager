/*global chrome*/
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
const container = document.getElementById("react-target");
const root = createRoot(container);

const Popup = () => {
  const [average, setAverage] = useState(0);
  const [recevied, setReceived] = useState(false);
  const [isAmazon, setIsAmazon] = useState(false);

  console.log(recevied, average, isAmazon);
  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.greeting === "hello") {
      console.log(request.greeting);
      setReceived(true);
    }
  });

  useEffect(() => {
    chrome.storage.local.get(["average"], function (result) {
      setAverage(result.average);
    });
  }, [recevied]);

  useEffect(() => {
    chrome?.tabs?.query({ active: true, currentWindow: true }, (tabs) => {
      const tabUrl = tabs[0].url;
      const isAmazon = tabUrl.includes("amazon.com/s");
      setIsAmazon(isAmazon);
    });
    if (!isAmazon) {
      setAverage(0);
    }
  }, [isAmazon]);

  return (
    <div>
      {isAmazon ? (
        <p> Average: {average?.toPrecision(3)}</p>
      ) : (
        <p>This extension only works for Amazon.com searches</p>
      )}
    </div>
  );
};

root.render(<Popup />);
