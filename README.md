# Webpack Config

Config is fully transparent. You don't need to touch it, unless you want
to implement some new plugins or change module format.

It is currently set to UMD pattern, but if you'd like to change format,
that is something you can definitely do. For the purpose of module building
it is as minimal as possible. Also, it resolves the module name automatically.


## Getting started

- `git clone https://github.com/dvlden/webpack-lib-config.git`
- `npm i`


### Commands

- `npm run dev` - build for development and watch for changes
- `npm run build` - clean output directory and build for production


## Important Notes

If you cloned my repository and want to use this for modules development, before you push any changes to Git or Npm, make sure to update some important files.

- package.json
- readme
- license

Your library name will be the name of the package from `package.json`. The package name will automatically be converted to the `camelCase` from `kebab-case`.
