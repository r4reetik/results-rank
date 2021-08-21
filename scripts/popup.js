window.addEventListener("load", () => {
    document.getElementById("fRoll").addEventListener("input", () => {
        document.getElementById("fRoll").value = document
            .getElementById("fRoll")
            .value.replace(/\D/g, "");
        document.getElementById("fRoll").value = document
            .getElementById("fRoll")
            .value.slice(0, 11);
        if (document.getElementById("fRoll").value.length === 11) {
            document.getElementById("lRoll").focus();
        }
    });

    document.getElementById("lRoll").addEventListener("input", () => {
        document.getElementById("lRoll").value = document
            .getElementById("lRoll")
            .value.replace(/\D/g, "");
        document.getElementById("lRoll").value = document
            .getElementById("lRoll")
            .value.slice(0, 11);
        if (document.getElementById("lRoll").value.length === 11) {
            document.getElementById("btnFetch").focus();
        }
    });

    document.getElementById("btnFetch").addEventListener("click", () => {
        let fRoll = parseInt(document.getElementById("fRoll").value);
        let lRoll = parseInt(document.getElementById("lRoll").value);

        if (
            fRoll.toString().length === 11 &&
            lRoll.toString().length === 11 &&
            lRoll - fRoll >= 5
        ) {
            chrome.storage.local.set({ fRoll: fRoll });
            chrome.storage.local.set({ rollCounter: fRoll });
            chrome.storage.local.set({ lRoll: lRoll });

            chrome.runtime.sendMessage({ message: "startFetch" }, (response) => {
                if (response.message === "Success") {
                    self.close();
                } else {
                    console.log("Something went wrong while start fetching!!!");
                }
            });
        }
    });

    chrome.storage.local.get(["ranks"], (result) => {
        for (let i = 0; i < 5; i++) {
            document.getElementById("name" + (i + 1).toString()).innerText = result.ranks[i].name;
            document.getElementById("cgpa" + (i + 1).toString()).innerText = result.ranks[i].cgpa;
        }
    });
});
