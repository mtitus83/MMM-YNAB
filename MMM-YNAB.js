Module.register("MMM-YNAB", {
    result: [],
    defaults: {
        token: "",
        categories: [ "Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun" ],
        boldNegativeCategory: true,
        increaseFontSize: true,
        redNegativeAmount: true,
        flashNegativeCategory: true,
        fontSize: "small", // New option for font size
        singleLine: true   // New option to keep categories on a single line
    },

    start: function () {
        this.sendSocketNotification('YNAB_SET_CONFIG', this.config);
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.className = this.config.fontSize + " ynab-wrapper";
        
        if (this.config.singleLine) {
            wrapper.classList.add("single-line");
        }
        
        if (!this.result.items || this.result.items.length === 0) {
            wrapper.innerHTML = "Loading YNAB";
            return wrapper;
        }

        for (let item of this.result.items) {
            let categoryWrapper = document.createElement("span");
            categoryWrapper.className = "ynab-category";

            let nameSpan = document.createElement("span");
            nameSpan.className = "ynab-name";
            nameSpan.textContent = item.name;

            let balanceSpan = document.createElement("span");
            balanceSpan.className = "ynab-balance";
            balanceSpan.textContent = "$" + (item.balance/1000).toFixed(2);

            if (item.balance < 0) {
                if (this.config.boldNegativeCategory) {
                    nameSpan.classList.add("negative-category");
                }
                if (this.config.increaseFontSize) {
                    nameSpan.classList.add("increased-font");
                    balanceSpan.classList.add("increased-font");
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
            wrapper.appendChild(categoryWrapper);
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
