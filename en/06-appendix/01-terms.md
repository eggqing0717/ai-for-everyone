# Appendix A: Quick Reference for Common AI Terms

This is an "AI term dictionary." Each entry first gives you **a plain-language explanation** (just enough to understand), followed by **a slightly more formal explanation** (for when you want to go deeper). When you hit a word you don't understand, just come back and look it up—no need to memorize.

> How to read: the word in parentheses is the original English term, so you can match it up in English resources. Entries marked with ⭐ are the highest-frequency, most worth-remembering core terms in the whole book.

---

## 1. Model-Related

**Artificial Intelligence (AI) ⭐**
- Plain language: getting machines to do work "smartly," like humans.
- Formally: the general term for technologies that give machines human-like intelligent abilities such as perception, learning, reasoning, and decision-making.

**Machine Learning (ML) ⭐**
- Plain language: instead of humans writing fixed rules, let the computer "figure out the patterns" from lots of examples.
- Formally: the core branch of AI that lets computers automatically learn patterns from data and make predictions.

**Deep Learning (DL) ⭐**
- Plain language: learning with neural networks that have many layers—the most powerful school within machine learning.
- Formally: a machine learning method based on multi-layer neural networks, able to automatically extract multi-level features from data.

**Model ⭐**
- Plain language: the "skill" a machine has learned—give it a question as input and it gives you an answer.
- Formally: a mathematical function or set of parameters obtained through training that maps inputs to outputs.

**Algorithm**
- Plain language: a fixed set of steps for solving a problem, like a recipe for cooking.
- Formally: a series of clear, finite computational steps designed to accomplish a specific task.

**Parameter**
- Plain language: a bunch of adjustable "knobs" inside the model; training is about turning the knobs to their best positions.
- Formally: internal numerical values (such as weights and biases) in a model that are learned through training.

**Weight**
- Plain language: a number that represents "how important" a given input is.
- Formally: coefficients on the connections of a neural network that determine how strongly an input signal affects the output.

**Feature**
- Plain language: the key information used to describe something—for example, judging house prices by "size and location."
- Formally: attributes or variables extracted from raw data and used for model learning and judgment.

**Classification**
- Plain language: tasks like deciding "is this a cat or a dog"—sorting things into categories.
- Formally: a supervised learning task that predicts which discrete category a sample belongs to.

**Regression**
- Plain language: predicting a specific number, such as "what's tomorrow's temperature" or "how much is this house worth."
- Formally: a supervised learning task that predicts continuous numerical output.

**Clustering**
- Plain language: nobody gives the answers; the machine groups similar things into piles on its own.
- Formally: a method in unsupervised learning that automatically groups similar samples together.

**Supervised Learning**
- Plain language: giving the machine problems "with standard answers" to practice on, like having a teacher grade the work.
- Formally: a learning approach that trains using labeled data.

**Unsupervised Learning**
- Plain language: giving only data without answers, letting the machine find patterns on its own.
- Formally: a learning approach that discovers intrinsic structure or patterns from unlabeled data.

**Reinforcement Learning (RL)**
- Plain language: like training a puppy—reward it when it does right, no treat when it does wrong, and it gradually learns the best approach.
- Formally: a learning paradigm where an agent optimizes its decision-making policy by interacting with an environment based on reward signals.

## 2. Neural-Network-Related

**Neural Network ⭐**
- Plain language: a "computing web" built by mimicking how brain neurons connect.
- Formally: a computational model composed of many interconnected artificial neurons arranged in layers, capable of learning complex mappings.

**Neuron / Node**
- Plain language: the smallest "computing unit" in a neural network, responsible for receiving, processing, and passing on signals.
- Formally: the basic unit of a network that sums weighted inputs and produces output through an activation function.

**Activation Function**
- Plain language: a "switch" installed on a neuron that decides whether a signal passes on and how much.
- Formally: a function that introduces nonlinearity (such as ReLU or Sigmoid), enabling the network to fit complex relationships.

**Hidden Layer**
- Plain language: the layers "working behind the scenes" between input and output.
- Formally: intermediate layers between the input and output layers that handle feature transformation.

**Convolutional Neural Network (CNN) ⭐**
- Plain language: the network best at "seeing images"—recognizing faces and objects all relies on it.
- Formally: a network that uses convolution operations to extract local image features, excelling at computer vision tasks.

**Recurrent Neural Network (RNN)**
- Plain language: good at handling things "with a sequence order," such as sentences and speech.
- Formally: a network with recurrent connections, able to process sequential data and retain temporal information.

