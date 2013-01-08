# Chapter Two: Lets Take a jog around the block with some comments


Ok, so we've basically been making a blog here, right? Lets quickly write out the 'core' functionality of a blog:

- blog posts/articles. 
- comments.
- users so we know *who* is writing the comments and articles.
- twitter buttons.
- a not-so-ugly lookin' design. 

So we've got the first one sketched out already. Let's go dive into the next one. 

Run this in the terminal:

`bundle exec rails generate model Comment commenter:string body:text article:references`

![](images/015.png)

Lets take a look at `app/models/comments.rb`

![](images/016.png)

It has the following lines in it:

    class Comment < ActiveRecord::Base
      belongs_to :article
    end

In addition to the model, rails also generated the file `db/migrate/20130106225333_create_comments.rb`. Let's take a look inside that too:

![](images/017.png)


    class CreateComments < ActiveRecord::Migration
      def change
        create_table :comments do |t|
          t.string :commenter
          t.text :body
          t.references :article, index: true

          t.timestamps
        end
      end
    end


Ok, so let's walk through this line by line.

    class CreateComments < ActiveRecord::Migration

This defines our class "CreateComments", and says it inheirits from ActiveRecord::Migration. Since this is a database migration, this is the right thing.

      def change
        create_table :comments do |t|

<sub>Grouping these together for consistency</sub>

we define a method called `change`, and then call `create_table` with `:comments`. 

          t.string :commenter

This adds a column in the database called "commenter" that is a string.

          t.text :body

This adds a column in the database called "body" that is a string.

          t.references :article, index: true

This adds in a reference to the articles model we created earlier, and sets :index to true.

          t.timestamps

This is just there for timestamping - so you can do sorting by last created, first created, created within a time period, etc.


Lets run the database migrations:

![](images/023.png)

Open up `app/models/article.rb`, and edit it to look like this:


![](images/019.png)


Now, we're going to tinker with something called 'routes'. This is a way to generate URLs from code. 

Open up `config/routes.rb`, and take a look inside. 

![Where to find the routes file](images/020.png)

By default, there are a lot of examples that are commented out, so we'll be ignoring them for now.

Change the

    resources :articles

to

    resources :articles do
      resources :comments
    end


So it should look like this:


![](images/021.png)



Next up: building a controller for our comments.


    bundle exec rails generate controller Comments


![](images/022.png)


This command generated a lot of files, so we'll take a quick look at what each of them does.

- app/controllers/comments_controller.rb: This is our controller.
- app/views/comments: This is where we will put our views. 
- test/controllers/comments_controller_test.rb: This is a controller test. We'll dig more into tests in a future chapter.
- app/helpers/comments_helper.rb: This is a "helper", where we can store bits of code we might reuse in our views.
- test/helpers/comments_helper_test.rb: This is where we can test the code in our helper.
- app/assets/javascripts/comments.js.coffee: Our coffeescript file. We'll dig into what coffeescript is later.
- app/assets/stylesheets/comments.css.scss: This is our SCSS file, or stylesheet. It's a different way of writing plain CSS.


Now, let's wire everything into the view.

Open up `app/views/articles/show.html.erb`.

![](images/024.png)

And then in before the `<%= link_to 'Edit', edit_article_path(@article) %>` line, type in this:

    <h2>Add a comment:</h2>
    <%= form_for([@article, @article.comments.build]) do |f| %>
      <p>
        <%= f.label :commenter %><br />
        <%= f.text_field :commenter %>
      </p>
      <p>
        <%= f.label :body %><br />
        <%= f.text_area :body %>
      </p>
      <p>
        <%= f.submit %>
      </p>
    <% end %>


So what does this do?

Well, it creates a form for @article.comments, and then we proceed to enable then to enter in the comment's details. Lets try this out. 

If you haven't already, go start your server with

> bundle exec rails server


