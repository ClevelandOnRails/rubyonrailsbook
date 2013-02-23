#Chapter Three: How The West Was Tested


Lets talk about tests. Specifically, why we should write them.


Remember how in chapter one we briefly talked about the test directory, and the contents?


Lets take a look inside 

![](images/036.png)

Not a lot there. Now, lets make this useful.

Add the following below the `test "the truth" do...end` section.


      test "without a body or title is is not valid" do
        article = Article.new
        
        assert !article.save
      end
  
      
Now, lets run our test.
    
    rake test:units

We should see something like this:

![](images/037.png)


Uh-oh, we've got a failed test. 

so, what can we do about this? Well, we can add in some validations. Head back to your model, and type this in after the `class Article < ActiveRecord::Base` part, and before the end:


      validates :body, :presence => true
      validates :title, :presence => true,
                    :length => { :minimum => 5 }


Save the file.

Before we go back to the browser, what do you think it does? Think about this for a minute or so - if in a group setting, discuss it with your pairing partner. 


Ok, you're back? Good. 


Now, head back to the `articles/new` route, and try to make an empty article. You should see something like this:

![Error messages!](images/014.png)


Ah re-run the test.

    rake test:units
    

![](images/038.png)



Let's take a quick side trip into why we should do test driven development.

> Test-driven development (TDD) is a software development process that relies on the
> repetition of a very short development cycle: first the developer writes an (initially failing)
> automated test case that defines a desired improvement or new function, then produces the minimum
> amount of code to pass that test, and finally refactors the new code to acceptable standards.
> Kent Beck, who is credited with having developed or 'rediscovered' the technique, stated in 2003 
> that TDD encourages simple designs and inspires confidence.

<sub>[Thank you Wikipedia](http://en.wikipedia.org/wiki/Test-driven_development)</sub>


So, lets sum this up, and why this is relevant for us right now.

Tests are *very* important, because it helps us break the problems down into the smallest bits possible.

In the future, if we need to upgrade something, or re-write something, we have a safety net of your tests - just recently, I had a dozen applications that I needed to upgrade immediately - there was a large security problem with them. It took me about 4 hours to do all 12 applications, because I had tests.


So now, lets write some more tests. 


Right now, we've got *a single test* that tests that without a body or a title the article is invalid. 

Now, lets write one so that with a body and a title, it is *valid*.



      test "that with a body and title it is valid" do
        article = Article.new(:title => "This is a title", :body => "This is a body")
        assert article.save
      end


Add the above test (remember, type it in, don't copy and paste!) *below* the second test and *above* the last end.

Now re-run your tests with

`rake test`





      test "that without a body and with a title it is valid" do
        article = Article.new(:title => "This is a title", :body => "")
        assert !article.save
      end

      test "that without a title and with a body it is valid" do
        article = Article.new(:title => "", :body => "This is a body")
        assert !article.save
      end
    end