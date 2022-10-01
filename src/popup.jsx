/*global chrome*/
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
const container = document.getElementById("react-target");
const root = createRoot(container);

const Popup = () => {
  const [average, setAverage] = useState(0);
  const [recevied, setReceived] = useState(false);
  const [isAmazon, setIsAmazon] = useState(false);

  //listen for message from background
  chrome.runtime.onMessage.addListener(function (request, sender) {
    if (request.greeting === "hello") {
      setReceived(true);
    }
  });

  //update average from storage, only when message is received
  useEffect(() => {
    chrome.storage.local.get(["average"], function (result) {
      setAverage(result.average);
    });
  }, [recevied]);

  //check that we are on an amazon window
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
      {/* disaply different views based on whether or not we are on amazon */}
      {isAmazon ? (
        <p> Average: {average?.toPrecision(3)}</p>
      ) : (
        <p>This extension only works for Amazon.com searches</p>
      )}
    </div>
  );
};

root.render(<Popup />);
