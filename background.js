/**
 * Created by Yunzhe on 2019/3/3.
 */

'use strict';
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
        console.log("The color is green.");
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher({
                pageUrl: {hostEquals: 'majsoul.union-game.com'}
            })
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});