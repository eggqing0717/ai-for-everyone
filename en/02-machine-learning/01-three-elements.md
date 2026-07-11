# Chapter 4: The Three Elements of Machine Learning

> Getting a machine to learn something is both hard and simple—you just need three things ready: **data, model, and training**. Miss any one of them, and learning won't happen.

## Starting with "cooking a dish"

Before we talk about machines, let's chat about cooking—something everyone understands.

Suppose you want to learn how to make a braised pork dish. What do you need?

- First, you need **ingredients**: pork belly, soy sauce, sugar, scallions and ginger... Without ingredients, even the best cook can't make a meal out of nothing.
- Second, you need a **cooking method**: blanch first, then brown the meat, add water and simmer for a certain time, at a certain heat... This method determines whether you can turn ingredients into a delicious dish.
- Finally, you need to **try again and again**: the first attempt might be too salty, the second might be undercooked, and by the third you gradually get the hang of it.

Machine learning works almost exactly the same way (this is just an analogy—reality is more complex):

| Making braised pork | Machine learning | In plain terms |
| --- | --- | --- |
| Ingredients | **Data** | The raw material used for learning |
| Cooking method | **Model** | The set of patterns that processes data and produces a result |
| Trying again and again | **Training** | Correcting mistakes over and over, getting better each time |

These are the three elements of machine learning. Let's go through them one by one.

## 1. Data: the machine's "ingredients"

Data is simply the **examples** a machine uses to learn.

To teach a machine to recognize cats, you have to show it thousands upon thousands of cat photos; to have a machine predict house prices, you have to give it a big pile of records like "how big this house is, where it is, and how much it sold for."

In one sentence: **the more examples a machine has seen, and the better they are, the more reliable the patterns it figures out tend to be.** Just like an experienced old hand who's seen the world knows the trade better than a novice who's only met three or five customers.

There's a lot of nuance in data—is it clean enough? Is there bias? Are the labels correct? We'll cover these in detail in **Chapter 5**. For now, just remember: **without data, a machine can't learn anything.**

## 2. Model: the machine's "cooking method"

"Model" sounds mysterious, but you can really think of it as a set of **"whatever you put in, this is what comes out" patterns**.

- You give it a photo (input), and it tells you "this is a cat" or "this is a dog" (output).
- You give it a house's size and location (input), and it estimates a price (output).

That set of patterns in the middle—turning input into output—is the model. It can be very simple (like a straight-line rule such as "bigger means pricier"), or complex enough to have hundreds of billions of tunable little knobs (like today's large models).

What a model actually looks like, and what kinds there are, we'll discuss in detail in **Chapter 6**. For now, remember this one sentence: **a model is the set of patterns that turns input into output.**

## 3. Training: the machine's "trying again and again"

With ingredients and a method in hand, a dish still won't come out perfect on the first try—training is the process of a machine **trying and correcting mistakes, over and over.**

It roughly loops like this:

1. The machine first uses its current model to **guess an answer**;
2. It compares the guess with the **correct answer** to see how far off it is (the more absurd the error, the more "points deducted");
3. Based on the gap, it **quietly adjusts the knobs in the model** so it guesses a bit more accurately next time;
4. It repeats the above, thousands upon thousands of times, until the guesses are accurate enough.

This process of "continuously correcting mistakes and getting more accurate with each tweak" is the essence of training. Behind it is a vivid name called **Gradient Descent**, which we'll explain crystal clear with a "blind person walking down a mountain" story in **Chapter 7**.

![The triangle of data, model, and training](../assets/images/ch04-three-elements.svg)

## The triangle rule: none can be missing

Why call them the "three elements"? Because they're like **the three sides of a triangle—remove any one and it can't hold up**:

- **Data but no good model**: like having a pile of top-notch ingredients but not knowing how to cook—still no good dish on the table.
- **A model but no good data**: even the finest culinary skill, using spoiled ingredients, can only produce something inedible. This is the famous saying "**Garbage In, Garbage Out**."
- **Data and a model, but no training**: it's like having both the ingredients and the recipe ready, yet never actually cooking—forever just theory on paper.

So please remember: **data, model, and training complement one another, and none can be missing.** This is the single most important "map" for understanding machine learning.

## While we're at it, meet three "ways of learning"

Machine learning isn't limited to just one "way of learning." Based on how much a "teacher" is involved, it mainly divides into three types. Let's get a feel for them through everyday scenarios (this is just an analogy—reality is more complex):

- **Supervised learning (learning to imitate)**: like a student doing a workbook with an answer key. Every question comes with the correct answer, and the student imitates it and gradually learns. The "recognizing cats" and "estimating house prices" mentioned earlier belong to this category—it's also the most widely used approach today.
- **Unsupervised learning (self-discovery)**: like tossing it a pile of unlabeled photos and letting it group the similar-looking ones together on its own. No one tells it right from wrong; it discovers the "clustering" patterns in the data by itself. Often used to segment customers into groups or find similar content.
- **Reinforcement learning (growing through trial and error)**: like training a puppy—do it right and get a piece of meat (reward), do it wrong and get nothing (penalty). Through repeated trial and error, it figures out "how to act to get the most reward." Game-playing AIs like AlphaGo and many game AIs rely on it.

None of these three is superior to the others; they simply suit different scenarios. Just having a general impression is enough for now—we'll bring them up again when we need them.

## Chapter summary

- Machine learning can't do without three elements: **data (ingredients), model (cooking method), and training (trying again and again)**.
- The three are **indispensable, like the sides of a triangle**: "Garbage In, Garbage Out" reminds us that data quality is crucial.
- The essence of training is a loop where the machine **keeps guessing answers, comparing them with the correct answers, and then correcting mistakes**.
- By how much a "teacher" is involved, learning mainly splits into three types: **supervised learning (learning to imitate), unsupervised learning (self-discovery), and reinforcement learning (growing through trial and error)**.

## Questions to ponder

1. If you had to teach a machine to identify "spam email," what "ingredients" (data) would you prepare? What kind of result would you want it to output?
2. A skill you've learned in life (like riding a bike, typing, or cooking)—is it more like supervised learning, unsupervised learning, or reinforcement learning? Why?

---

Among the three elements, the one most easily overlooked by ordinary people—yet the most critical—is actually **data**. In the next chapter, we'll talk about the interesting and important stories behind data.
