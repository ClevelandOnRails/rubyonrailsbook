#Users, Permissions and Ownership

So, first off, why do we need users, permissions and ownership?


Users & Ownership:

  - So we can know who people are.
  - So we can find things by a user.
  - So we can tell who wrote this.


Permissions:

  - To keep people from editing stuff that they don't own.



So, first of all, we need to add the gems to our `Gemfile`.


    gem 'sorcery'
    gem 'cancan'


Save the file, and re-run `bundle install`.



Now, install sorcery.

    rails g sorcery:install core remember_me


Lets take a look at the migration file that just created.


Open up the `DateTimeStamp_sorcery_core.rb` migration.



    class SorceryCore < ActiveRecord::Migration
      def self.up
        create_table :users do |t|

This creates the users table in our database.


          t.string :username,         :null => false  # if you use another field as a username, for example email, you can safely remove this field.

Username attribute.


          t.string :email,            :default => nil # if you use this field as a username, you might want to make it :null => false.

Email attribute.

          t.string :crypted_password, :default => nil
          
Our encrypted password.

          t.string :salt,             :default => nil


Our salt (part of the password encryption process).


          t.timestamps
        end
      end

      def self.down
        drop_table :users

That deletes the table.



Open up the `sorcery_remember_me` migration:


    class SorceryRememberMe < ActiveRecord::Migration
      def self.up
        add_column :users, :remember_me_token, :string, :default => nil
        add_column :users, :remember_me_token_expires_at, :datetime, :default => nil
        
        add_index :users, :remember_me_token
      end

      def self.down
        remove_index :users, :remember_me_token
        
        remove_column :users, :remember_me_token_expires_at
        remove_column :users, :remember_me_token
      end
    end


Fairly self explanatory.


We need to dig into the `sorcery` initializer that was created for us in `config/initializers/sorcery.rb`.


Open it up, and search for `user.username_attribute_names.



Edit it to look like this:


    user.username_attribute_names = :email




Now is a good time to commit what we have in the repository right now.


To do that, first add the files.

    git add .


And then we need to commit them.


    git commit -m "Added Sorcery and CanCan to the Gemfile, started installation of sorcery"




Now, now, lets open up the User model, and add in some quick validations.


Make it look like this:

    class User < ActiveRecord::Base
      authenticates_with_sorcery!
      validates_confirmation_of :password
      validates_presence_of :password, :on => :create
      validates_presence_of :email
      validates_uniqueness_of :email
    end



