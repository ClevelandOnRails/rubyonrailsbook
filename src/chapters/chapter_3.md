#Chapter Three: How The West Was Tested


Lets talk about tests. Specifically, why we should write them.


Remember how in chapter one we briefly talked about the rspec directory, and the contents?


Lets take a look inside 

![](images/036.png)

      
Now, lets run our tests.
    
    bundle exec rake spec:models

We should see something like this:

![](images/037.png)



We have pending tests here. So lets take these from pending to passing.

Before we do that, open up `spec/models/article_spec.rb` and edit it to look like this:


    require 'spec_helper'

    describe Article do
      before { @article = Article.new(title: "Example Title", body: "this is a body") }

      subject { @article }

    end


This sets up a `@article` resource that we can modify appropriately. 

##Lets start by testing that is has the `body` and `title` attributes.


Type in the following *below* the `subject { @article }` line, and *before* the `end`.

 
    it { should respond_to(:title) }
    it { should respond_to(:body) }


Now, run

    bundle exec rake spec:models

We should have three examples, with 0 failures and 1 pending. 


##Lets write another test.

Add this test in:


    describe "when body is not present" do
      before { @article.body = "" }
      it { should_not be_valid }
    end



And then re-run our tests.

    bundle exec rake spec:models


![](images/041.png)

So, what can we do about this? Well, we can add in some validations. Head back to your model, and type this in after the `class Article < ActiveRecord::Base` part, and before the end:


      validates :body, :presence => true

Save the file.

Before we go back to the browser, what do you think it does? Think about this for a minute or so - if in a group or pairing setting, discuss it with your pairing partner. 


Ok, you're back? Good. 


Now, head back to the `articles/new` route, and try to make an empty article. You should see something like this:

![Error messages!](images/014.png)


Ah re-run the test.

    bundle exec rake spec:models
    

![Yay! We have green tests!](images/038.png)


Now, lets write another failing test, this time to test that without a title, it isn't valid. 


    describe "when title is not present" do
      before { @article.title = "" }
      it { should_not be_valid }
    end


![](images/042.png)


To make this test green, we need to add the following to our article model:


      validates :title, :presence => true,
                    :length => { :minimum => 5 }



Re-run our tests.

    bundle exec rake spec:models

![](images/043.png)


Let's take a quick side trip into why we should do test driven development.

##Why We Write Tests.

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


I asked that on Twitter, and here are a few of the responses I got:


> @jrgifford I think it's better to start unit testing from the beginning so that it scales and doesn't become a struggle at a later point.

[Via Issac Moore](https://twitter.com/iamramsey/status/306093052219494401)


> @jrgifford (this coming from someone who never did unit tests and now is being forced to start)

[Via Issac Moore](https://twitter.com/iamramsey/status/306093174391181312)


> @jrgifford Unit Tests are always the first things I learn. It's a standardized set of functions in each language. Sort of like Hello World.

[Via Will Smidlein](https://twitter.com/ws/status/306086152769769472)


Unit Tests are a very important part of most companies application lifecycle, so it's worth learning from the start.



##Back To Writing Tests

So now, lets write some more tests. 


Right now, we've got four tests that check the following:

- `Article.new` has the attribute `title`.
- `Article.new` has the attribute `body`.
- `Article.new` is not valid when the `body` is not present.
- `Article.new` is not valid when the `title` is not present.

We need to verify that A `Article.new` is valid when both the `title` and `body` are present. 


##Further Study:

Write that test, and the following tests:

- `Article.new` is invalid when both the `body` and the `title` are not present.
- `Article.new` does *not* respond to `crackerjacks`.
