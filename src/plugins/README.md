# Plugins Folder

Plugins define behavior that is common to all the routes in your
application. Authentication, caching, templates, and all the other cross
cutting concerns should be handled by plugins placed in this folder.
插件定义了应用程序中所有路由共有的行为。身份验证、缓存、模板和其他交叉关注点应该由放置在此文件夹中的插件处理。

Files in this folder are typically defined through the
[`fastify-plugin`](https://github.com/fastify/fastify-plugin) module,
making them non-encapsulated. They can define decorators and set hooks
that will then be used in the rest of your application.
此文件夹中的文件通常通过 [`fastify-plugin`](https://github.com/fastify/fastify-plugin) 模块定义，使它们非封装。它们可以定义装饰器并设置钩子，然后在您的应用程序的其余部分中使用。

Check out:

* [The hitchhiker's guide to plugins](https://www.fastify.io/docs/latest/Guides/Plugins-Guide/)
* [Fastify decorators](https://www.fastify.io/docs/latest/Reference/Decorators/).
* [Fastify lifecycle](https://www.fastify.io/docs/latest/Reference/Lifecycle/).
