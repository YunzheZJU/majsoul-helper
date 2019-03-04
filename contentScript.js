/**
 * Created by Yunzhe on 2019/3/3.
 */

'use strict';
const s = document.createElement('script');
s.src = chrome.runtime.getURL('injected.js');
s.onload = function () {
    this.remove();
};
document.body.appendChild(s);

document.addEventListener('Helper:Initialized', () => {
    console.log('Majsoul Helper initialized successfully.');

    const testEvent = new CustomEvent('Helper:Test', {detail: 'success'});
    document.dispatchEvent(testEvent);
});