# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## View + Modify, 1st assignment
Link to learn: https://learn.inside.dtu.dk/d2l/lms/dropbox/user/folder_submit_files.d2l?db=53025&grpid=0&isprv=0&bp=0&ou=187643
Functionality to implement:

- User can see list of items in basket
- User can see price per item
- User can see total amount
- Let user change quantity of item
- Let user remove item
- Optional: display and toggle gift wrap, per item
- Optional: let user choose recurring order schedule per item
- Excluded: browse products
- Excluded: add to basket

Deliverable:

- URL to code repository
- URL to deployed app
- No report this time


JSON file with product info: https://raw.githubusercontent.com/larsthorup/checkout-data/main/product.json

Sample basket data, see below, but please create your own

const itemList = [
  { product: products["vitamin-c-500-250"], quantity: 2, giftWrap: false },
  { product: products["kids-songbook"], quantity: 1, giftWrap: true },
  { product: products["sugar-cane-1kg"], quantity: 2, giftWrap: false },
];
