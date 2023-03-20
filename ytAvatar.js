// ==UserScript==
// @name Fix youtube avatars
// @namespace http://tampermonkey.net/
// @version 0.1
// @description Fix youtube avatars
// @author You
// @match https://*.youtube.com/*
// @grant none
// ==/UserScript==

(function () {
    'use strict';

    let imgSelector = 'img[src*="yt3.ggpht.com"]';
    let styleSelector = '[style*="yt3"][style*="ggpht"][style*="com"]';

    function getElementsBySelector(item, selector) {
        let elements = [];
        if (item.matches(selector)) {
            elements.push(item);
        }
        elements.push(...item.querySelectorAll(selector));
        return elements;
    }

    function fixIssue(item) {
        for (let image of getElementsBySelector(item, imgSelector)) {
            // https://yt3.ggpht.com/
            image.src = image.src.replace('yt3.ggpht.com', 'yt4.ggpht.com');
        }
        for (let element of getElementsBySelector(item, styleSelector)) {
            // https://yt3.ggpht.com/
            // https\:\/\/yt3\.ggpht\.com\/
            let delimeter = element.style.cssText.split('ggpht')[0].split('yt3').at(-1)
            element.style.cssText = element.style.cssText.replace(`yt3${delimeter}ggpht${delimeter}com`, `yt4${delimeter}ggpht${delimeter}com`)
        }
    }

    document.DOMContentLoaded = fixIssue(document.body);

    let observer = new MutationObserver(mutationRecords => {
        mutationRecords.forEach((record) => fixIssue(record.target));
    });
    observer.observe(document, {
        childList: true,
        subtree: true,
        attributes: true
    });


})();