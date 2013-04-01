#Chapter 4: Making it Look Good.


Ok, so right now, our website looks a little bland. Lets spruce things up a bit.



We'll be using [Twitter's bootstrap](http://twitter.github.com/bootstrap/).

The reasons for using Bootstrap are numerous, most of which boil down to "because bootstrap is a really nice project", for a variety of reasons.

- Bootstrap is open source. Free as in beer and as in speech.

- Bootstrap became fairly popular fairly quickly among the rails community, and the programming community at large.

- Bootstrap is used at Twitter, and bugs are fixed quickly.

- Bootstrap has good defaults, and we can utilize those to code faster.

- There is large amounts of documentation on Bootstrap out on the internet, so if you need to make changes, it's not certain, but it's likely that someone has written a blog post or [Stack Overflow](http://stackoverflow.com/tags/twitter-bootstrap) post about how to do it.

So in short, Bootstrap just makes sense to use for getting started.

Open up your gemfile, and add the following line to the bottom:

    gem 'bootstrap-sass'

Go back to your terminal, and run `bundle install`. 


This should complete successfully. Create a new file called `app/assets/stylesheets/bootstrap_and_overrides.css.scss`

It should have the following contents:

{:lang="css"} 
    @import "bootstrap";
    body { padding-top: 60px; }
    @import "bootstrap-responsive";


Save the file, and restart your server.


Upon refreshing, you should notice a few things - mainly, that the font looks much better, and that there is a large area of whitespace at the top of the page.


Open up `app/views/layouts/application.html.erb`, and then make it look like this. This is one place where you can copy/paste instead of typing it in. I'll make an exception for this one piece of code.

{:lang="erb"} 
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>DemoApp</title> <!-- the page title -->
        <meta name="description" content="">
        <meta name="author" content="">
        <!-- the two lines below load our CSS (stylesheet) and our JavaScript (javascript_include_tag) -->
        <%= stylesheet_link_tag "application", :media => "all" %>
        <%= javascript_include_tag "application" %>
        <!-- this is for a security feature of rails. -->
        <%= csrf_meta_tags %>
      </head>
      <body>
        <header class="navbar navbar-fixed-top"> <!-- this is the big black bar at the top of the page that we'll see in a  moment -->
          <nav class="navbar-inner">
            <div class="container">
              <!-- we will be putting some fun stuff in here shortly. --> 
            </div>
          </nav>
        </header>
        <div id="main" role="main">
          <div class="container">
            <div class="content">
               <div class="row">
                <div class="span12">
                  <!-- this is where the stuff in app/views/ will render, depending on the route we load. -->
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


Now, you'll notice that the article modification links look a little odd.

![What do they look like?](images/044.png)


Thats right. They look like normal text, not like links. Lets fix that.


Well, how do we go about defining this? Because we are using Bootstrap for the reasons outlined above, we can use something that is already in Bootstrap.

Lets take a look at the [base CSS section of the Bootstrap docs](http://twitter.github.com/bootstrap/base-css.html).

There is a lot of good stuff in here, but what we are mainly interested in is the section on buttons.

There are several types of buttons we can pick.

![Shiny buttons.](images/045.png)


We'll use a red button for the delete action.

Open `app/views/articles/index.html.erb` in your editor, if you haven't already.


Edit the part that looks like this:

{:lang="erb"} 
    <td><%= link_to 'Destroy', article, method: :delete, data: { confirm: 'Are you sure?' } %></td>

Which should be around **line 18**, to look like this.

{:lang="erb"} 
    <td><%= link_to 'Destroy', article, method: :delete, data: { confirm: 'Are you sure?' }, :class => 'btn btn-mini btn-danger' %> </td>


Now, we're doing three things here. First, we're giving this `link_to` a CSS class of `btn`. Then, we're giving it a CSS class of `btn-mini`, and then finally we're giving it a class of `btn-danger`. The first one makes it behave like a button. The second makes it look like a small button. The third one makes it red, or rather, the danger button that we saw above.

![](images/046.png)

Better, but still not great. Now we'll make each link a button, really quick.

- Add the `:class => "btn-mini btn"` to Show `link_to`.
- Add the `:class => "btn-mini btn btn-inverse"` to Edit `link_to`.

Much much better, but we can make it awesome.

Now we'll toss this whole thing into a bootstrap-styled table, so that it looks better and has some separation between each item, so that the user can differentiate and keep track of which item is which.

It currently is in a table, but we'll modify it to look more bootstrapish and not as plain.


Open up `app/views/articles/index.html.erb`, and look for the line that looks like this, right at the top of the file. 

{:lang="html"} 
    <table>

Change it to this:

{:lang="html"} 
    <table class="table">

Now, save and refresh your browser. 

Much better, isn't it?


##Recap:

So far, we have:

- Chosen a open source project, and integrated it with our application.

- Gone through a little bit of the criteria for what a good open source project should have before we go and use it.

- Made some changes to our HTML and our CSS.

- Discovered that we can make our application look better without too much effort. 

Next up, we'll be using the [Git](http://git-scm.com/) version control to track and control changes in our applications codebase.

