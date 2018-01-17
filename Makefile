all: _build/ _build/index.html _build/ui.css _build/index.min.js

_build/:
	@mkdir -p $@
	@(cd $@ && ln -s ../objs)

_build/index.html: src/index.pug
	@$(call compile_pug,$@,$<)

_build/ui.css: src/ui.styl
	@$(call compile_style,$@,$<)

_build/index.min.js: src/index.mjs src/*.mjs src/*.js
	@cp node_modules/three/build/three.min.js _build/three.min.js
	@node_modules/.bin/rollup --config rollup.config.js

# ----------

compile_pug = echo "pug->html $1" && \
	node_modules/.bin/pug < $2 --path $(dir $2) > $1

compile_style = echo "styl->css" $1 && \
	node_modules/.bin/stylus < $2 > $1

watch:
	@echo `date +%T` "start watching directory for changes..."
	@inotifywait -q -r -m --exclude ".*\.swp|.*~" -e close_write ./  |\
		while read path events file; do \
			echo "    ---  $$file has been modified" ;\
			make --no-print-directory ; \
		done

serve: _build/
	@cd _build && devd -A 0.0.0.0 -l .

clean:
	@rm -rfv _build/
