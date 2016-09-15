# DraftJS: Import Element to ContentState

This is a module for [DraftJS](https://github.com/facebook/draft-js) that will convert an HTML DOM Element to editor content.

It was extracted from [React-RTE](https://react-rte.org) and placed into a separate module for more general use. Hopefully it can be helpful in your projects.

## Installation

    npm install --save draft-js-import-element

This project is still under development. If you want to help out, please open an issue to discuss or join us on [Slack](https://draftjs.slack.com/).

## Usage

`stateFromElement` takes a DOM node `element` and returns a DraftJS [ContentState](https://facebook.github.io/draft-js/docs/api-reference-content-state.html).

```javascript
import {stateFromElement} from 'draft-js-import-element';
const contentState = stateFromElement(element);
```

### Options

You can optionally pass a second `Object` argument to `stateFromElement` with the following supported properties:

- `elementStyles`: HTML element name as key, DraftJS style string as value. Example:

        stateFromElement(element, {
          elementStyles: {
            // Support `<sup>` (superscript) tag as style:
            'sup': 'SUPERSCRIPT'
          }
        });

## License

This software is [BSD Licensed](/LICENSE).
