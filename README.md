# React-Ribbon

React-Ribbon is a set of [React](http://facebook.github.io/react/) components that implement partial specification of [Microsoft's Windows Ribbon Framework](https://msdn.microsoft.com/zh-tw/library/windows/desktop/dd316910).

Here is the [Demo](http://yiskang.github.io/react-ribbon/).

## Dependencies

- react: ^15.2.1
- react-dom: ^115.2.1
- classnames: ^22.2.5

## Installation

1. Install package via npm

   - Install

		```bash
		npm install --save https://github.com/yiskang/react-ribbon.git
		```

   - Import module in your code

		```javascript
		import RibbonUI from 'react-ribbon';

		OR

		var RibbonUI = requrie( 'react-ribbon' );
		```

2. Install package via bower

  - Install

		```bash
		bower install --save https://github.com/yiskang/react-ribbon.git
		```

  - Add module in your code

		```html
		<script type="text/javascript" src="{module_dir}/dist/bundle.js" />
		<link rel="stylesheet" type="text/css" href="{module_dir}/dist/bundle.css" />
		```

## Development

1.  Install global node tools

  ```bash
  npm install -g gulp-cli
  ```

2.  Clone repository

  ```bash
  git clone https://github.com/yiskang/react-ribbon.git
  ```

3.  Install dependencies of node package.

  ```bash
  npm install
  ```

4.  Install dependencies of bower package.

  ```bash
  bower install
  ```

5.  Run dev server

  ```bash
  gulp
  ```

## License

See the [LICENSE](LICENSE) file for license rights and limitations (MIT).
