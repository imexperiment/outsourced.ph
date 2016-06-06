# Outsourced.ph Exam

## Prerequisites

* Nodejs
    * Bower
    * Gulp

### Installing node

```text
$ curl -sL https://deb.nodesource.com/setup_0.12 | sudo bash -
$ [sudo] apt-get install -y nodejs
```

## Installation

### Installing dependencies

We need to install the node modules dependencies. To install node modules, issue this command:

```text
$ [sudo] npm install
```

Bower components will be installed automagically when you execut the `npm install` command.

## Development/Running

The project was integrated with LiveReload which means it will automagically
reload the page whenever you press `save`.

> Run `gulp watch` to compile any changes in `app` folder.

```text
$ gulp watch

# if you can't have gulp installed globally, use this command:

$ npm run watch
```
## Author

* [ianmuninio](https://github.com/ianmuninio) - **Ian Mark Muninio** &lt;ianmuninio@gmail.com&gt;

## License

The MIT License (MIT)

Copyright (c) 2016 IM Experiment

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
