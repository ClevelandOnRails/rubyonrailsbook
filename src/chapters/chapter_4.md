#Chapter 4: Making it Look Good.


Ok, so right now, our website looks a little bland. Lets spruce things up a bit.



We'll be using [Twitter's bootstrap](http://twitter.github.com/bootstrap/).

The reasons for using Bootstrap are numerous, most of which boil down to "because bootstrap is a really nice project", for a variety of reasons.

- Bootstrap is open source. Free as in beer and as in speech.

- Bootstrap became fairly popular fairly quickly among the rails community, and the programming community at large.

- Bootstrap is used at Twitter, and most bugs (with few exceptions) are fixed quickly.

- Bootstrap has good defaults, and we can utilize those to code faster.

- There is large amounts of documentation on Bootstrap out on the internet, so if you need to make changes, it's not certain, but it's likely that someone has written a blog post or [Stack Overflow](http://stackoverflow.com/tags/twitter-bootstrap) post about how to do it.

So in short, Bootstrap just makes sense to use for getting started.

Open up your gemfile, and add the following line to the bottom:

    gem 'bootstrap-sass'

Go back to your terminal, and run `bundle install`. 


This should complete successfully. Create a new file called `app/assets/stylesheets/bootstrap_and_overrides.css.scss`

It should have the following contents:

    @import "bootstrap";
    body { padding-top: 60px; }
    @import "bootstrap-responsive";


Save the file, and restart your server.


Upon refreshing, you should notice a few things - mainly, that the font looks much better, and that there is a large area of whitespace at the top of the page.


Open up `app/views/layouts/application.html.erb`, and then make it look like this. This is one place where you can copy/paste instead of typing it in. I'll make an exception for this one piece of code.

    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DemoApp</title>
        <meta name="description" content="">
        <meta name="author" content="">
        <%= stylesheet_link_tag "application", :media => "all" %>
        <%= javascript_include_tag "application" %>
        <%= csrf_meta_tags %>
      </head>
      <body>
        <header class="navbar navbar-fixed-top">
          <nav class="navbar-inner">
            <div class="container">
            </div>
          </nav>
        </header>
        <div id="main" role="main">
          <div class="container">
            <div class="content">
               <div class="row">
                <div class="span12">
                  <%= yield %>
                </div>
              </div>
              <footer>
              </footer>
            </div>
          </div> 
        </div> 
      </body>
    </html>



Now, refresh. Looks better, doesn't it?


Now, you'll notice that the article modification buttons/links look a little odd.

![What do they look like?](images/044.png)


Thats right. They look like normal text, not like links. Lets fix that.


Well, how do we go about defining this? Because we are using Bootstrap for the reasons outlined above, we can use a Bootstrap class. Now, lets take a look at the bootstrap documentation. 