And then head to [localhost:3000/articles](http://localhost:3000/articles/) and pick an article, or if you need to, create one.

![](images/026.png)

Now, go ahead and click "Create Comment".

![](images/027.png)

Uh-oh. We didn't make a create action in our controller. Lets fix that.


    class CommentsController < ApplicationController
      def create
        @article = Article.find(params[:article_id])
        @comment = @article.comments.create(comment_params)
        redirect_to article_path(@article)
      end

      private
        def comment_params
          params.require(:comment).permit(:commenter, :body)
        end
    end

Now, lets walk through this line by line so we understand what it does.

    class CommentsController < ApplicationController
      def create
        @article = Article.find(params[:article_id])

This creates the CommentsController class that inheirits from ApplicationController.
It then creates the create action, and sets up the @article variable to equal the current article based off of the article_id parameters.

    @comment = @article.comments.create(comment_params)

this creates the `@comment` variable, which equals `@article.comments.create` - which means we're going to create a new comment. The `(comment_params)` part will make some more sense soon. 

        redirect_to article_path(@article)

That means that when it's all done with the stuff above it, it will redirect_to the article_path, with the parameters @article - is the article_id if you remember from above.


      private
        def comment_params
          params.require(:comment).permit(:commenter, :body)
       end

So first we call the `private` keyword, which means that everything that follows is private, and can't be called outside of this controller.


We then define the comment_params that we used earlier. Basically, we are defining what parameters we want to be whitelisted - this is to prevent people from say, editing someone elses posts. 


Now, save the controller, and try to create a comment again. You will notice that it will succeed, but nothing will appear.

Next up: Creating the view for our comments.

Find the the show.html.erb file for our articles view, and open it up.

Now, type this in, after `<%= @article.body %>`, and before `<%= form_for([@article, @article.comments.build]) do |f| %>`.


    <h2>Comments</h2>
    <% @article.comments.each do |comment| %>
      <p>
        <strong>Commenter:</strong>
        <%= comment.commenter %>
      </p>
 
      <p>
        <strong>Comment:</strong>
        <%= comment.body %>
      </p>
    <% end %>

Save the file, and refresh your browser. You should see this:


![](images/028.png)



Now, lets refactor some stuff. Right now, things are getting pretty gnarly in the views, so let's extract some things to a partial.


To do that, make the file `app/views/comments/_comment.html.erb`, with the contents below:


    <% @article.comments.each do |comment| %>
      <p>
        <strong>Commenter:</strong>
        <%= comment.commenter %>
      </p>
 
      <p>
        <strong>Comment:</strong>
        <%= comment.body %>
      </p>
    <% end %>



And then change the `app/views/articles/show.html.erb` file to look like this:

    <p id="notice"><%= notice %></p>

    <p>
      <strong>Title:</strong>
      <%= @article.title %>
     </p>

    <p>
      <strong>Body:</strong>
      <%= @article.body %>
    </p>


    <h2>Comments</h2>

    <%= render @article.comments %>

    <%= form_for([@article, @article.comments.build]) do |f| %>
    ....

    <% end %>
    <%= link_to 'Edit', edit_article_path(@article) %> |
    <%= link_to 'Back', articles_path %>


This will render the partial in `app/views/comments/_comment.html.erb` once for each comment in the array (collection) that `@article.comments` returns.


Lets extract the new comment form into it's own partial as well.

Create a file called `app/views/comments/_form.html.erb`, and put the following into it:

    <%= form_for([@article, @article.comments.build]) do |f| %>
      <p>
        <%= f.label :commenter %><br />
        <%= f.text_field :commenter %>
      </p>
      <p>
        <%= f.label :body %><br />
        <%= f.text_area :body %>
      </p>
      <p>
        <%= f.submit %>
      </p>
    <% end %>



Save the file, and then edit `app/views/articles.show.html.erb` to look like this:

    <p id="notice"><%= notice %></p>

    <p>
      <strong>Title:</strong>
      <%= @article.title %>
    </p>

    <p>
      <strong>Body:</strong>
      <%= @article.body %>
    </p>


    <h2>Comments</h2>

    <%= render @article.comments %>

    <h2>Add new comment</h2>
    <%= render "comments/form" %>

    <%= link_to 'Edit', edit_article_path(@article) %> |
    <%= link_to 'Back', articles_path %>


    
Save the file, and refresh. 

![](images/029.png)


Now, lets make it so we can delete comments.


To add the delete link, edit `app/views/comments/_comment.html.erb` to include a link:



      <p>
        <%= link_to 'Destroy Comment', [comment.article, comment],
                    method: :delete,
                    data: { confirm: 'Are you sure?' } %>
      </p>



