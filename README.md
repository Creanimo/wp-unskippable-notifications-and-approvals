# Unskippable Notifications and Approvals

![Version 0.0.1-alpha](https://img.shields.io/badge/version-0.0.1_alpha-red) ![Badge: Tested with Wordpress 6.5.3](https://img.shields.io/badge/tested_with_WordPress-6.5.3-green?logo=wordpress)


> [!CAUTION]  
> This plugin isn't functional yet. Only run this in a development environment.

With this WordPress plugin, administrators can show **messages in the frontend**, which **users are forced to confirm** or react to. The user has to interact with all requests assigned to them, otherwise they are blocked from using the frontend.

The goal is to **gather and log confirmation from all or selected employees**, as well as approvals from higher ups. Consequently, this plugin is designed for internal company knowledge bases and not public websites. 

> [!IMPORTANT]  
> The notifications are purposfully interrupting in nature and block a user temporarily from using the rest of the site. For more gentle announcements and a less aggressive, fully-featured document approval system, you might want to consider looking for another plugin. This is also not a messaging system.

> [!WARNING]  
> If you are less tech-savy, misconfiguration might lock yourself out of your own frontend. However, tech-savy people will have no problem to circumvent the block. This is intentionally not a bullet-proof system.

## Troubleshooting

### When creating a notification, selecting user (roles) doesn't show search results

Activate a pretty permalink structure, so the WordPress API endpoints can be accessed.

## Thanks to

* **Generate WP** for this very useful [Custom Post Type Generator](https://generatewp.com/post-type/)
* **[Róbert Mészáros](https://profiles.wordpress.org/meszarosrob/)** for this excellent write up on [How to use WordPress React components for plugin pages](https://developer.wordpress.org/news/2024/03/26/how-to-use-wordpress-react-components-for-plugin-pages/)
* **Alex Standiford** for this comprehensible article: [Make Webpack Configuration Easy With wordpress/scripts](https://dev.to/alexstandiford/make-webpack-configuration-easy-with-wordpress-scripts-26kk)