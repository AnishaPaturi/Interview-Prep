const generativeAIData = {
  "Generative AI": {
    icon: "ti-brain",
    color: "#A32D2D",
    topics: {
      "What is Generative AI?": {
        explanation: "Generative AI refers to AI systems capable of producing new content — text, images, audio, video, and code — rather than just classifying or predicting from existing data. It marks a shift from AI that recognizes patterns to AI that creates.",
        details: [
          "Traditional AI: classification and prediction (spam filter, price prediction)",
          "Generative AI: creates novel outputs (write an email, generate an image)",
          "Key examples: OpenAI → ChatGPT, Google → Gemini, Anthropic → Claude",
          "Modalities: text, image, audio, video, code, 3D, multimodal",
          "Underlying tech: Transformers, Diffusion Models, GANs, VAEs"
        ],
        example: `// Traditional AI vs Generative AI
Traditional AI:
  Input: "This email says 'Win $1000 now!!'"
  Task:  Binary classification
  Output: SPAM / NOT SPAM

Generative AI:
  Input: "Write a professional email declining a meeting"
  Task:  Content generation
  Output: "Dear [Name], Thank you for the invitation...
           Unfortunately, I'm unable to attend due to..."

// Real-world applications
Text:    ChatGPT, Claude, Gemini → writing, Q&A, coding
Images:  DALL·E, Midjourney, Stable Diffusion → art, design
Code:    GitHub Copilot, Claude Code → code completion
Audio:   Suno, ElevenLabs → music, voice synthesis
Video:   Sora, Runway → video generation

// Foundation: all modern GenAI is built on Transformers
                  +------------------+
  Transformers → | Self-Attention    | → Understand context
                  | Positional Enc.  | → Order-aware
                  | Feed-Forward     | → Pattern learning
                  +------------------+`
      },
      "Machine Learning Basics": {
        explanation: "Machine Learning is a subset of AI where systems learn patterns from data rather than following explicitly programmed rules. It is the foundation that makes Generative AI possible.",
        details: [
          "Supervised learning: labeled data pairs (input→output); learns to predict",
          "Unsupervised learning: unlabeled data; discovers hidden structure",
          "Reinforcement learning: agent learns by reward/penalty feedback",
          "Features: input variables (columns); Labels: target output (what we predict)",
          "Overfitting: model memorizes training data, fails on new data",
          "Underfitting: model too simple, cannot capture patterns in data",
          "Training/test split: typically 80/20 or 70/30"
        ],
        example: `# Supervised Learning — Linear Regression (house price)
from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1000],[1500],[2000],[2500]])  # sq ft (feature)
y = np.array([200000, 280000, 350000, 420000])  # price (label)

model = LinearRegression()
model.fit(X, y)               # learn from training data
print(model.predict([[1800]])) # predict new house: ~319,000

# Classification — Logistic Regression (spam or not)
from sklearn.linear_model import LogisticRegression
# X = email features (word counts, caps ratio, etc.)
# y = [1=spam, 0=not spam]

# Unsupervised — K-Means (customer segmentation)
from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)  # find 3 customer groups
kmeans.fit(X)                   # no labels needed!

# Overfitting example
# Training accuracy: 99%   ← memorized training data
# Test accuracy:     65%   ← fails on new data
# Fix: regularization, more data, simpler model

# Underfitting example
# Training accuracy: 60%   ← model too simple
# Test accuracy:     58%
# Fix: more complex model, more features`
      },
      "Deep Learning Basics": {
        explanation: "Deep Learning uses multi-layered neural networks to learn representations of data automatically. It powers almost all modern Generative AI — from image generation to language models.",
        details: [
          "Neural network: layers of artificial neurons inspired by the brain",
          "Input layer: receives raw data (pixels, words, numbers)",
          "Hidden layers: learn increasingly abstract features",
          "Output layer: final prediction (class, score, token)",
          "Activation functions: add non-linearity (ReLU, Sigmoid, Tanh, Softmax)",
          "Backpropagation: computes gradients; weights updated via gradient descent",
          "Epoch: one full pass through the training dataset"
        ],
        example: `# Neural network with PyTorch
import torch
import torch.nn as nn

class SimpleNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.layers = nn.Sequential(
            nn.Linear(784, 256),   # input → hidden (784 pixels)
            nn.ReLU(),             # activation: max(0, x)
            nn.Linear(256, 128),   # hidden → hidden
            nn.ReLU(),
            nn.Linear(128, 10),    # hidden → output (10 digits)
            nn.Softmax(dim=1)      # probabilities: sum=1
        )
    def forward(self, x):
        return self.layers(x)

model = SimpleNN()
optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.CrossEntropyLoss()

# Training loop
for epoch in range(50):
    predictions = model(X_train)       # forward pass
    loss = criterion(predictions, y)   # measure error
    optimizer.zero_grad()
    loss.backward()      # backprop: compute gradients
    optimizer.step()     # update weights: w -= lr * grad

# Activation function choice:
# ReLU:    f(x) = max(0, x)  — hidden layers (fast, standard)
# Sigmoid: f(x) = 1/(1+e⁻ˣ) — binary output (0 to 1)
# Softmax: multi-class output (sums to 1)
# Tanh:    f(x) = (eˣ-e⁻ˣ)/(eˣ+e⁻ˣ)  — (-1 to 1)`
      },
      "NLP Fundamentals": {
        explanation: "Natural Language Processing (NLP) enables computers to understand and process human language. LLMs are built on NLP foundations — understanding these concepts is essential for working with language models.",
        details: [
          "Tokenization: splitting text into tokens (words, subwords, or characters)",
          "Stop words: common words with little meaning (the, is, a, an) — often removed",
          "Stemming: reduce word to root form (running → run, studies → studi) — crude",
          "Lemmatization: reduce to proper root (running → run, better → good) — accurate",
          "POS tagging: label each word's grammatical role (noun, verb, adjective...)",
          "NER: Named Entity Recognition — identify names, places, dates in text",
          "Sentiment analysis: detect emotional tone (positive, negative, neutral)"
        ],
        example: `import nltk
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import PorterStemmer, WordNetLemmatizer

text = "The students are running quickly through the library"

# Tokenization
tokens = word_tokenize(text)
# ["The","students","are","running","quickly","through","the","library"]

# Remove stop words
stop = set(stopwords.words('english'))
filtered = [t for t in tokens if t.lower() not in stop]
# ["students","running","quickly","library"]

# Stemming (crude)
ps = PorterStemmer()
stemmed = [ps.stem(w) for w in filtered]
# ["student","run","quickli","librari"]   ← "quickli" not a real word

# Lemmatization (accurate)
lem = WordNetLemmatizer()
lemmatized = [lem.lemmatize(w, pos='v') for w in filtered]
# ["student","run","quickly","library"]  ← proper words

# POS tagging
tagged = nltk.pos_tag(tokens)
# [("The","DT"),("students","NNS"),("are","VBP"),("running","VBG")]
# DT=determiner, NNS=plural noun, VBP=verb, VBG=verb-ing

# NER — spaCy
import spacy
nlp = spacy.load("en_core_web_sm")
doc = nlp("Apple Inc. was founded by Steve Jobs in Cupertino.")
for ent in doc.ents:
    print(ent.text, ent.label_)
# Apple Inc.  → ORG
# Steve Jobs  → PERSON
# Cupertino   → GPE (geopolitical entity)

# Sentiment Analysis
from transformers import pipeline
sentiment = pipeline("sentiment-analysis")
sentiment("This movie was absolutely fantastic!")
# [{'label': 'POSITIVE', 'score': 0.9998}]`
      },
      "Transformers": {
        explanation: "The Transformer architecture (2017, 'Attention Is All You Need') is the foundation of all modern LLMs. Its self-attention mechanism allows parallel processing and captures long-range dependencies far better than RNNs.",
        details: [
          "Encoder: reads input, creates contextual representations (used in BERT)",
          "Decoder: generates output token by token (used in GPT)",
          "Self-attention: each token attends to all other tokens simultaneously",
          "Multi-head attention: multiple heads capture different relationships",
          "Positional encoding: adds order information (transformers process all tokens at once)",
          "Why better than RNNs: parallel processing, no vanishing gradient, long-range deps",
          "Attention formula: Attention(Q,K,V) = softmax(QKᵀ / √d_k) · V"
        ],
        example: `# Transformer architecture overview
# Input: "The cat sat on the mat"

# STEP 1: Tokenize + Embed
tokens = ["The", "cat", "sat", "on", "the", "mat"]
embeddings = embed(tokens)  # each token → 512-dim vector

# STEP 2: Add positional encoding
# Inject position info (transformers process all tokens at once)
pe = positional_encoding(sequence_length=6, d_model=512)
x = embeddings + pe

# STEP 3: Self-attention
# Each token asks: "which other tokens are relevant to me?"
# Q (query): what am I looking for?
# K (key):   what do I offer?
# V (value): what info do I provide if matched?
Q = x @ W_Q  # query projection
K = x @ W_K  # key projection
V = x @ W_V  # value projection

# Attention score
scores = (Q @ K.T) / math.sqrt(d_k)  # scaled dot product
weights = softmax(scores)              # probabilities
output = weights @ V                   # weighted sum of values

# For "sat": high attention to "cat" (subject) and "mat" (object)

# STEP 4: Multi-head attention (8 heads typical)
# Head 1 might focus on syntax
# Head 2 might focus on coreference
# Head 3 might focus on semantic relations
# Results concatenated + projected

# WHY TRANSFORMERS WIN over RNNs:
# RNN:         processes tokens one-by-one (slow, sequential)
# Transformer: processes ALL tokens in PARALLEL (fast)
# RNN:         struggles with long sequences (gradient vanishes)
# Transformer: attention spans entire sequence (no distance limit)

# Encoder-only:   BERT → understanding tasks (classification)
# Decoder-only:   GPT, Claude → generation tasks
# Encoder-Decoder: T5, BART → translation, summarization`
      },
      "Large Language Models": {
        explanation: "Large Language Models (LLMs) are transformer-based models trained on massive text datasets to predict the next token. Through this simple objective on enough data, they develop emergent abilities like reasoning, coding, and instruction following.",
        details: [
          "Core task: next-token prediction — trained on trillions of tokens",
          "Parameters: adjustable weights (GPT-3: 175B, GPT-4: ~1T estimated)",
          "Pretraining: unsupervised learning on internet-scale text",
          "Fine-tuning: adapt pretrained model to specific task with labeled data",
          "RLHF: Reinforcement Learning from Human Feedback — aligns model with human preferences",
          "Context window: max tokens model can process at once (4K → 1M+ tokens)",
          "Hallucination: confident generation of false information"
        ],
        example: `# How LLMs work — next token prediction
# Training objective: given context, predict next word
# "The Eiffel Tower is located in ___" → "Paris"
# "def factorial(n): if n == 0: return ___" → "1"

# Tokenization (GPT-4 uses tiktoken — BPE encoding)
import tiktoken
enc = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode("Hello world!")
# [9906, 1917, 0]  ← integer token IDs
# Token ≠ word: "unhappy" → ["un", "happy"] (2 tokens)
# Rule of thumb: 1 token ≈ 0.75 words (English)

# Key parameters when calling an LLM API
import anthropic
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1000,          # max output length
    temperature=0.7,          # 0=deterministic, 1=creative
    messages=[
        {"role": "user", "content": "Explain backpropagation"}
    ]
)

# Temperature effect:
# temperature=0.0 → always picks most probable token (consistent)
# temperature=0.7 → moderate creativity (good default)
# temperature=1.0 → very creative, sometimes incoherent

# Model size vs capability
# GPT-2:  1.5B params  → basic text, often incoherent
# GPT-3:  175B params  → few-shot capable, good general tasks
# GPT-4:  ~1T params   → reasoning, complex tasks, multimodal

# RLHF pipeline:
# 1. Pretrain on internet text (predict next token)
# 2. Fine-tune on demonstration data (supervised)
# 3. Train reward model from human preference rankings
# 4. Optimize LLM against reward model via PPO`
      },
      "Prompt Engineering": {
        explanation: "Prompt engineering is the practice of crafting effective inputs to get high-quality, reliable outputs from LLMs. It is a critical skill because the same model can give vastly different results depending on how you phrase the request.",
        details: [
          "Zero-shot: direct question with no examples — relies on model's pretrained knowledge",
          "One-shot: one example before the actual request",
          "Few-shot: 2–5 examples to demonstrate the desired pattern",
          "Chain-of-thought: ask model to 'think step by step' — dramatically improves reasoning",
          "Role prompting: assign a persona ('You are an expert Python developer...')",
          "System prompt: persistent instructions shaping all responses in a session",
          "Structured output: ask for JSON, XML, or specific formats for downstream use"
        ],
        example: `// ZERO-SHOT
"Classify the sentiment of: 'This product is terrible!'"
// Output: Negative

// ONE-SHOT
"Classify sentiment:
'I love this!' → Positive
'The battery died after 2 hours.' → "
// Output: Negative

// FEW-SHOT
"Translate English to SQL:
'Find all users' → SELECT * FROM users;
'Count products' → SELECT COUNT(*) FROM products;
'List orders from 2024' → "
// Output: SELECT * FROM orders WHERE YEAR(created_at)=2024;

// CHAIN-OF-THOUGHT
"A store had 45 apples. They sold 30% on Monday and 12 on Tuesday.
How many remain? Think step by step."
// Step 1: 30% of 45 = 13.5 → sold ~14 on Monday
// Step 2: Remaining: 45 - 14 = 31
// Step 3: After Tuesday: 31 - 12 = 19 apples

// ROLE PROMPTING
"You are a senior security engineer conducting a code review.
Identify SQL injection vulnerabilities and suggest parameterized fixes."

// STRUCTURED OUTPUT
"Analyze this code and return ONLY valid JSON:
{
  'issues': [...],
  'severity': 'low|medium|high',
  'fixed_code': '...'
}"

// BAD vs GOOD prompt
Bad:  "Write code"
Good: "Write a Python function that takes a list of integers,
       removes duplicates, sorts in descending order, and returns
       the result. Include type hints and a docstring."

// Prompt template (LangChain style)
from langchain.prompts import ChatPromptTemplate
prompt = ChatPromptTemplate.from_template(
    "You are a {role}. Explain {concept} to a {audience}."
)
formatted = prompt.format_messages(
    role="teacher", concept="recursion", audience="10-year-old"
)`
      },
      "Generative Models": {
        explanation: "Generative models are the architectural families that power content generation. Three main types dominate: GANs (adversarial), VAEs (variational), and Diffusion Models (noise-based). Each has different strengths.",
        details: [
          "GAN: Generator + Discriminator compete — G creates fakes, D distinguishes real/fake",
          "VAE: encodes data into latent space distribution, decodes to generate new samples",
          "Diffusion: gradually adds noise to data, then learns to reverse the process",
          "Diffusion models power: Stable Diffusion, DALL·E 3, Midjourney, Sora",
          "GANs power: deepfakes, face generation, image-to-image translation",
          "VAEs used for: representation learning, anomaly detection, compression"
        ],
        example: `# ── GANs (Generative Adversarial Networks) ──
import torch
import torch.nn as nn

class Generator(nn.Module):
    def __init__(self, z_dim=100):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(z_dim, 256),
            nn.ReLU(),
            nn.Linear(256, 784),   # 28×28 = 784 pixels
            nn.Tanh()              # output in [-1, 1]
        )
    def forward(self, z):
        return self.net(z)         # noise → fake image

class Discriminator(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(784, 256),
            nn.LeakyReLU(0.2),
            nn.Linear(256, 1),
            nn.Sigmoid()           # 0=fake, 1=real
        )
    def forward(self, x):
        return self.net(x)

# Training: adversarial game
# D tries to maximize: log D(real) + log(1 - D(G(z)))
# G tries to minimize: log(1 - D(G(z)))  ← fool D
# Nash equilibrium: G generates perfect fakes

# ── VAE (Variational Autoencoder) ──
class VAE(nn.Module):
    def encode(self, x):
        h = self.encoder(x)
        mu = self.fc_mu(h)       # mean of latent distribution
        logvar = self.fc_var(h)  # variance
        return mu, logvar

    def reparameterize(self, mu, logvar):
        std = torch.exp(0.5 * logvar)
        eps = torch.randn_like(std)
        return mu + eps * std    # sample from N(mu, std)

    def decode(self, z):
        return self.decoder(z)   # latent → reconstructed image

# ── Diffusion Model (conceptual) ──
# Forward process: add Gaussian noise step by step
# x₀ (clean) → x₁ (slight noise) → ... → xT (pure noise)

# Reverse process (what the model learns):
# xT (pure noise) → ... → x₁ → x₀ (clean image)

# UNet predicts the noise ε added at each step
# Loss: ||ε - ε_θ(xₜ, t)||²

# Text-to-image with diffusion:
from diffusers import StableDiffusionPipeline
pipe = StableDiffusionPipeline.from_pretrained("stabilityai/sdxl-turbo")
image = pipe("A futuristic city at sunset, cyberpunk style").images[0]`
      },
      "Training Concepts": {
        explanation: "Understanding how AI models are trained is essential for working with them effectively. The training pipeline — from raw data to an aligned, capable model — involves several distinct stages.",
        details: [
          "Dataset: curated collection of (input, output) pairs or raw text",
          "Pretraining: train from scratch on massive unlabeled data (billions of tokens)",
          "Fine-tuning: continue training pretrained model on smaller, task-specific dataset",
          "Transfer learning: use knowledge from one domain to bootstrap another",
          "RLHF: human raters rank outputs → reward model → optimize LLM via PPO",
          "DPO (Direct Preference Optimization): newer alternative to RLHF, more stable",
          "SFT (Supervised Fine-Tuning): first RLHF step — train on human demonstrations"
        ],
        example: `# Full LLM training pipeline

# STAGE 1: Pretraining (self-supervised)
# Dataset: Common Crawl, Books, Wikipedia, GitHub, etc.
# Objective: predict next token
# Duration: weeks to months on thousands of GPUs
# Result: base model (knows language but not how to chat)

# Example: GPT-3 pretrained on 570GB of text
# 300 billion tokens, 175B parameters

# STAGE 2: Supervised Fine-Tuning (SFT)
# Dataset: human-written (prompt, response) pairs
sft_data = [
    {"prompt": "Explain gravity in simple terms",
     "response": "Gravity is the force that pulls..."},
    {"prompt": "Write Python code to reverse a string",
     "response": "def reverse(s):\n    return s[::-1]"},
]
# Result: instruction-following model

# STAGE 3: RLHF
# Step A: collect preference data
prefs = [
    {"prompt": "...", "chosen": "Great response", "rejected": "Bad response"}
]
# Step B: train reward model (predicts which response is better)
# Step C: optimize LLM using PPO (Proximal Policy Optimization)
#   reward = reward_model(response) - KL_penalty(vs_original_model)

# Transfer Learning — fine-tune BERT for classification
from transformers import BertForSequenceClassification, Trainer
model = BertForSequenceClassification.from_pretrained(
    "bert-base-uncased",  # pretrained on Wikipedia+Books
    num_labels=2          # adapt output for binary classification
)
trainer = Trainer(model=model, train_dataset=your_data)
trainer.train()

# Parameter-Efficient Fine-Tuning (LoRA)
# Instead of updating all 7B params, update only ~1M adapter params
# 100x cheaper, same quality!`
      },
      "Embeddings & Vector DBs": {
        explanation: "Embeddings convert text (or images, audio) into dense numerical vectors where semantic similarity maps to geometric proximity. Vector databases efficiently store and search these embeddings, enabling semantic search at scale.",
        details: [
          "Word embedding: each word → fixed-size float vector (e.g., 1536 dimensions)",
          "Semantic similarity: similar meaning → small cosine distance in vector space",
          "Classic: king - man + woman ≈ queen (vector arithmetic works!)",
          "Sentence embeddings: entire sentences as vectors (OpenAI ada-002, Sentence-BERT)",
          "Vector search: find k-nearest neighbors by cosine/dot-product similarity (ANN)",
          "Popular vector DBs: Pinecone (managed), FAISS (local), ChromaDB (open-source)",
          "Use in RAG: embed docs, embed query, find closest docs, feed to LLM"
        ],
        example: `# Create embeddings with OpenAI
from openai import OpenAI
import numpy as np

client = OpenAI()

def embed(text):
    response = client.embeddings.create(
        model="text-embedding-3-small",  # 1536 dimensions
        input=text
    )
    return np.array(response.data[0].embedding)

# Semantic similarity
v1 = embed("The dog runs in the park")
v2 = embed("A puppy is jogging outside")
v3 = embed("Python list comprehension syntax")

def cosine_sim(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print(cosine_sim(v1, v2))  # ~0.92 (very similar)
print(cosine_sim(v1, v3))  # ~0.21 (unrelated)

# Vector DB with ChromaDB (local)
import chromadb

client = chromadb.Client()
collection = client.create_collection("my_docs")

collection.add(
    documents=["AI is transforming healthcare",
               "Python is a popular language",
               "Neural networks learn from data"],
    ids=["doc1", "doc2", "doc3"]
)

# Semantic search — finds by MEANING, not keywords!
results = collection.query(
    query_texts=["machine learning"],
    n_results=2
)
# Returns: ["Neural networks learn from data",
#           "AI is transforming healthcare"]

# Pinecone (managed, production-scale)
import pinecone
pinecone.init(api_key="YOUR_KEY", environment="us-east1")
index = pinecone.Index("my-index")
index.upsert([("id1", embedding_vector, {"source": "doc1"})])
results = index.query(vector=query_embedding, top_k=5)`
      },
      "RAG": {
        explanation: "Retrieval-Augmented Generation (RAG) grounds LLM responses in retrieved documents, dramatically reducing hallucinations and enabling use of private or up-to-date knowledge without expensive retraining.",
        details: [
          "Problem: LLMs have knowledge cutoffs and hallucinate confidently",
          "Solution: retrieve relevant docs at query time → inject into context → LLM answers from facts",
          "Indexing phase: chunk docs → embed → store in vector DB (done once)",
          "Query phase: embed query → find similar chunks → build prompt → LLM generates",
          "Chunk size: 200–500 tokens typical; too small = missing context, too large = dilutes relevance",
          "Advantages: accurate, private, updatable, explainable (can cite sources)",
          "Advanced: re-ranking, multi-hop retrieval, HyDE (hypothetical document embeddings)"
        ],
        example: `# Full RAG pipeline with LangChain
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import Chroma
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA

# ── INDEXING (done once) ──────────────────────────
loader = PyPDFLoader("company_policy.pdf")
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50  # avoid losing info at chunk boundaries
)
chunks = splitter.split_documents(documents)

embeddings = OpenAIEmbeddings()
vectorstore = Chroma.from_documents(chunks, embeddings)

# ── QUERYING (every user request) ────────────────
query = "What is our parental leave policy?"

relevant_chunks = vectorstore.similarity_search(query, k=3)

context = "\\n\\n".join([c.page_content for c in relevant_chunks])
augmented_prompt = f"""
You are a helpful HR assistant. Answer based ONLY on the
provided context. If not in context, say "I don't know."

Context:
{context}

Question: {query}
"""

llm = ChatOpenAI(model="gpt-4")
answer = llm.invoke(augmented_prompt)

# ── One-liner with RetrievalQA chain ─────────────
qa_chain = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(),
    retriever=vectorstore.as_retriever(search_kwargs={"k": 3})
)
result = qa_chain.run("What is the refund policy?")`
      },
      "AI Agents": {
        explanation: "AI Agents are LLM-powered systems that autonomously plan, reason, use tools, and take multi-step actions to accomplish goals — going beyond single-turn question answering.",
        details: [
          "Core loop: Observe → Think/Plan → Act → Observe results → Repeat",
          "Tools: web search, code execution, file access, APIs, database queries",
          "ReAct pattern: Reason + Act interleaved — model explains before acting",
          "Multi-agent: specialized agents collaborate (planner, coder, critic, researcher)",
          "Memory: short-term (context window) + long-term (vector DB) + episodic",
          "Examples: coding agents (Devin, Claude Code), research agents, computer-use agents"
        ],
        example: `# AI Agent with LangChain (ReAct pattern)
from langchain.agents import create_react_agent, AgentExecutor
from langchain.tools import DuckDuckGoSearchRun, WikipediaQueryRun
from langchain.tools import PythonREPLTool
from langchain.chat_models import ChatOpenAI

tools = [
    DuckDuckGoSearchRun(),   # web search
    WikipediaQueryRun(),     # Wikipedia
    PythonREPLTool()         # run Python code
]

llm = ChatOpenAI(model="gpt-4", temperature=0)
agent = create_react_agent(llm, tools, prompt=REACT_PROMPT)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

result = executor.invoke({
    "input": "What is the population of Tokyo and how does it compare "
             "to New York? Calculate the ratio."
})

# Agent's internal monologue (ReAct):
# Thought: I need to find Tokyo's population first
# Action: search("Tokyo population 2024")
# Observation: "Tokyo population is approximately 14 million..."
# Thought: Now I need New York's population
# Action: search("New York City population 2024")
# Observation: "New York City population is approximately 8.3 million..."
# Thought: Now I can calculate the ratio
# Action: python_repl("14000000 / 8300000")
# Observation: 1.6867...
# Final Answer: Tokyo (14M) is ~1.69x larger than New York (8.3M)

# Multi-Agent system (AutoGen style)
from autogen import AssistantAgent, UserProxyAgent

planner = AssistantAgent("Planner", system_message="Break tasks into steps")
coder   = AssistantAgent("Coder",   system_message="Write and debug code")
critic  = AssistantAgent("Critic",  system_message="Review and improve output")
# Agents collaborate asynchronously to complete complex tasks`
      },
      "Hallucinations": {
        explanation: "LLM hallucinations occur when models generate confident but factually incorrect content. Understanding why they happen and how to mitigate them is critical for production AI systems.",
        details: [
          "Factual hallucination: wrong facts stated with confidence ('Einstein said...')",
          "Source hallucination: fabricated citations to non-existent papers/books",
          "Causes: pattern completion over memorized facts, gaps in training data",
          "High temperature → more creative but more hallucination-prone",
          "Mitigation: RAG, grounding, citation requirements, self-consistency checks",
          "Constitutional AI: model trained to critique and revise its own outputs",
          "Detection: fact-checking pipelines, search verification, retrieval comparison"
        ],
        example: `# EXAMPLES OF HALLUCINATIONS (illustrating the problem)

# Factual hallucination
user: "When did Einstein publish his theory of quantum computing?"
llm:  "Einstein published his groundbreaking paper on quantum
       computing in 1932, titled 'Uber die Quantenmechanische
       Berechnung'."
# WRONG: Einstein never worked on quantum computing.
# The paper title and date are completely fabricated.

# Source hallucination
user: "Give me sources on transformer architecture"
llm:  "See Vaswani et al. (2017) ✓ ... and also Smith & Jones
       (2019) 'Advanced Transformer Variants' in IEEE Trans..."
# 'Smith & Jones 2019' may be completely fabricated!

# ── MITIGATION STRATEGIES ──────────────────────────

# 1. RAG (most effective) — ground answers in retrieved facts
context = retrieve_relevant_docs(query)
prompt = f"Answer ONLY using this context:\\n{context}\\n\\nQuestion: {query}"

# 2. Force citation
prompt = """Answer the question. For every claim, cite:
[Source: document_name, section X]
If you cannot cite it, say 'I don't have a source for this.'"""

# 3. Temperature = 0 (more deterministic)
response = client.chat.completions.create(
    model="gpt-4", temperature=0.0)

# 4. Self-consistency (sample multiple, vote)
responses = [llm(prompt) for _ in range(5)]
# Check if answers agree; flag disagreements

# 5. Post-generation verification pipeline
answer = llm(question)
claims = extract_claims(answer)
for claim in claims:
    evidence = web_search(claim)
    if not verify(claim, evidence):
        answer = revise(answer, claim)`
      },
      "Evaluation Metrics": {
        explanation: "Evaluating AI models requires different metrics depending on the task. Classification metrics measure prediction accuracy; generation metrics measure output quality for text generation tasks.",
        details: [
          "Accuracy: fraction of correct predictions — misleading on imbalanced datasets",
          "Precision: of all predicted positives, how many are truly positive",
          "Recall: of all actual positives, how many did we catch",
          "F1-score: harmonic mean of precision and recall — balanced metric",
          "BLEU: n-gram overlap between generated and reference text (translation quality)",
          "Perplexity: how well a language model predicts a text — lower = better",
          "ROUGE: recall-based n-gram overlap used for summarization quality"
        ],
        example: `from sklearn.metrics import (accuracy_score, precision_score,
                              recall_score, f1_score)

y_true = [1, 0, 1, 1, 0, 1, 0]
y_pred = [1, 0, 1, 0, 0, 1, 1]

acc  = accuracy_score(y_true, y_pred)   # 5/7 = 0.714
prec = precision_score(y_true, y_pred)  # TP/(TP+FP) = 3/4 = 0.75
rec  = recall_score(y_true, y_pred)     # TP/(TP+FN) = 3/4 = 0.75
f1   = f1_score(y_true, y_pred)         # 2*P*R/(P+R) = 0.75

# Confusion matrix
#                Predicted
#              Pos    Neg
# Actual Pos  [TP=3] [FN=1]   ← recall  = TP/(TP+FN)
#        Neg  [FP=1] [TN=2]   ← precision = TP/(TP+FP)

# BLEU score (translation quality)
from nltk.translate.bleu_score import sentence_bleu
reference  = [["the", "cat", "is", "on", "the", "mat"]]
hypothesis =  ["the", "cat", "sat", "on", "the", "mat"]
bleu = sentence_bleu(reference, hypothesis)
# ~0.83 (good overlap; only "is"→"sat" differs)

# Perplexity — lower is better
# PP(W) = P(w₁,w₂,...,wₙ)^(-1/N)
# Equivalent to: exp(cross-entropy loss)
import torch, torch.nn.functional as F

def perplexity(logits, targets):
    loss = F.cross_entropy(logits, targets)
    return torch.exp(loss).item()

# GPT-2 perplexity on Penn Treebank: ~29
# GPT-4 perplexity: ~3–10 on common text

# ROUGE (summarization)
from rouge_score import rouge_scorer
scorer = rouge_scorer.RougeScorer(['rouge1', 'rouge2', 'rougeL'])
scores = scorer.score("reference summary", "generated summary")
# rouge1: unigram overlap
# rouge2: bigram overlap
# rougeL: longest common subsequence`
      },
      "Model Comparison": {
        explanation: "Different neural architectures are suited to different data types and tasks. Understanding when to use CNN, RNN, LSTM, or Transformer is fundamental for AI engineering.",
        details: [
          "CNN: spatial pattern recognition — images, not sequential by nature",
          "RNN: sequential data — processes token by token, maintains hidden state",
          "LSTM: Long Short-Term Memory — solves RNN's vanishing gradient via gating",
          "Transformer: parallel attention over full sequence — now dominant for most tasks",
          "CNN + Transformer hybrid: Vision Transformers (ViT) for image understanding",
          "LSTM still used in: time-series forecasting, edge devices (lower compute)",
          "Transformers replaced RNNs/LSTMs for NLP tasks from ~2018 onward"
        ],
        example: `# CNN — for image classification
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, kernel_size=3)   # detect edges
        self.conv2 = nn.Conv2d(32, 64, kernel_size=3)  # detect shapes
        self.pool  = nn.MaxPool2d(2, 2)                # downsample
        self.fc    = nn.Linear(64*6*6, 10)             # classify

# RNN — basic sequence model
class RNN(nn.Module):
    def __init__(self):
        super().__init__()
        self.rnn = nn.RNN(input_size=50, hidden_size=100, batch_first=True)
    # Problem: can't remember long sequences (gradient vanishes)
    # h_t = tanh(W_h * h_{t-1} + W_x * x_t)

# LSTM — solves vanishing gradient with gates
class LSTM(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(input_size=50, hidden_size=100, batch_first=True)
    # Forget gate:  what to forget from previous state
    # Input gate:   what new info to add
    # Output gate:  what to output
    # Cell state:   long-term memory highway

# Transformer — parallel attention (dominant today)
from transformers import AutoModel
model = AutoModel.from_pretrained("bert-base-uncased")

# ── COMPARISON TABLE ──────────────────────────────────
# Model       | Best For           | Parallel | Long-range
# CNN         | Images, 1D signals | Yes      | Limited
# RNN         | Short sequences    | No       | Poor
# LSTM        | Medium sequences   | No       | Good
# Transformer | Any sequence/text  | Yes      | Excellent
#
# When to use (2024 guide):
# Images:           CNN for efficiency, ViT for best quality
# Time-series:      LSTM or Transformer
# NLP (all tasks):  Transformer
# Resource-limited: CNN or small LSTM
# State-of-the-art: Transformer variants`
      }
    }
  }
};

export default generativeAIData;
