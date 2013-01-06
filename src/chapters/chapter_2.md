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
      resources :comments do
    end


So it should look like this:


![](images/022.png)

