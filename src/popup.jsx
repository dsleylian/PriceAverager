/*global chrome*/
import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
const container = document.getElementById("react-target");
const root = createRoot(container);

const Popup = () => {
  const [average, setAverage] = useState(0);
  const [recevied, setReceived] = useState(false);

  chrome.runtime.onMessage.addListener(function (request, sender) {
    console.log(
      sender.tab
        ? "from a content script:" + sender.tab.url
        : "from the extension"
    );
    if (request.greeting === "hello") {
      setReceived(true);
    }
  });

  useEffect(() => {
    chrome.storage.local.get(["average"], function (result) {
      setAverage(result.average);
    });
  }, []);

  return (
    <div>
      <p> Average: {average.toPrecision(3)}</p>
    </div>
  );
};

root.render(<Popup />);
