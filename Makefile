ifndef REPORTER
	REPORTER=spec
endif

ifeq ($(wildcard ./node_modules/.bin/mocha),) 
	MODULES_INSTALLED=false
endif

test:
ifdef MODULES_INSTALLED
	npm install
endif
	./node_modules/.bin/mocha --reporter ${REPORTER}

.PHONY: test