**LSTM (Long Short-Term Memory)**
- Plain language: an upgraded RNN with a better memory, less likely to "forget the earlier context."
- Formally: an RNN variant that uses gating mechanisms to mitigate vanishing gradients over long sequences, excelling at long-term dependencies.

**Parameters Count**
- Plain language: the size of a model's "brain capacity"—more parameters usually mean stronger ability but also more resource consumption.
- Formally: the total number of trainable parameters in a model, often used to measure model scale (e.g., 7 billion parameters).

## 3. Data-Related

**Dataset ⭐**
- Plain language: a big pile of examples fed to the machine for learning.
- Formally: a collection of sample data used to train, validate, or test a model.

**Train / Validation / Test Set**
- Plain language: practice problems, mock exams, and the real exam—only by keeping them separate can you know the true skill.
- Formally: data splits used respectively to train the model, tune and select the best settings, and finally evaluate generalization ability.

**Label**
- Plain language: the "standard answer" attached to the data, such as labeling an image as "cat."
- Formally: the target output value corresponding to a sample in supervised learning.

**Annotation / Labeling**
- Plain language: the work of manually attaching labels to data—tedious yet important.
- Formally: the process of manually adding labels or markings to raw data.

**Feature Engineering**
- Plain language: processing raw data into a form the machine can understand better.
- Formally: the process of selecting, transforming, and constructing features from data to improve model performance.

**Normalization / Standardization**
- Plain language: adjusting values to roughly the same "scale" so that big numbers don't bully small ones.
- Formally: scaling data to a uniform range or distribution to speed up training and stabilize convergence.

**Data Cleaning**
- Plain language: picking out dirty, wrong, or duplicate data and throwing it away or fixing it.
- Formally: identifying and handling issues such as missing, abnormal, or duplicate data to improve data quality.

**Token ⭐**
- Plain language: the "text chunks" as a large model sees them; a sentence gets cut into individual tokens for processing.
- Formally: the smallest processing unit after text is split; it may be a word, subword, or character.

## 4. Training and Optimization

**Training ⭐**
- Plain language: the process of having the model repeatedly do problems, keep correcting mistakes, and get more and more accurate.
- Formally: the process of adjusting model parameters through an optimization algorithm to minimize loss.

**Loss Function ⭐**
- Plain language: a ruler measuring "how badly wrong" the model is—the smaller the better.
- Formally: a function that measures the gap between the model's predictions and the true values; it is the objective of optimization.

**Gradient Descent ⭐**
- Plain language: like going down a mountain blindfolded, taking a small step in the steepest downhill direction each time until you reach the valley bottom.
- Formally: an optimization method that iteratively updates parameters along the negative gradient direction of the loss function to find the minimum.

**Backpropagation ⭐**
- Plain language: passing the "error" back layer by layer from the end to the front, telling each knob how it should be adjusted.
- Formally: an algorithm that uses the chain rule to compute gradients layer by layer from the output layer to the input layer.

**Learning Rate**
- Plain language: the "step size" of each adjustment—too large and you easily overshoot, too small and you move slowly.
- Formally: a hyperparameter that controls the magnitude of parameter updates.

**Hyperparameter**
- Plain language: the "configuration settings" set manually before training, such as the learning rate and the number of layers.
- Formally: parameters that must be set manually before training and are not learned from the data.

**Overfitting ⭐**
- Plain language: cramming and memorizing the practice problems, only to freeze up on the real exam—overlearning.
- Formally: when a model performs well on the training set but poorly on new data, showing insufficient generalization ability.

**Underfitting**
- Plain language: too little practice, unable to even get the practice problems right.
- Formally: when a model is too simple to learn the patterns in the data, performing poorly on both training and testing.

**Generalization**
- Plain language: the ability to answer correctly even on new problems never seen before.
- Formally: a model's ability to perform on unseen data.

**Regularization**
- Plain language: setting "rules" for the model to keep it from rote memorization (overfitting).
- Formally: techniques that improve generalization by constraining model complexity (such as L1/L2 and Dropout).

**Batch / Batch Size**
- Plain language: how many pieces of data are fed to the model to learn together at once.
- Formally: the number of samples used for each parameter update.

**Epoch**
- Plain language: going through the entire dataset once completely is called one epoch.
- Formally: one complete pass through all the training data during training.

