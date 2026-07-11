# Chapter 14 · A Quick Tour of Common Deep Learning Models

By now, you understand the foundation of neural networks (Chapters 9 and 10), the secret of depth (Chapter 11), and you've met the image-savvy CNN (Chapter 12) and the memory-equipped RNN (Chapter 13). Congratulations—your fundamentals are already rock solid!

This chapter takes it easy. Jay will walk you through the "famous schools"—those classic models whose names you often hear in the news and in papers. **It's totally fine if you can't remember the details**; all you need is an impression of each name along the lines of "oh, so that's what it does."

## Let's Start with an Everyday Scene

These models are like the various martial-arts schools in a wuxia world: some are renowned for their "deep inner strength" (extra-deep networks), some famous for their "ingenious moves" (especially clever architectures), and some go all-in on "fast, accurate, and fierce" (blazing speed). None is absolutely superior to the others; each has its own signature skill and its own arena where it shines.

(This is just an analogy. The differences between models are technical, but the understanding that "each has its strengths and its own fitting scenarios" is correct.)

## Breaking Down the Core Ideas

### 1. Four "famous schools" of the vision world

The following are all masters at teaching machines to "understand images." At heart they all belong to the CNN family from the last chapter; they just each have their own unique tricks:

- **VGG: the honest workhorse of "brute force works wonders."** Its structure is especially simple and orderly—just diligently stacking small convolutional layers one on top of another, deep and neat. Its plain, easy-to-understand approach makes it many people's first lesson.
- **Inception (GoogLeNet): the versatile "do-many-things-at-once" player.** It doesn't agonize over whether to use a big magnifying glass or a small one; instead, it **uses several sizes of magnifying glass at the same time**, taking in both coarse and fine features in one pass and then combining them. Like a photographer who works with a wide-angle and a telephoto lens at once.
- **ResNet (Residual Network): the depth king who "built the highway."** Remember the "vanishing gradient" and "highway" from Chapter 11? ResNet is the inventor of that highway, using residual connections to push network depth to hundreds of layers while still learning. It's a milestone in deep learning.
- **YOLO: the gunslinger who "settles it in a single glance."** Its full name is "You Only Look Once." While other models may have to scan an image repeatedly, it **finds the positions and categories of all objects in a single glance**, at blazing speed. It's the reigning star of real-time object detection (self-driving, surveillance, and the like).

![A comparison of the classic model schools](../assets/images/ch14-models-overview.svg)

### 2. One table to grasp their "signature skills"

| Model | One-line trait | Everyday analogy | Best-suited scenario |
| --- | --- | --- | --- |
| **VGG** | Simple structure, honestly stacking small conv layers deep | An honest worker stacking blocks higher, layer by layer | Beginner image classification; a backbone for other tasks |
| **Inception** | Multiple sizes of "magnifying glass" looking in parallel | A photographer using wide-angle + telephoto at once | Balancing accuracy and efficiency under limited compute |
| **ResNet** | Uses a "residual highway" to make the network extremely deep | A highway-building giant, towering in height | High-accuracy image tasks that need very deep networks |
| **YOLO** | Locates + classifies all objects in a single glance | A quick-handed, sharp-eyed gunslinger | Real-time object detection: self-driving, security surveillance |

> Tip: you don't need to memorize this table—just come back and glance at it when needed. What really matters is the last column, "best-suited scenario"—it decides which one to call on and when.

### 3. There's no best model, only the most suitable model

The question beginners most love to ask is: "So which model is the strongest?" Jay's answer is: **the question itself is wrong.** It's like asking "which is best—a sedan, an SUV, or a sports car?"—the answer is always "depends on what you want to do."

Choosing a model usually means trading off among these three things:

- **Look at the data:** how much data do you have, and is it images or text? With little data, you may need a smaller model to avoid "over-learning" (overfitting).
- **Look at the compute:** are you running on a supercomputing server, or do you need to squeeze it into a tiny phone or camera? When compute is tight, you need a light and nimble model (like YOLO and its kind).
- **Look at the requirements:** do you care more about **accuracy** (slow is okay as long as it's right) or **speed** (real-time response needed)? Medical diagnosis might prioritize accuracy, while self-driving absolutely must be fast enough.

**In one line: models have no absolute good or bad, only whether they fit.** Picking the tool based on the requirement is the mark of a pro.

## Chapter Summary

- Classic vision models mostly belong to the CNN family, each with its own trick: **VGG** (simply stacking deep), **Inception** (multi-scale in parallel), **ResNet** (a residual highway for extreme depth), **YOLO** (real-time detection in a single glance).
- To remember models, don't memorize the details—**just remember "what scenario it's best at."**
- Choosing a model requires weighing three things together: **data scale, compute conditions, and the accuracy/speed requirement**.
- There's no strongest model in the world, **only the model most suited to the task at hand**.

## Questions to Ponder

1. If you were building a "real-time road-sign recognition from photos" feature for a **phone app**, would you lean toward an extremely accurate but very slow model, or a fast-and-good-enough model like YOLO? Why?
2. Using the "choosing a car" line of thinking (sedan/SUV/sports car), describe which angles you'd consider when picking a deep learning model for a specific task.
