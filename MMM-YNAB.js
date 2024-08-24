Module.register("MMM-YNAB", {
    result: [],
    defaults: {
        token: "",
        categories: [ "Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun" ],
        boldNegativeCategory: true,
        redNegativeAmount: true,
        flashNegativeCategory: true,
        fontSize: "small",
        singleLine: true
    },

    start: function () {
        this.sendSocketNotification('YNAB_SET_CONFIG', this.config);
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = "ynab-wrapper";
        
        if (this.config.singleLine) {
            wrapper.classList.add("single-line");
        } else {
            wrapper.classList.add("multi-line");
        }
        
        if (!this.result.items || this.result.items.length === 0) {
            wrapper.innerHTML = "Loading YNAB";
            return wrapper;
        }

        let rowWrapper = document.createElement("div");
        rowWrapper.className = "ynab-row";
        let itemCount = 0;

        for (let item of this.result.items) {
            if (!this.config.singleLine && itemCount % 3 === 0 && itemCount !== 0) {
                wrapper.appendChild(rowWrapper);
                rowWrapper = document.createElement("div");
                rowWrapper.className = "ynab-row";
            }

            let categoryWrapper = document.createElement("span");
            categoryWrapper.className = "ynab-category";

            let nameSpan = document.createElement("span");
            nameSpan.className = "ynab-name";
            nameSpan.textContent = item.name;

            let balanceSpan = document.createElement("span");
            balanceSpan.className = "ynab-balance";
            balanceSpan.textContent = "$" + (item.balance/1000).toFixed(2);

            if (item.balance < 0) {
                nameSpan.classList.add("negative-category", this.config.fontSize);
                
                if (this.config.boldNegativeCategory) {
                    nameSpan.classList.add("bold-negative");
                }
                if (this.config.redNegativeAmount) {
                    balanceSpan.classList.add("negative-amount");
                }
                if (this.config.flashNegativeCategory) {
                    nameSpan.classList.add("flashing");
                }
            }

            categoryWrapper.appendChild(nameSpan);
            categoryWrapper.appendChild(balanceSpan);
            rowWrapper.appendChild(categoryWrapper);
            itemCount++;
        }

        if (rowWrapper.childNodes.length > 0) {
            wrapper.appendChild(rowWrapper);
        }

        return wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        console.log("notification: " + notification);
        console.log("payload: " + JSON.stringify(payload));
        if (notification == "YNAB_UPDATE") {
            this.result = payload;
            this.updateDom(0);
        }
    },

    getStyles: function() {
        return [
            this.file('MMM-YNAB.css')
        ]
    }
});
