chrome.tabs.query({active:!0,currentWindow:!0},(function(e){var n,t,o,r=e[0].id;e[0].url.includes("amazon.com/s")&&(chrome.scripting.executeScript({target:{tabId:r},function:function(){var e=0,r=0;document.body.style.background="green",n=document.getElementsByClassName("a-price-whole"),t=document.getElementsByClassName("a-price-fraction");for(var a=0;a<n.length;a++)e+=Number(n[a].innerHTML.split("<")[0]);for(var c=0;c<t.length;c++)r+=Number(t[c].innerHTML);o=(e+r/100)/n.length,console.log("total",o),n&&t&&chrome.storage.local.set({average:o},(function(){}))}}),chrome.tabs.sendMessage(r,{greeting:"hello"},(function(e){console.log("message sent")})))}));