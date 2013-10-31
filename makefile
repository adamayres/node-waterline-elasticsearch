# Grunt Module Build
#
# @type theme
# @author potanin@UD
# @version 2.0.0

build:
	npm update
	grunt

watch:
	grunt watch

test:
	grunt test

clean:
	grunt clean

update:
	npm update
	grunt update

install:
	npm install
	grunt

commit:
	grunt commit
