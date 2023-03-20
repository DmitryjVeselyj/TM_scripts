// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @run-at       document-idle
// @match        https://spb.hh.ru/*
// ==/UserScript==


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
};



await(async function () {
    'use strict';

    await sleep(7000);
    //const element = document.querySelector('a.bloko-button.bloko-button_scale-small.bloko-button_stretched');
    const element = document.querySelector('button[data-qa="resume-update-button"]')
    console.log('now: ' + new Date() + "\nelement disabled: " + element.disabled)
    
    while (element.disabled) {
        let value = 1000 * 60 * 30 + getRandomInt(120) * 1000 * 60;
        console.log('waiting for: ' + value / (1000 * 60))
        await sleep(value);
        window.location.reload();
    }
    element.click();

    await sleep(5000);
    window.location.reload()

})();
