chrome.storage.local.get(["run", "results"], (result) => {
    if (result.run) {
        let eName = document.getElementById("lblname").innerText.toString();
        let eCgpa = parseFloat(document.getElementById("lblCgpaResult").innerText);

        let resultsList = result.results;
        resultsList.push({ name: eName, cgpa: eCgpa });

        chrome.storage.local.set({ results: resultsList });
        chrome.runtime.sendMessage({ message: "readyOpen" }, (response) => {
            if (response.message != "Success") {
                console.log("Something went wrong with readyOpen() in background.js!!!");
            }
        });

        window.close();
    }
});
