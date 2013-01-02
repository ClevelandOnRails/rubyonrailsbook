src=src/index.md
title='Book Title'
file='book-title'

all: html mobi rtf

html:
	pandoc -s -N --section-divs $(src) -t html5 -o builds/html/index.html \
		--css=main.min.css \
		--include-in-header src/html/meta.html \
		--include-before-body src/html/head.html \
		--include-before-body src/html/preface.html \
		--include-after-body src/html/footer.html \
		--title-prefix $(title) \
		--normalize \
		--smart \
		--toc

epub:
	pandoc -s -N $(src) -t epub -o builds/epub/$(file).epub \
		--epub-metadata metadata.xml \
		--title-prefix $(title) \
		--normalize \
		--smart \
		--toc

rtf:
	pandoc -s -N $(src) -o builds/rtf/$(file).rtf \
		--title-prefix $(title) \
		--normalize \
		--smart

mobi: epub
	kindlegen builds/epub/$(file).epub
