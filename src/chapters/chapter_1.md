# Chapter One: Lets Start Walking



    $ rails -v
    Rails 3.2.11

Note: At time of writing, Rails 4 is still in beta. It should return at least 4.0.0 by the time you are reading this.


Now create the Demo App: Run 

    rails new DemoApp

Wait for it to finish, and then run

    cd DemoApp

Run `bundle exec rails server` from the application folder.

Now open up your web browser (I'll be using Firefox), and head to

> localhost:3000

You should see something like this:


![Hello rails!](images/002.png)

<!-- we'll stick with pure markdown for now, images be durned!-->

Now lets take a little walk through everything.

Inside the rails application we just created (The DemoApp one), we have the following files - I'm going to briefly explain them.


![Sublime Text Showing our application's files](images/003.png)

- app: This contains the controllers, models, views and assets for your application. You'll focus on this folder.
- config: Configure your application's runtime rules, routes, database and more. We will get into this later as well.
- config.ru: Rack configuration for Rack based servers that are used to run the application.
- db/: Contains your current database scheme, as well as the database migrations.
- doc/: In-depth documentation for your application.
- Gemfile and Gemfile.lock: These files let you specify what the gem dependencies are for your application.
- lib/: Extended modules for your application.
- log/: Application log files. Can be useful for debugging things.
- public/: Contains the static files, compiled assets etc.
- Rakefile: This file finds and loads tasks that you can run from the command prompt. The tasks are defined in the components of rails, and in Gems (dependencies defined in the Gemfile).
- README.rdoc: This is a brief manual for your application. You need to edit this file to tell others what it does, how to configure it, any system dependecies, etc.
- script/: Contains the rails script that will start your app and can contain other scripts you write to deploy or run your applicaiton.
- test/: Unit tests, fixtures and other test resources. These will be covered in a future chapter.
- tmp/: Temporary files, ignore this.
- vendor/: A place for all third-party code. In a normal Rails applicaiton, this includes Ruby Gems, the rails source code (if you choose to install it in your actual project) and plugins containing additional prepackaged features.

So that's a brief, 1,000-mile-high overview of a rails application. Now what?

Now, lets get our feet wet.


Open up the `Gemfile`, and add in the following line at the bottom:

    gem 'strong_parameters'


Once you've done that,
Open a new terminal window, and run the following command:

    bundle install
    
And then when that is done, run:

    bundle exec rails generate scaffold article title:string body:text


You'll see something like this:

![Terminal showing command output](images/004.png)


What this will do is create a database migration, model, controller and views. 

Lets take a look at what we just did. Head over to

> [http://localhost:3000/articles](http://localhost:3000/articles)

And you should get a ` ActiveRecord::StatementInvalid` error. 


<!--[!ActiveRecord::PendingMigrationError](images/005.png)-->


![ActiveRecord::StatementInvalid Error](images/030.png)


To fix that, simply run

    bundle exec rake db:migrate

![rake db:migrate in action](images/006.png)

and then reload the page.

You should see something like this:

![Pretty bare, huh?](images/007.png)

Now, lets create a article. Click the "New Article" button, and fill it out.


![Filling out the fields](images/008.png)

It will redirect you to the `article#show` action. 

![Redirected!](images/009.png)

Now, let's take a look at what is happening behind the scenes here.

Open up the `app/controllers/articles_controller.rb` file in your editor.


![](images/010.png)

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

![](images/011.png)


Notice here, it has the following lines:
    
    <%= @article.title %>
    <%= @article.body %>


So, what does this do? Well, as you learned in *Learn Ruby The Hard Way*, when it's @variable, that means we're calling a instance variable, and when it's @variable.something, that means we're calling a method on that instance. In these cases, we are calling the .title and .body methods, which return strings and text, respectively. Where does rails define that it's a string vs a number vs a boolean?

The answer lies in `db/migrate`, and in one other place.

There is a file called `20130104155555_create_articles.rb`.
*please note that it might not be that exact file name, the 20130104155555 at the beginning of mine is a date and time stamp, and so it will change for you as well*


    class CreateArticles < ActiveRecord::Migration
      def change
        create_table :articles do |t|
          t.string :title
          t.text :body

          t.timestamps
        end
      end
    end


Now, a question: Anyone remember where the other place we mentioned it would **describe** itself?

Ah, right. The Model. Lets go take a look at that, shall we?


![](images/012.png)


It's pretty sparse. 

    class Article < ActiveRecord::Base
    end

Just two lines. So, what can we do here?

Well, lets head back to the browser really quick.


> [localhost:3000/articles/new](http://localhost:3000/articles/new)

Just click the "create article" button. Don't enter anything into the form.

Well, would ya look at that! It's empty!

![](images/013.png)

so, what can we do about this? Well, we can add in some validations. Head back to your model, and type this in after the `class Article < ActiveRecord::Base` part, and before the end:


      validates :body, :presence => true
      validates :title, :presence => true,
                    :length => { :minimum => 5 }


Save the file.

Before we go back to the browser, what do you think it does? Think about this for a minute or so - if in a group setting, discuss it with your pairing partner. 


Ok, you're back? Good. 


Now, head back to the `articles/new` route, and try to make an empty article. You should see something like this:

![Error messages!](images/014.png)

Ok, so, wrap up what we've covered:

- Models.
- A brief over view of a rails application.
- scaffolding.
- databases - kinda. 
- views. not much, but we know they exist. 
- controllers.
- validations.


##Extra Credit

- find out what `json` is.
- look around in `app/views/articles/show.html.erb`, and try to figure out what it does. We will discuss it in the next chapter.
- in `app/views/articles/_form.html.erb`, on line 4 we have the error message we saw earlier. what does `@articles.errors.count` do?
