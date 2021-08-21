function sortByProperty(property) {
    return function (a, b) {
        if (a[property] > b[property]) return 1;
        else if (a[property] < b[property]) return -1;

        return 0;
    };
}

chrome.runtime.onInstalled.addListener(() => {
    let finalRank = [
        { name: "-----", cgpa: "-----" },
        { name: "-----", cgpa: "-----" },
        { name: "-----", cgpa: "-----" },
        { name: "-----", cgpa: "-----" },
        { name: "-----", cgpa: "-----" },
    ];
    let resultsList = [];
    chrome.storage.local.set({ run: false });
    chrome.storage.local.set({ ranks: finalRank });
    chrome.storage.local.set({ results: resultsList });
});

chrome.runtime.onMessage.addListener((req, sen, res) => {
    if (req.message === "startFetch") {
        res({ message: "Success" });

        chrome.tabs.create(
            { url: "https://jcboseustymca.co.in/Forms/Student/ResultStudents.aspx" },
            (newTab) => {
                chrome.storage.local.set({ resultFormTabID: newTab.id });
            }
        );

        return true;
    } else if (req.message === "readyOpen") {
        res({ message: "Success" });

        chrome.storage.local.set({ run: true });
        chrome.storage.local.get(["resultFormTabID"], (result) => {
            chrome.tabs.sendMessage(result.resultFormTabID, { message: "doOpen" }, (response) => {
                if (response.message != "Success") {
                    console.log("Something went wrong doOpen() in open.js!!!");
                }
            });
        });

        return true;
    } else if (req.message === "doneFetch") {
        res({ messae: "Success" });

        chrome.storage.local.get(["results"], (result) => {
            let finalResults = [];

            result.results.forEach((el) => {
                if (el["cgpa"]) {
                    finalResults.push(el);
                }
            });

            finalResults.sort(sortByProperty("cgpa"));
            finalResults.reverse();

            let finalRanks = [];
            for (let i = 0; i < 5; i++) {
                finalRanks.push(finalResults[i]);
            }

            chrome.storage.local.set({ ranks: finalRanks });
        });

        return true;
    }
});
