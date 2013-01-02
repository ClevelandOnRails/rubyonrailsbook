html:
	pandoc -s -N --section-divs tmp/index.md -t html5 -o builds/html/index.html \
		--css=main.min.css \
		--include-in-header src/html/meta.html \
		--include-before-body src/html/head.html \
		--include-before-body src/html/preface.html \
		--include-after-body src/html/footer.html \
		--title-prefix '' \
		--toc