**Accuracy**
- Plain language: the proportion of correct answers—the most intuitive report card.
- Formally: the proportion of correctly predicted samples out of the total samples.

## 5. Large Models and Applications

**Large Language Model (LLM) ⭐**
- Plain language: a huge AI that has read a massive amount of text and is especially good at "talking like a human," such as the model behind ChatGPT.
- Formally: a model trained on massive text, with an enormous number of parameters, skilled at understanding and generating language.
- Note: unless otherwise specified, the "large model" mentioned in this book mainly refers to this kind of text-focused large language model (LLM).

**Foundation Model**
- Plain language: a generalist model like someone who has "finished university and built a solid broad knowledge base"; many specialized AIs are "further trained" (fine-tuned) from it.
- Formally: a very large model pre-trained on large-scale, multi-task/multimodal data, possessing general capabilities and often used as the starting point for downstream fine-tuning.

**Transformer ⭐**
- Plain language: the "engine" behind almost all large models today, made powerful by "attention."
- Formally: a deep learning architecture proposed in 2017 based on the self-attention mechanism; it is the cornerstone of modern large models.

**Attention ⭐**
- Plain language: teaching the model to "grasp the key points"—knowing which word to focus on when reading a sentence.
- Formally: a mechanism that assigns weights to different inputs based on relevance and focuses on key information.

**Self-Attention**
- Plain language: letting each word in a sentence "look at" the other words to understand their mutual relationships.
- Formally: a mechanism where elements within a sequence compute attention weights relative to one another.

**Encoder**
- Plain language: the half responsible for "reading and understanding" the input.
- Formally: the module that encodes an input sequence into a semantic representation.

**Decoder**
- Plain language: the half responsible for "speaking out / generating" content.
- Formally: the module that progressively generates an output sequence based on encoded information.

**Word Embedding ⭐**
- Plain language: turning text into a string of numbers so the computer can compute "similarity of meaning."
- Formally: mapping words into dense vectors so that semantically similar words are close together in vector space.

**Pre-training ⭐**
- Plain language: first having the model "read widely" on a massive scale to build a solid foundation and become a "generalist."
- Formally: the first stage of training general capabilities on large-scale unlabeled data.

**Fine-tuning ⭐**
- Plain language: on top of a generalist, giving it extra "tutoring" for a specific task to train it into a "specialist."
- Formally: continuing to train a pre-trained model with task-specific data to adapt it to downstream tasks.

**GPT (Generative Pre-trained Transformer) ⭐**
- Plain language: a class of generative large models trained by "guessing the next word while reading"—ChatGPT's family.
- Formally: a series of models based on the Transformer decoder, centered on generative pre-training.

**Prompt / Prompt Engineering ⭐**
- Plain language: what you say to the AI; say it well and the AI answers better.
- Formally: the method of designing input instructions to guide a large model to produce the desired output.

**RAG (Retrieval-Augmented Generation) ⭐**
- Plain language: having the AI "look up references" first before answering, to reduce making things up.
- Formally: combining external knowledge retrieval with a generative model to improve the accuracy and timeliness of answers.

**Hallucination ⭐**
- Plain language: the AI confidently spouting nonsense and fabricating facts that don't exist.
- Formally: the phenomenon where a model generates content that seems plausible but does not match the facts.

**Emergent Ability ⭐**
- Plain language: once a model is big enough, it suddenly gains abilities it was never specifically taught.
- Formally: abilities that are absent in smaller models but suddenly appear in larger models as scale increases.

**Multimodal**
- Plain language: not only able to read text, but also able to understand images, sound, and video at the same time.
- Formally: the ability to simultaneously process and understand multiple data modalities (text, images, audio, etc.).

**Agent**
- Plain language: an AI "worker" that can plan on its own, call tools, and complete a task step by step.
- Formally: an AI system that can perceive the environment, make decisions autonomously, and call tools to carry out multi-step tasks.

**LoRA (Low-Rank Adaptation) — a parameter fine-tuning technique**
- Plain language: a fine-tuning method that adjusts only a small part of the model, saving both money and GPU memory.
- Formally: a method that efficiently fine-tunes large models by injecting a small number of trainable parameters via low-rank matrices.

**Inference**
- Plain language: the process of actually "using" a trained model to give you answers.
- Formally: the stage of using a trained model to make predictions or generate output on new inputs.

---

> Didn't find the word you were looking for? You can return to the corresponding section in the main text, or refer to the tools and communities in [Appendix B: Recommended Learning Resources](02-resources.md) to dig deeper.
