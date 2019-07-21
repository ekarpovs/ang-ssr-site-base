<!-- prettier-ignore-start -->
[![CircleCI](https://circleci.com/gh/ekarpovs/ang-ssr-site-base.svg?style=shield&circle-token=899e0a07095896530e345a60808eff6ba4579db3)](https://circleci.com/gh/ekarpovs/ang-ssr-site-base)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![Angular Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://angular.io/styleguide)
<!-- prettier-ignore-end -->

**`ang-ssr-site-base`** is a client project for a site, based on: <https://github.com/ng-seed/universal>  

Application organization, providing the following features:

- [x] Providing a ang-ssr-site-base project using the [Angular] framework.
- [x] Includes [ngrx-powered] **CRUD feature** tutorial.
- [x] Compiling bundles for both browser (*SPA*) and server ([Angular Universal]) platforms.
- [x] Rebased on [Angular CLI] to focus on features and development productivity, not on build tools.
- [x] Customizable webpack configuration via [@angular-builders].
- [x] Using the modern **UI components** of [Angular Material].
- [x] Dynamic **responsive** layouts via [flex-layout].
- [x] Built-in **Hot Module Replacement** to save valuable development time.
- [x] Development, staging and production modes.
- [x] Performing [AoT compilation] for rapid page loads on staging/production builds.
- [x] Tree-shaking and minifying the production builds using [Angular Devkit].
- [x] Cross-browser **[SCSS]** with [autoprefixer] and [browserslist].
- [x] **[stylelint-config-standard]** as configuration preset for [stylelint] and **custom rules** to standardize stylesheets.
- [x] Transferring server responses on client bootstrap to prevent app flickering with native [TransferState]`.
- [x] Deferring initialization of modules via [Lazy loading].
- [x] Uses [ngrx/store] for **state management**.
- [x] Uses [ngrx/entity] state adapter to **manipulate** and **query** entity collections.
- [x] Uses [ngrx/effects]  side effect model to  to model **event sources** as **actions**.
- [x] Uses [unionize] for **boilerplate-free** functional sum types.
- [x] Uses **[ngx-config]** for configuration management.
- [x] Uses **[ngx-cache]** for application-wide caching.
- [x] Uses [ngx-translate] for i18n support.
- [x] Uses **[ngx-meta]** for SEO (*title, meta tags, and Open Graph tags for social sharing*).
- [x] Uses [ngx-perfect-scrollbar] for scrollbars.
- [x] Vendor-agnostic analytics via [angulartics2].
- [x] Unit tests with **[Jest]**, including code coverage.
- [x] End-to-end (integration) tests with **[Nightmare]**.
- [x] Seamless integration with [CircleCI] continuous integration and delivery platform.
- [x] **[angular-tslint-rules]** as configuration preset for [TSLint] and [codelyzer].

> Built with `Angular v7.x.x`, bundled with `Angular CLI`.

You can find the **project documentation** [here](https://github.com/ekarpovs/ang-ssr-site-base).

## Table of contents

- [Table of contents](#Table-of-contents)
- [Prerequisites](#Prerequisites)
- [Getting started](#Getting-started)
  - [Installation](#Installation)
  - [Setting up upstream repository](#Setting-up-upstream-repository)
  - [Development and builds](#Development-and-builds)
    - [Install dependencies](#Install-dependencies)
    - [Development servers](#Development-servers)
    - [Build](#Build)
    - [Running tests](#Running-tests)
  - [CLI Scaffolding](#CLI-Scaffolding)
    - [Example](#Example)
      - [Initial store setup](#Initial-store-setup)
      - [Feature store module setup](#Feature-store-module-setup)
      - [Container & child components setup](#Container--child-components-setup)
- [Directory structure](#Directory-structure)
- [License](#License)

## Prerequisites

Packages in this project depend on `@angular v7.x.x`. Older versions contain outdated dependencies, might produce errors.

Also, please ensure that you are using **`Typescript v3.1.x`** or higher.

## Getting started

### Installation

You can install **`ang-ssr-site-base`** by simply forking the repo:

```bash
# clone the repo
$ git clone https://github.com/ekarpovs/ang-ssr-site-base.git
$ cd ang-ssr-site-base
```

### Setting up upstream repository

Once you have cloned the repo, you can follow these steps to allow sync changes made in this repo with your fork:

```bash
# set up `origin`
$ git remote set-url origin [your-fork-repo]

# set up `upstream` to sync future changes
$ git remote add upstream https://github.com/ekarpovs/ang-ssr-site-base.git

# verify the upstream repo specified for your fork
$ git remote -v
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (fetch)
origin    https://github.com/YOUR_USERNAME/[your-fork-repo].git (push)
upstream  https://github.com/ekarpovs/ang-ssr-site-base.git (fetch)
upstream  https://github.com/ekarpovs/ang-ssr-site-base.git (push)

# initial push for the fork
$ git push
```

Now, you can create a new directory (*ex: `src/app/shared`*) to build your codebase out, while benefiting from the
client framework located at the `src/app/framework` directory.

In order to merge the latest upstream changes, simply follow:

```bash
# fetch the latest upstream
$ git fetch upstream

# merge the upstream changes
$ git merge upstream/master
```

then handle any conflicts, and go on with building your app.

### Development and builds

Below are the scripts to dev, build, and test this project:

#### Install dependencies

```bash
# use `yarn` to install the dependencies
$ yarn
```

#### Development servers

```bash
# dev server
$ ng serve

# dev server (HMR-enabled)
$ yarn start:hmr

# dev server (AoT compilation)
$ yarn start:prod

# dev server (SSR)
$ yarn start:ssr

# dev server (SSR & AoT compilation)
$ yarn start:ssr:prod
```

#### Build

```bash
# development build
$ ng build

# production build
$ ng build --prod

# development build (SSR)
$ yarn build:ssr

# production build (SSR)
$ yarn build:ssr:prod
```

The build artifacts will be stored in the `dist/` directory.

#### Running tests

```bash
# run unit tests
$ yarn test

# run e2e tests
$ yarn e2e
```

### CLI Scaffolding

The project currently performs **CLI scaffolding** using the official `@schematics/angular` collection and `@ngrx/schematics`
collection.

`@schematics/angular` blueprints :

-* class
-* component
-* directive
-* enum
-* guard
-* interface
-* module
-* pipe
-* service

#### Example

```bash
# add module `domain`
$ ng g module domain
# create src/app/domain/domain.module.ts (183 bytes)
```

`@ngrx/schematics` blueprints :

-* action
-* container
-* effect
-* entity
-* feature
-* reducer
-* store

##### Initial store setup

```bash
# add store module
$ ng g m store --m app.module.ts
# CREATE src/app/store/store.module.ts (189 bytes)
# UPDATE src/app/app.module.ts (3525 bytes)

# add root state interface
# ng g i store/state
# CREATE src/app/store/state.ts (27 bytes)
```

##### Feature store module setup

```bash
# add module
$ ng g m store/domain/domain --flat
# CREATE src/app/store/domain/domain.module.ts (199 bytes)

# add entity
$ ng g en store/domain/domain/domain -m ../../domain/domain.module.ts
# CREATE src/app/store/domain/domain/domain.actions.ts (2254 bytes)
# CREATE src/app/store/domain/domain/domain.model.ts (42 bytes)
# CREATE src/app/store/domain/domain/domain.reducer.ts (1818 bytes)
# CREATE src/app/store/domain/domain/domain.reducer.spec.ts (326 bytes)
#UPDATE src/app/store/domain/domain.module.ts (355 bytes)

# add effects
$ ng g ef store/domain/domain/domain -m store/domain/domain.module.ts
# CREATE src/app/store/domain/domain/domain.effects.ts (185 bytes)
# CREATE src/app/store/domain/domain/domain.effects.spec.ts (589 bytes)
# UPDATE src/app/store/domain/domain.module.ts (506 bytes)

# add service
$ ng g s store/domain/domain/domain
# CREATE src/app/store/domain/domain/domain.service.spec.ts (333 bytes)
# CREATE src/app/store/domain/domain/domain.service.ts (135 bytes)

```

##### Container & child components setup

```bash
# add module `+domain/domain`
$ ng g m +domain/domain --flat
# CREATE src/app/+domain/domain.module.ts (188 bytes)

ng g m +domain/domain --flat


# add container component `+domain/domain/domain-container`
$ ng g co +domain/domain/domain-container --flat --state ../../store/domain/domain/domain.reducer.ts
# CREATE src/app/+domain/domain/domain-container.component.html (33 bytes)
# CREATE src/app/+domain/domain/domain-container.component.ts (432 bytes)
# CREATE src/app/+domain/domain/domain-container.component.scss (0 bytes)
# CREATE src/app/+domain/domain/domain-container.component.spec.ts (884 bytes)
# UPDATE src/app/+domain/domain.module.ts (829 bytes)

# add child component `+domain/domain`
$ ng g c +domain/domain -c OnPush
# CREATE src/app/+domain/domain/domain.component.html (23 bytes)
# CREATE src/app/+domain/domain/domain.component.spec.ts (614 bytes)
# CREATE src/app/+domain/domain/domain.component.ts (262 bytes)
# CREATE src/app/+domain/domain/domain.component.scss (0 bytes)
# UPDATE src/app/+domain/domain.module.ts (829 bytes)

# add container component `+domain/domain/domain-detail/domain-detail-container`
$ ng g co +domain/domain/domain-detail/domain-detail-container --flat --state ../../../store/domain/domain/domain.reducer.ts
# CREATE src/app/+domain/domain/domain-detail/domain-detail-container.component.html (40 bytes)
# CREATE src/app/+domain/domain/domain-detail/domain-detail-container.component.ts (462 bytes)
# CREATE src/app/+domain/domain/domain-detail/domain-detail-container.component.scss (0 bytes)
# CREATE src/app/+domain/domain/domain-detail/domain-detail-container.component.spec.ts (927 bytes)
# UPDATE src/app/+domain/domain.module.ts (946 bytes)

# add child component `+domain/domain-detail`
$ ng g c +domain/domain/domain-detail -c OnPush
# CREATE src/app/+domain/domain/domain-detail/domain-detail.component.html (30 bytes)
# CREATE src/app/+domain/domain/domain-detail/domain-detail.component.spec.ts (657 bytes)
# CREATE src/app/+domain/domain/domain-detail/domain-detail.component.ts (289 bytes)
# CREATE src/app/+domain/domain/domain-detail/domain-detail.component.scss (0 bytes)
# UPDATE src/app/+domain/domain.module.ts (946 bytes)
```

## Directory structure

We use the **component approach** in this project, which is a *standard for developing Angular apps* and also a great
way to ensure maintainable code by encapsulation of our behavior logic.

A component is basically a self contained app usually in a single file or a directory with each concern as a file: *style*,
*template*, *specs*, and *component class*.

> As an old convention, we use the **`+` prefix** for *lazy-loaded* modules. Please keep in mind that it does not change
the *router behavior*, neither makes the directory *unworkable*. It's just a handy *method* to **identify lazy-loaded modules**
by having a straight look at the directory structure.

```bash
universal/
 ├──.cache/                         * cache directory for ngx-cache
 |
 ├──.circleci/
 |   └──config.yml                  * CircleCI config
 |
 ├──.github/                        * issue & pr templates
 ├──coverage/                       * test coverage reports
 |
 ├──dist/                           * output directory to extract bundles
 |  ├──browser/                     * browser bundles
 |  └──server/                      * server bundles
 |
 ├──node_modules/                   * dependencies
 |
 ├──src/
 |   ├──app/                        * application code
 |   |   ├──+lazy-module/           * some LAZY module (attn to the `+` prefix for lazy-loaded modules)
 |   |   |  ...
 |   |   ├──framework/              * client framework
 |   |   ├──layout/                 * layout (app module)
 |   |   ├──library/                * application library (models, services, state management, etc.)
 |   |   ├──login/                  * login (app module)
 |   |   ├──shared/                 * shared codebase
 |   |   └──store/                  * state (ngrx) module
 |   └──assets/                     * static assets (scss, img, json, etc.)
 |   └──environments/               * environment settings
 |
 ├──tools/
 |   ├──build/                      * build config and scripts (webpack, etc.)
 |   ├──config/                     * config files for static-assets (stylelint, etc.)
 |   └──test/                       * test config
 |
 ├──.gitignore                      * GIT settings
 ├──.jshintrc                       * jshint config
 ├──angular.json                    * Angular CLI config
 ├──CHANGELOG.md                    * change log
 ├──CODE_OF_CONDUCT.md              * code of conduct
 ├──CONTRIBUTING.md                 * contributing info
 ├──LICENSE                         * software license
 ├──package.json                    * deps management
 ├──README.md                       * project information
 ├──server.ts                       * server code
 ├──stylelint.config.js             * stylelint config locator
 ├──test-report.xml                 * JUNIT test results
 ├──tsconfig.json                   * typescript config
 ├──tsconfig.server.json            * typescript config (for server build)
 ├──tsconfig.server-compile.json    * typescript config (for server compilation)
 ├──tsconfig.spec.json              * typescript config (for unit/e2e tests)
 ├──tslint.json                     * tslint config
 └──yarn.lock                       * deps lockfile
```

## License

The MIT License (MIT)

Copyright (c) 2019 [Evgeny Karpovsky]

[Angular]: https://angular.io
[ngrx-powered]: http://ngrx.github.io
[Angular Universal]: https://angular.io/guide/universal
[Angular CLI]: https://cli.angular.io
[@angular-builders]: https://github.com/meltedspark/angular-builders
[Angular Material]: https://material.angular.io
[flex-layout]: https://github.com/angular/flex-layout
[AoT compilation]: https://angular.io/docs/ts/latest/cookbook/aot-compiler.html
[Angular Devkit]: https://github.com/angular/angular-cli
[SCSS]: http://sass-lang.com
[autoprefixer]: https://github.com/postcss/autoprefixer
[browserslist]: https://github.com/browserslist/browserslist
[stylelint-config-standard]: https://github.com/stylelint/stylelint-config-standard
[stylelint]: https://stylelint.io/
[Lazy loading]: https://angular-2-training-book.rangle.io/handout/modules/lazy-loading-module.html
[TransferState]: https://angular.io/api/platform-browser/TransferState
[ngrx/store]: https://ngrx.io/guide/store
[ngrx/entity]: https://ngrx.io/guide/entity
[ngrx/effects]: https://ngrx.io/guide/effects
[unionize]: https://github.com/pelotom/unionize
[ngx-config]: https://github.com/fulls1z3/ngx-config
[ngx-cache]: https://github.com/fulls1z3/ngx-cache
[ngx-translate]: https://github.com/ngx-translate/core
[ngx-meta]: https://github.com/fulls1z3/ngx-meta
[ngx-i18n-router]: https://github.com/fulls1z3/ngx-i18n-router
[ngx-perfect-scrollbar]: https://github.com/zefoy/ngx-perfect-scrollbar
[angulartics2]: https://github.com/angulartics/angulartics2
[Jest]: https://facebook.github.io/jest
[Nightmare]: https://github.com/segmentio/nightmare
[CircleCI]: https://circleci.com
[angular-tslint-rules]: https://github.com/ng-seed/angular-tslint-rules
[TSLint]: https://github.com/palantir/tslint
[codelyzer]: https://github.com/mgechev/codelyzer
