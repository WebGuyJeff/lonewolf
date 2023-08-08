# Lonewolf

## A WordPress theme for freelancers.

This theme is intended for freelancers/self-employed professionals. Features and templates are
developed for an individual presenting their services.


### Linting

This project uses PHP_CodeSniffer (installed via Composer) to lint PHP. It also uses wpcs (WordPress coding standards) 'sniffs' to validate code in adherence with WP coding standards.

To install the project dependencies:
'composer install'

Register an added coding standard (wpcs):
'./vendor/squizlabs/php_codesniffer/bin/phpcs --config-set installed_paths ../../wp-coding-standards/wpcs'

Update your VS Code settings file:
```
	"phpcs.executablePath": "./vendor/squizlabs/php_codesniffer/bin/phpcs",
	"phpcs.standard": "WordPress",
	"phpcbf.executablePath": "./vendor/squizlabs/php_codesniffer/bin/phpcbf",
	"phpcbf.standard": "WordPress",
	[...]
	"phpsab.executablePathCS": "./vendor/squizlabs/php_codesniffer/bin/phpcs",
	"phpsab.executablePathCBF": "./vendor/squizlabs/php_codesniffer/bin/phpcbf",
	"phpcs.composerJsonPath": ".composer.json",
	"phpsab.composerJsonPath": ".composer.json",
```

Check the installed standards:
'./vendor/squizlabs/php_codesniffer/bin/phpcs -i'

#### Global install

Install PHP_CodeSniffer globally
'composer global require "squizlabs/php_codesniffer=*"'

Make sure you have the composer bin dir in your PATH. The default value is ~/.composer/vendor/bin, but you can check the value that you need to use by running 'composer global config bin-dir --absolute'.

**To update the PATH variable**

Open ~/.bashrc and add a line to update the PATH variable with this location.
`sudo nano ~/.bashrc`

Add/update the following line:
`export PATH="~/.composer/vendor/bin:$PATH"`

Save and close, then reload your bash config:
`source ~/.bashrc`

Confirm the variable now contains the location:
`echo $PATH`

#### Usage

Check code
'./vendor/bin/phpcs **/*.php'

Fix Code
'./vendor/bin/phpcbf **/*.php'

Summarize large outputs:
'./vendor/bin/phpcs --report=summary **/*.php'

Specifying a Coding Standard:
'./vendor/bin/phpcs --standard=WordPress /path/to/code/myfile.inc'

[PHP_CodeSniffer Github](https://github.com/squizlabs/PHP_CodeSniffer#installation)
[WordPress Coding Standards for PHP_CodeSniffer Github](https://github.com/WordPress/WordPress-Coding-Standards#installation)

#### PHP8.0 Bugfix

See this README for patching instructions:

'./vendor-wpcs-php8-bugfix/wp-coding-standards/wpcs/WordPress/Sniffs/WhiteSpace/README.md'
