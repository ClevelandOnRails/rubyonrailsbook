# Chapter One

Lets hope that Rails 4 will be out, so I'm using a rails4 compatible setup. Hopefully.

   $ rails -v 
   Rails 4.0.0.beta # at time of writing. Should return at least 4.0.0 by the time we are running things.
   $



Now create the Demo App: Run 

    rails new DemoApp

Wait for it to finish, and then run

    cd DemoApp

Run `bundle exec rails server` from the application folder. 

Now open up your web browser (I'll be using Firefox today), and head to

> localhost:3000

You should see something like this:


![Hello rails!](images/Chapter1-figure1.png)

<!-- we'll stick with pure markdown for now, images be durned!-->

Now lets take a little walk through everything.

First, we have the `app` folder.

Inside of that, we have the assets, controllers, helpers, mailers, models and views. We'll dig into these later, but for now, it's enough to know that they exist, and that they do the following:

- assets is where we have our stylesheets, images, and similar things. 
- controllers is where we glue together our views and our models.
- helpers is where we can define some pieces of code that we might reuse in the future.
- mailers are for sending email.
- models are where we describe things. We'll get into that later.
- views are where we write the way we display the output of our code. We'll discuss these more later.

Next up, we have the `config` folder.


We won't dig into this right now, since this will just be confusing. As we have to edit things, we will edit things. Until then, just ignore this folder. :-)

db is where we have our database, which is where we store the contents of our models. There will also be a folder called 'migrations', which is where we will discuss later, when we have an example.

the doc folder can be ignored for now. I've never seen anyone use it.

lib is where we can toss in third-party setups, but that is something that we won't touch in this class, so we don't need to worry about it.

log is where the application logs are. This is useful for debugging.

public is where we can upload things like images, our 404 and server error pages, etc. We'll update these soon. :-)

script is like lib - it's something we won't really touch in this class.

test is where we have our automated tests. We can write tests that will make sure our application behaves like it should.

tmp is the temporary directory - it can be useful to clean this out every now and again, but it's something else you can ignore.

Vendor is another one like lib - it's for third-party libraries and resources that aren't packaged as part of the Gemfile.

Gemfile - this is where we define the third-party libraries and resources we will be using in our application. This is the preferred way of loading things if possibile.

README.rdoc - the default ruby on rails readme.

Rakefile - this is something else we shouldn't need to modify. It is the definition file for the "Ruby make" utility, which we use for running some commands.

Now, lets get our feet wet.

Run the following command that I just pasted into the chatroom:

    rails g scaffold article title:string body:text

What this will do is create a database migration, model, controller and views. 

Lets take a look at what we just did. Head over to 

> localhost:3000/articles

And you should get a ` ActiveRecord::PendingMigrationError ` error. To fix that, simply run

    rake db:migrate

and then reload the page.

You should see something like this:

##Show the page.

Now, lets create a article. Click the "New Article" button, and fill it out.

It will redirect you to the article show action. 

Now, let's take a look at what is happening behind the scenes here.

Open up the `app/controllers/articles_controller.rb` file.

The part we are interested in is the `def show` action.

    # GET /articles/1
    # GET /articles/1.json
    def show
      respond_to do |format|
        format.html # show.html.erb
        format.json { render json: @article }
      end
    end



We'll dig into exactly what this does later, but for now, let's just remember that it mentions `@article`. This will be important soon.

Now, let's take a look at the `app/views/articles/show.html.erb` file.



Notice here, it has the following lines:
    
    <%= @article.title %>
    <%= @article.body %>


So, what does this do? Well, as we discovered earlier today, when it's @variable.something, that generally means we're calling a method on the variable. In these cases, we are calling the .title and .body methods, which return strings and text, respectively. Where does rails define that it's a string vs a number?


The answer lies in `db/migrate`, and in one other place.

There is a file called `datetimestamp_create_articles.rb`.

    class CreateArticles < ActiveRecord::Migration
      def change
        create_table :articles do |t|
          t.string :title
          t.text :body

          t.timestamps
        end
      end
    end


**Wording is important for the next one:**

Now, a question: Anyone remember where the other place we mentioned it would **describe** itself?  