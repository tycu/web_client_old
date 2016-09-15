# DraftJS: Export ContentState to HTML

This is a module for [DraftJS](https://github.com/facebook/draft-js) that will export your editor content to semantic HTML.

It was extracted from [React-RTE](https://react-rte.org) and placed into a separate module for more general use. Hopefully it can be helpful in your projects.

## Installation

    npm install --save draft-js-export-html

## How to Use

    import {stateToHTML} from 'draft-js-export-html';
    let html = stateToHTML(contentState);

This project is still under development. If you want to help out, please open an issue to discuss or join us on [Slack](https://draftjs.slack.com/).

## License

This software is [BSD Licensed](/LICENSE).
