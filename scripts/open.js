chrome.runtime.sendMessage({ message: "readyOpen" }, (response) => {
    if (response.message === "Success") {
        chrome.runtime.onMessage.addListener((req, sen, res) => {
            if (req.message === "doOpen") {
                res({ message: "Success" });

                chrome.storage.local.get(["rollCounter", "lRoll"], (result) => {
                    let counter = result.rollCounter;

                    if (result.rollCounter <= result.lRoll) {
                        document.querySelector("#txtRollNo").value = counter;
                        document.querySelector("#ddlSem").value = "06";
                        document.querySelector("#btnResult").click();

                        ++counter;
                        chrome.storage.local.set({ rollCounter: counter });
                    } else {
                        chrome.runtime.sendMessage({ message: "doneFetch" }, (response) => {
                            if (response.message != "Success") {
                                console.log(
                                    "Something went wrong with doneOpen() in background.js!!!"
                                );
                            }
                        });
                    }
                });

                return true;
            }
        });
    }
});
