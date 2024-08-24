# MMM-YNAB

**DISCLAIMER: This fork of MMM-YNAB has been modified using AI assistance. As a result, there will be no official module support provided for this specific fork. Use at your own discretion.**

This is an enhanced module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) which displays remaining dollars in categories from YNAB budgets with advanced visualization options for negative balances, including customizable font sizes specifically for negative categories, and flexible layout control.

![Example of MMM-YNAB](./screenshot.png)

## Installation ##

1. Run `git clone https://github.com/mtitus83/MMM-YNAB.git` in the directory `~/MagicMirror/modules`
2. Change directories to the new folder `cd MMM-YNAB` and then run `npm install`

## Using the module

To use this module, get a YNAB access token for your YNAB account from https://api.youneedabudget.com/, then add the following configuration block to the modules array in the `config/config.js` file:

```js
var config = {
    modules: [
        {
            module: "MMM-YNAB",
            position: "top_bar",
            config: {
                token: "ADD_YNAB_TOKEN_HERE",
                categories: [ "Household", "Pets", "Grocery", "Kids Clothes", "Restaurants", "Lunch", "Spontaneous Fun" ],
                // budgetId: "3d894cb9-d783-4bd0-a9a6-f7a3c79becc1", // Optional
                boldNegativeCategory: true,
                redNegativeAmount: true,
                flashNegativeCategory: true,
                fontSize: "small",
                singleLine: true
            }
        },
    ]
}
```

Your own categories will work, but the ones above are default.

By default the first budget found in your account will be used. To specify a specific budget, use the `budgetId` config option. Find your budget Id by navigating to your budget in YNAB and looking at the URL. `https://app.youneedabudget.com/{{BUDGET_ID_AS_UUID}}/budget`

## Configuration Options

- `token`: Your YNAB access token (required)
- `categories`: Array of category names to display (required)
- `budgetId`: Specific budget ID to use (optional)
- `boldNegativeCategory`: Bold the category name for negative balances (default: true)
- `redNegativeAmount`: Display negative amounts in red (default: true)
- `flashNegativeCategory`: Slowly flash negative category names (default: true)
- `fontSize`: Font size specifically for negative categories. Options: "xsmall", "small", "medium", "large", "xlarge" (default: "small")
- `singleLine`: Display all categories on a single line. If false, categories will be displayed with a maximum of 3 per line. (default: true)

Note: The `fontSize` option only affects the font size of negative categories. Positive categories will maintain their default size.

## Customization

You can customize the appearance of the module by modifying the `MMM-YNAB.css` file in the module directory.

## Update Interval

This module updates the YNAB budget information every 90 seconds by default.

## Note on Support

As this is a modified version of the original MMM-YNAB module, please be aware that support may be limited. If you encounter issues or have questions, you may need to refer to the original module documentation or seek community assistance.
