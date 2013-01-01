html:
	pandoc -s -N --section-divs index.md -t html5 -o index.html \
		--css=stylesheets/book.css \
		--include-in-header meta.html \
		--include-before-body head.html \
		--include-before-body preface.html \
		--include-after-body footer.html \
		--title-prefix '' \
		--toc
