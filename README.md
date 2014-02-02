# pnacl-quickstart

Quickstart project to allow you to play with [pnacl](https://developers.google.com/native-client/dev/).

## Start

    npm start

## What does it do?

On start a server launches that will serve the main page on [http://localhost:3000](http://localhost:3000).

The nice thing is that on **each refresh, the bundle is updated and the make step run for you automatically**.
Therefore it can serve as a nice quickstart to play with pnacl while getting immediate feedback whenever you made
changes to your code, be it the `JavaScript` or `C++` end.

Sometimes the first refresh doesn't succeed completely - Status will be `'NO-STATUS'`, in that case just refresh
again.

Enjoy!

## Important

Depends on [`pnacl_sdk`](https://developers.google.com/native-client/dev/sdk/download) dir being `../../` relative to
this project. So either arrange for that or adapt `NACL_SDK_ROOT` variable inside the Makefile in order to play with
this.
