# Glossary

This glossary collects the core concepts that appear in this book, explained in the most accessible language for easy reference anytime. For a more complete list of terms, please turn to [Appendix A: Quick Reference for Common AI Terms](06-appendix/01-terms.md).

### Artificial Intelligence (AI)
The general term for technologies that let machines "smartly" perceive, learn, and make decisions like humans. It is the broad category encompassing everything this book discusses.

### Machine Learning
A branch of artificial intelligence that lets computers automatically learn patterns from data instead of relying on hand-coded fixed rules. Give it enough examples, and it "figures out the patterns" on its own.

### Deep Learning
The most powerful school within machine learning, learning with neural networks that have many layers. Nearly all popular AI today (image, speech, large models) relies on it.

### Neural Network
A "computing network" built by mimicking how neurons in the human brain connect. It is the basic structure of deep learning.

### Neuron
The smallest "computing unit" in a neural network, responsible for receiving signals, processing them simply, and passing them to the next layer. Countless neurons connected together form a neural network.

### Backpropagation
The learning method of neural networks: it passes the "error" back layer by layer from the output end, telling each parameter which way to adjust. It made it possible for multi-layer networks to "learn."

### Gradient Descent
A method for finding the optimal solution, like going down a mountain blindfolded: taking a small step in the steepest downhill direction each time until reaching the valley bottom (minimum error).

### Loss Function
A ruler measuring "how badly wrong" the model is; the smaller the value, the more accurate the model. The goal of training is to drive it as low as possible.

### Overfitting
The model "rote-memorized" the practice problems and crashes the moment it meets a new problem it hasn't seen—it learned too "rigidly" and can't generalize.

### Training
The process of having the model repeatedly look at examples, keep correcting mistakes, and get more and more accurate. It's like the model's "going to school and doing problems" stage.

### Dataset
A big collection of examples fed to the model for learning. The quality and quantity of the data directly determine the model's level—"garbage in, garbage out."

### Feature
The key information used to describe something, such as judging house prices by "size and location." The model makes its judgments based on features.

### Convolutional Neural Network (CNN)
The neural network best at "seeing images"—face recognition, image classification, and medical imaging all rely on it. It can extract image features layer by layer.

### Recurrent Neural Network (RNN)
A neural network good at handling data "with a sequence order" (such as sentences and speech), because it has "memory" and can remember earlier information.

### Word Embedding
Turning text into a string of numbers so the computer can compute "how similar words are." Words with similar meanings also have similar numbers.

### Attention
A method that teaches the model to "grasp the key points": when reading a sentence, it knows which words to focus on. It is the core of the Transformer.

### Transformer
An architecture proposed in 2017; it is the "engine" of nearly all large models today. It becomes fast and powerful thanks to the "attention mechanism."

### Encoder
The half of a Transformer responsible for "reading and understanding" the input content.

### Decoder
The half of a Transformer responsible for "generating and speaking out" content. GPT mainly uses the decoder.

### Pre-training
The first step of having the model "read widely" through massive amounts of material to build a solid general foundation, training it into a knowledgeable "generalist."

### Fine-tuning
On top of a "generalist" model, giving it extra "tutoring" with task-specific data to shape it into a "specialist" in some field.

### Large Language Model (LLM)
A very large-scale AI that has read a massive amount of text and is especially good at "talking like a human," such as the model behind ChatGPT. Note: unless otherwise specified, the "large model" mentioned in this book mainly refers to this kind of text-focused large language model (LLM).

### Foundation Model
A generalist model like someone who has "finished university and built a solid broad knowledge base," pre-trained on large-scale, multi-task data and possessing general capabilities; many specialized AIs are "further trained" (fine-tuned) from it.

### GPT (Generative Pre-trained Transformer)
A class of generative large models trained by "guessing the next word while reading"; ChatGPT comes from this family.

### Prompt
What you say to the AI and the instructions you give it. Only when you say it clearly and thoroughly can the AI answer better—this skill is called "prompt engineering."

### RAG (Retrieval-Augmented Generation)
A technique that has the AI "look up references" before answering a question, greatly reducing its tendency to make things up and making answers more accurate and up-to-date.

### Hallucination
When AI confidently "spouts nonsense," fabricating information that seems plausible but doesn't actually exist. Be especially wary of this when using large models.

### Emergent Ability
The phenomenon where, once a model's scale grows large enough, it suddenly "self-teaches" new abilities it was never specifically taught.

### Parameter
A large set of adjustable "knobs" inside the model. Training is the continuous adjustment of these knobs; the more parameters, the stronger the model usually is.

### Token
The "text chunks" as a large model sees them. A sentence is first cut into individual tokens, which the model then processes and predicts one by one.

### Multimodal
Meaning AI can not only process text but also understand images, hear sounds, and comprehend videos and other kinds of information at the same time.
