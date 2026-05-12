const aiMlGenaiData = {
  "AI / ML / GenAI": {
    icon: "ti-brain",
    color: "#A32D2D",
    topics: {
      "Machine Learning": {
        explanation: "Machine Learning is a subset of AI where systems learn from data to make predictions or decisions without being explicitly programmed for each task. It relies on statistical methods to find patterns in data and generalize to new, unseen inputs.",
        details: [
          "Supervised: labeled data — Classification (discrete output: spam/not-spam) and Regression (continuous output: house price)",
          "Unsupervised: unlabeled data — Clustering (K-Means, DBSCAN), Dimensionality Reduction (PCA, t-SNE), Anomaly Detection",
          "Semi-supervised: small labeled set + large unlabeled set — common in real-world where labeling is expensive",
          "Self-supervised: model creates its own labels from raw data (e.g., predicting masked words — used in BERT)",
          "Reinforcement Learning: agent learns by taking actions in an environment, receiving rewards/penalties (e.g., AlphaGo, robotics)",
          "Train/Val/Test split: train=60-70%, validation=15-20%, test=15-20%; validation tunes hyperparams, test gives final unbiased score",
          "Overfitting: model memorizes training data, fails on new data → fix with regularization, dropout, more data, early stopping",
          "Underfitting: model too simple to capture patterns → fix with more features, more complex model, longer training",
          "Bias-Variance Tradeoff: high bias = underfitting; high variance = overfitting; goal is to minimize both",
          "Cross-validation: k-fold CV splits data into k folds, trains k times, averages score — reduces evaluation variance",
          "Feature Engineering: creating, selecting, and transforming input features is often more impactful than model choice",
          "Normalization vs Standardization: normalize to [0,1] (MinMaxScaler); standardize to mean=0, std=1 (StandardScaler)"
        ],
        example: `from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.model_selection import train_test_split, cross_val_score, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, confusion_matrix, classification_report
import numpy as np

# ── Supervised: Regression ──────────────────────────────────
X = np.array([[1],[2],[3],[4],[5]])
y = np.array([150, 250, 300, 400, 500])
model = LinearRegression()
model.fit(X, y)
print(model.predict([[6]]))          # ~580
print("R² score:", model.score(X, y))

# ── Supervised: Classification ──────────────────────────────
from sklearn.datasets import load_iris
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42)

scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test  = scaler.transform(X_test)          # NEVER fit on test set!

clf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)
clf.fit(X_train, y_train)
y_pred = clf.predict(X_test)
print(accuracy_score(y_test, y_pred))
print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

# ── Cross-Validation ────────────────────────────────────────
scores = cross_val_score(clf, iris.data, iris.target, cv=5)
print(f"CV Accuracy: {scores.mean():.3f} ± {scores.std():.3f}")

# ── Hyperparameter Tuning ───────────────────────────────────
param_grid = {'n_estimators': [50, 100], 'max_depth': [3, 5, None]}
grid = GridSearchCV(RandomForestClassifier(), param_grid, cv=5)
grid.fit(X_train, y_train)
print("Best params:", grid.best_params_)

# ── Unsupervised: Clustering ────────────────────────────────
kmeans = KMeans(n_clusters=3, random_state=42)
labels = kmeans.fit_predict(iris.data)
print("Cluster labels:", labels[:10])

# DBSCAN — no need to specify k, handles noise
db = DBSCAN(eps=0.5, min_samples=5)
labels_db = db.fit_predict(iris.data)
print("DBSCAN labels:", np.unique(labels_db))  # -1 = noise

# ── Dimensionality Reduction ────────────────────────────────
pca = PCA(n_components=2)
X_2d = pca.fit_transform(iris.data)
print("Explained variance:", pca.explained_variance_ratio_)

# ── Regularization (prevent overfitting) ───────────────────
from sklearn.linear_model import Ridge, Lasso, ElasticNet
ridge   = Ridge(alpha=1.0)       # L2: shrinks all weights
lasso   = Lasso(alpha=0.1)       # L1: drives some weights to 0 (feature selection)
elastic = ElasticNet(alpha=0.1, l1_ratio=0.5)  # mix of L1 + L2

# ── Evaluation Metrics ──────────────────────────────────────
# Accuracy  = correct / total           (good for balanced classes)
# Precision = TP / (TP + FP)            (important when FP is costly)
# Recall    = TP / (TP + FN)            (important when FN is costly)
# F1        = 2*(P*R)/(P+R)             (balance precision & recall)
# ROC-AUC   = area under ROC curve      (threshold-independent)
# MSE/RMSE/MAE                          (regression metrics)
from sklearn.metrics import roc_auc_score, mean_squared_error
`
      },
      "Neural Networks": {
        explanation: "Neural networks are ML models inspired by the brain's structure. Layers of interconnected neurons (perceptrons) learn by adjusting connection weights through backpropagation and gradient descent. Deep learning = many layers (deep networks).",
        details: [
          "Perceptron: input → weighted sum → activation → output; the fundamental building block",
          "Layers: Input layer (raw data), Hidden layers (feature extraction), Output layer (prediction)",
          "Activation functions: ReLU (max(0,x), most common), Sigmoid (0–1 for binary), Tanh (-1 to 1), Softmax (multiclass probabilities), Leaky ReLU (fixes dying ReLU problem)",
          "Loss functions: MSE for regression, Cross-Entropy for classification, Binary Cross-Entropy for binary output",
          "Backpropagation: compute gradient of loss w.r.t. each weight using chain rule, propagate error backwards",
          "Gradient Descent variants: SGD (noisy but fast), Mini-batch GD (standard), Adam (adaptive lr, most popular)",
          "Learning rate: too high → overshoots minimum; too low → slow convergence; use lr schedulers",
          "Batch Normalization: normalize activations between layers → faster training, less sensitive to initialization",
          "Dropout: randomly zero out neurons during training → prevents overfitting (p=0.2–0.5 typical)",
          "Weight initialization: Xavier/Glorot for tanh; He initialization for ReLU",
          "CNN (Convolutional): for image data — uses conv filters, pooling layers, translation invariant",
          "RNN/LSTM/GRU: for sequential data (text, time series) — maintains hidden state, handles variable-length input",
          "Transformer: attention-based, parallelizable, dominates NLP; also used in vision (ViT)",
          "Epochs vs Batches: one epoch = full pass through dataset; batch = subset processed per weight update"
        ],
        example: `import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader, TensorDataset
import numpy as np

# ── Basic Feedforward Network ───────────────────────────────
class FeedForward(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim, dropout=0.3):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),       # normalize activations
            nn.ReLU(),
            nn.Dropout(dropout),              # prevent overfitting
            nn.Linear(hidden_dim, hidden_dim // 2),
            nn.BatchNorm1d(hidden_dim // 2),
            nn.ReLU(),
            nn.Dropout(dropout),
            nn.Linear(hidden_dim // 2, output_dim)
        )
    def forward(self, x):
        return self.net(x)

model = FeedForward(784, 256, 10, dropout=0.3)

# ── Loss & Optimizer ────────────────────────────────────────
criterion = nn.CrossEntropyLoss()           # for multiclass
# criterion = nn.BCEWithLogitsLoss()        # for binary
# criterion = nn.MSELoss()                  # for regression

optimizer = optim.Adam(model.parameters(), lr=1e-3, weight_decay=1e-4)
# weight_decay = L2 regularization built-in

scheduler = optim.lr_scheduler.StepLR(optimizer, step_size=10, gamma=0.5)
# halve lr every 10 epochs

# ── Training Loop ───────────────────────────────────────────
def train(model, loader, criterion, optimizer, epochs=20):
    model.train()
    for epoch in range(epochs):
        total_loss, correct = 0, 0
        for X_batch, y_batch in loader:
            optimizer.zero_grad()            # clear previous gradients
            outputs = model(X_batch)
            loss = criterion(outputs, y_batch)
            loss.backward()                  # backpropagation
            torch.nn.utils.clip_grad_norm_(model.parameters(), 1.0)  # gradient clipping
            optimizer.step()                 # update weights
            total_loss += loss.item()
            correct += (outputs.argmax(1) == y_batch).sum().item()
        scheduler.step()
        print(f"Epoch {epoch+1}: Loss={total_loss/len(loader):.4f}, Acc={correct/len(loader.dataset):.4f}")

# ── CNN for Image Classification ────────────────────────────
class ConvNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),  # 28→28
            nn.ReLU(),
            nn.MaxPool2d(2),                              # 28→14
            nn.Conv2d(32, 64, kernel_size=3, padding=1), # 14→14
            nn.ReLU(),
            nn.MaxPool2d(2),                              # 14→7
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Dropout(0.5),
            nn.Linear(128, 10)
        )
    def forward(self, x):
        return self.classifier(self.features(x))

# ── LSTM for Sequence Data ──────────────────────────────────
class LSTMClassifier(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_layers, output_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(embed_dim, hidden_dim, num_layers,
                            batch_first=True, dropout=0.3, bidirectional=True)
        self.fc = nn.Linear(hidden_dim * 2, output_dim)  # *2 for bidirectional
    def forward(self, x):
        embedded = self.embedding(x)
        out, (hidden, _) = self.lstm(embedded)
        return self.fc(torch.cat([hidden[-2], hidden[-1]], dim=1))

# ── Activation Function Comparison ─────────────────────────
# ReLU:       f(x) = max(0, x)         — dying neuron problem
# Leaky ReLU: f(x) = max(0.01x, x)    — fixes dying neurons
# Sigmoid:    f(x) = 1/(1+e^-x)       — saturates (vanishing grad)
# Tanh:       f(x) = (e^x-e^-x)/(e^x+e^-x) — zero-centered
# Softmax:    normalizes to probability distribution (output layer)
# GELU:       used in transformers (GPT, BERT)

# ── Saving & Loading ────────────────────────────────────────
torch.save(model.state_dict(), 'model.pth')
model.load_state_dict(torch.load('model.pth'))
model.eval()   # disable dropout/batchnorm during inference
`
      },
      "LLMs": {
        explanation: "Large Language Models are transformer-based neural networks trained on massive text corpora to understand and generate human language. They learn by predicting the next token and generalize to tasks never seen during training via in-context learning.",
        details: [
          "Transformer architecture: self-attention allows each token to attend to all others; parallelizable unlike RNNs",
          "Self-attention: Q (Query), K (Key), V (Value) matrices — attention = softmax(QKᵀ/√d)V",
          "Multi-head attention: multiple attention heads capture different relationship types simultaneously",
          "Positional encoding: injects sequence order since attention is permutation-invariant",
          "Pre-training: predict next token (GPT-style autoregressive) or masked tokens (BERT-style masked LM) on trillions of tokens",
          "Tokenization: text split into subword tokens (BPE, WordPiece); 'unhappiness' → ['un', 'happiness']",
          "Context window: max tokens model can process at once (GPT-4: 128k, Claude: 200k); longer = more memory",
          "Temperature: controls randomness — 0=deterministic (always top token), 1=sampling distribution, >1=more random",
          "Top-p (nucleus sampling): sample from smallest set of tokens whose cumulative prob ≥ p",
          "Top-k: sample from top k most probable tokens only",
          "Fine-tuning: continue training on domain-specific data to specialize behavior (e.g., medical, legal)",
          "RLHF: Reinforcement Learning from Human Feedback — train reward model on human preferences, then use PPO to optimize",
          "PEFT/LoRA: Parameter-Efficient Fine-Tuning — only train small adapter weights, not full model (much cheaper)",
          "Emergent abilities: capabilities that appear unexpectedly at scale (chain-of-thought, arithmetic, translation)",
          "Hallucination root cause: models predict plausible tokens, not truth; no internal fact-checking mechanism",
          "System prompt: hidden instructions that shape model behavior before user messages"
        ],
        example: `import anthropic
from openai import OpenAI
import tiktoken

# ── Claude API (Anthropic) ──────────────────────────────────
client = anthropic.Anthropic()

# Basic completion
response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1024,
    temperature=0.7,           # 0=deterministic, 1=balanced, >1=creative
    system="You are a concise technical assistant. Use bullet points.",
    messages=[
        {"role": "user", "content": "Explain transformers."}
    ]
)
print(response.content[0].text)
print(f"Input tokens: {response.usage.input_tokens}")
print(f"Output tokens: {response.usage.output_tokens}")

# Multi-turn conversation
conversation = []
def chat(user_msg):
    conversation.append({"role": "user", "content": user_msg})
    res = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        messages=conversation
    )
    assistant_msg = res.content[0].text
    conversation.append({"role": "assistant", "content": assistant_msg})
    return assistant_msg

# Streaming response
with client.messages.stream(
    model="claude-opus-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Write a haiku."}]
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)

# ── OpenAI API ──────────────────────────────────────────────
oai = OpenAI()
response = oai.chat.completions.create(
    model="gpt-4o",
    temperature=0.5,
    top_p=0.9,              # nucleus sampling
    max_tokens=500,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user",   "content": "What is backpropagation?"}
    ]
)
print(response.choices[0].message.content)

# ── Token Counting ──────────────────────────────────────────
enc = tiktoken.encoding_for_model("gpt-4")
tokens = enc.encode("Hello, world!")
print(f"Token count: {len(tokens)}")    # 4
# Rule of thumb: 1 token ≈ 0.75 words ≈ 4 chars in English

# ── Structured Output / JSON Mode ──────────────────────────
response = oai.chat.completions.create(
    model="gpt-4o",
    response_format={"type": "json_object"},   # forces valid JSON
    messages=[{
        "role": "user",
        "content": "List 3 planets as JSON with name and diameter_km."
    }]
)
import json
data = json.loads(response.choices[0].message.content)

# ── Function / Tool Calling ─────────────────────────────────
tools = [{
    "type": "function",
    "function": {
        "name": "get_weather",
        "description": "Get current weather for a city",
        "parameters": {
            "type": "object",
            "properties": {
                "city": {"type": "string"},
                "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["city"]
        }
    }
}]

response = oai.chat.completions.create(
    model="gpt-4o",
    tools=tools,
    messages=[{"role": "user", "content": "What's the weather in Tokyo?"}]
)
# Model returns tool_call → you execute function → send result back → model responds

# ── Transformer Self-Attention (conceptual) ─────────────────
import torch, torch.nn.functional as F

def self_attention(Q, K, V, mask=None):
    d_k = Q.size(-1)
    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)
    if mask is not None:
        scores = scores.masked_fill(mask == 0, -1e9)
    weights = F.softmax(scores, dim=-1)      # attention weights
    return torch.matmul(weights, V)          # weighted value sum
`
      },
      "Prompt Engineering": {
        explanation: "Prompt engineering is the art and science of designing effective inputs for LLMs to elicit desired, high-quality outputs. It is the primary interface between humans and language models, and small changes in phrasing can dramatically change outputs.",
        details: [
          "Zero-shot: ask directly with no examples — works for simple tasks models understand well",
          "Few-shot: provide 2–8 examples in prompt — dramatically improves accuracy on specific formats",
          "Chain-of-Thought (CoT): ask model to 'think step by step' — unlocks reasoning on math/logic problems",
          "Zero-shot CoT: append 'Let's think step by step.' — surprisingly effective without examples",
          "Self-consistency: generate multiple CoT answers, take majority vote — improves reliability",
          "Tree of Thoughts (ToT): explore multiple reasoning paths, evaluate and prune — best for complex problems",
          "Role prompting: 'You are an expert in X' — primes model to use domain-specific knowledge and tone",
          "Instruction following: be explicit and specific; avoid ambiguity; state what you DON'T want",
          "Output formatting: specify JSON, markdown, bullet points, table, or exact schema in the prompt",
          "Negative examples: show the model what NOT to do alongside what to do",
          "Delimiters: use XML tags, triple backticks, or headers to clearly separate sections of the prompt",
          "Temperature guidance: use 0 for factual/deterministic tasks, 0.7 for balanced, >0.9 for creative",
          "Persona + Audience: 'Explain to a 10-year-old' or 'Write for senior engineers' shapes vocabulary and depth",
          "Prompt injection awareness: untrusted input can hijack instructions — always sanitize user content",
          "System prompt vs User prompt: system sets behavior/persona; user provides the task"
        ],
        example: `// ── Zero-shot ───────────────────────────────────────────────
"Classify this review as Positive, Negative, or Neutral:
'The battery dies after 3 hours.'"
// Output: Negative

// ── Few-shot (more accurate, consistent format) ─────────────
"Classify sentiment:
Input: 'Terrible product.'         → Negative
Input: 'I absolutely love it!'     → Positive
Input: 'Not bad, could be better.' → Neutral
Input: 'This is absolutely wonderful!' → "
// Output: Positive

// ── Chain-of-Thought ────────────────────────────────────────
"Q: A store had 50 apples. They sold 18 and got a delivery of 
   30 more. How many apples do they have now?
A: Let me think step by step.
   Step 1: Start with 50 apples.
   Step 2: Sold 18 → 50 - 18 = 32 apples.
   Step 3: Delivery of 30 → 32 + 30 = 62 apples.
   Answer: 62 apples."

// ── Zero-shot CoT (just add the magic phrase) ───────────────
"Q: If I have 3 boxes with 8 items each, and I give away 7 items,
   how many items do I have?
A: Let's think step by step."
// Model will reason through before answering

// ── Role Prompting ──────────────────────────────────────────
"You are a senior cybersecurity engineer with 15 years of
 experience in penetration testing. Review this code for
 vulnerabilities and explain each risk clearly:
 [code here]"

// ── Structured Output with Schema ──────────────────────────
"Extract information from the following job posting and return
 ONLY a valid JSON object with this exact schema:
 {
   'title': string,
   'company': string,
   'salary_range': {'min': number, 'max': number} | null,
   'required_skills': string[],
   'remote': boolean
 }
 Do not include any explanation or markdown. Only raw JSON.
 Job posting: [...]"

// ── XML Delimiters for Complex Prompts ─────────────────────
"<instructions>
 You are a code reviewer. Review the code below.
 Focus on: security, performance, and readability.
 Format: use headers for each category.
</instructions>

<code>
def get_user(id):
    query = f'SELECT * FROM users WHERE id = {id}'
    return db.execute(query)
</code>

<output_format>
## Security
## Performance  
## Readability
</output_format>"

// ── Self-Consistency (generate 3, pick majority) ────────────
const responses = await Promise.all([
  llm("Q: Is 17 prime? Think step by step."),
  llm("Q: Is 17 prime? Think step by step."),
  llm("Q: Is 17 prime? Think step by step."),
])
// All three should agree: Yes, 17 is prime.

// ── Negative Instructions ───────────────────────────────────
"Summarize this article.
 - DO: use bullet points, keep under 150 words
 - DO NOT: use the phrase 'the article states'
 - DO NOT: include opinions not present in the text"

// ── Temperature Guide ───────────────────────────────────────
// temperature=0.0  → deterministic, best for code/math/facts
// temperature=0.3  → mostly focused, small variation
// temperature=0.7  → balanced (default for most tasks)
// temperature=1.0  → creative writing, brainstorming
// temperature=1.5+ → very random, experimental
`
      },
      "RAG": {
        explanation: "Retrieval-Augmented Generation (RAG) enhances LLMs by fetching relevant external documents at inference time and injecting them into the prompt. This grounds responses in up-to-date, domain-specific, or private knowledge without retraining the model.",
        details: [
          "Problem solved: LLMs have knowledge cutoffs, may hallucinate, and cannot access private data",
          "Core idea: retrieve relevant chunks from a knowledge base → inject into prompt → LLM answers with grounding",
          "Chunking strategy: split documents into ~256–512 token chunks with overlap (e.g., 50 tokens) to preserve context",
          "Embeddings: convert text to dense vectors (OpenAI ada-002, Cohere, sentence-transformers) — semantically similar texts have close vectors",
          "Vector databases: store and index embeddings for fast similarity search (Chroma, Pinecone, Weaviate, Qdrant, pgvector)",
          "Retrieval: cosine similarity or dot product finds top-k most relevant chunks to the query",
          "Hybrid retrieval: combine vector search (semantic) with BM25 keyword search for best of both worlds",
          "Re-ranking: use a cross-encoder to re-score retrieved chunks before injecting (improves precision)",
          "Query expansion: rephrase or expand the user query to improve retrieval coverage",
          "Hypothetical Document Embeddings (HyDE): generate a hypothetical answer, embed it, use it as retrieval query",
          "Metadata filtering: filter by date, source, category before vector search to improve relevance",
          "Evaluation: measure Faithfulness (is answer supported by context?), Answer Relevance, Context Relevance",
          "Agentic RAG: LLM decides when and what to retrieve, can do multi-hop retrieval",
          "Context window management: retrieved chunks must fit in model's context; prioritize most relevant chunks first"
        ],
        example: `from langchain.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings, HuggingFaceEmbeddings
from langchain.vectorstores import Chroma, FAISS
from langchain.retrievers import BM25Retriever, EnsembleRetriever
from langchain.chat_models import ChatOpenAI
from langchain.chains import RetrievalQA
import anthropic

# ── Step 1: Load & Chunk Documents ─────────────────────────
loader = DirectoryLoader('./docs', glob="**/*.pdf", loader_cls=PyPDFLoader)
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(
    chunk_size=512,        # max tokens per chunk
    chunk_overlap=64,      # overlap to preserve context across chunks
    separators=["\n\n", "\n", ". ", " ", ""]
)
chunks = splitter.split_documents(documents)
print(f"Split into {len(chunks)} chunks")

# ── Step 2: Embed & Store ───────────────────────────────────
# Option A: OpenAI embeddings (1536 dims, paid)
embeddings = OpenAIEmbeddings(model="text-embedding-ada-002")

# Option B: Free local embeddings
# embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

vectorstore = Chroma.from_documents(
    chunks,
    embeddings,
    persist_directory="./chroma_db"   # saves to disk
)

# ── Step 3: Retrieval ───────────────────────────────────────
# Semantic search
retriever_semantic = vectorstore.as_retriever(
    search_type="similarity",
    search_kwargs={"k": 5}
)

# Hybrid: BM25 keyword + semantic vector
retriever_bm25 = BM25Retriever.from_documents(chunks)
retriever_bm25.k = 5

hybrid_retriever = EnsembleRetriever(
    retrievers=[retriever_bm25, retriever_semantic],
    weights=[0.4, 0.6]     # weight semantic more
)

# ── Step 4: RAG Chain ───────────────────────────────────────
llm = ChatOpenAI(model="gpt-4o", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",          # "map_reduce" for many chunks
    retriever=hybrid_retriever,
    return_source_documents=True
)

result = qa_chain("What is the refund policy?")
print(result["result"])
print("Sources:", [d.metadata["source"] for d in result["source_documents"]])

# ── Step 5: Manual RAG with Claude ─────────────────────────
client = anthropic.Anthropic()

def rag_query(user_query: str) -> str:
    # Retrieve
    docs = hybrid_retriever.get_relevant_documents(user_query)
    context = "\n\n---\n\n".join([
        f"[Source: {d.metadata.get('source','unknown')}]\n{d.page_content}"
        for d in docs
    ])

    # Generate
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=1024,
        system="""You are a helpful assistant. Answer ONLY using the 
provided context. If the answer is not in the context, say 
'I don't have that information in my knowledge base.' 
Always cite your source.""",
        messages=[{
            "role": "user",
            "content": f"Context:\n{context}\n\nQuestion: {user_query}"
        }]
    )
    return response.content[0].text

# ── Evaluation (RAGAS) ──────────────────────────────────────
from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision

# faithfulness: is the answer supported by retrieved context?
# answer_relevancy: is the answer relevant to the question?
# context_precision: are retrieved chunks actually useful?

dataset = {
    "question":  ["What is the refund policy?"],
    "answer":    [rag_query("What is the refund policy?")],
    "contexts":  [[d.page_content for d in docs]],
    "ground_truth": ["30-day full refund, no questions asked."]
}
scores = evaluate(dataset, metrics=[faithfulness, answer_relevancy])
print(scores)
`
      },
      "Hallucinations": {
        explanation: "LLM hallucinations occur when a model generates confident but factually incorrect or fabricated information. This is a fundamental limitation of next-token prediction: models generate plausible text, not verified facts. Understanding types and mitigations is critical for production AI systems.",
        details: [
          "Intrinsic hallucination: contradicts the provided source/context (e.g., misquoting a document given in the prompt)",
          "Extrinsic hallucination: cannot be verified against source — model adds unsupported information",
          "Factual hallucination: wrong real-world facts stated confidently ('The Eiffel Tower was built in 1901')",
          "Source hallucination: fabricating citations, papers, URLs, quotes that don't exist",
          "Reasoning hallucination: flawed logical steps that lead to wrong conclusions presented as correct",
          "Root cause: models optimize for token probability, not factual accuracy — plausible ≠ true",
          "Confidence calibration: models often express equal confidence for correct and hallucinated outputs",
          "Mitigation 1 — RAG: ground responses in retrieved, verifiable documents",
          "Mitigation 2 — Temperature 0: deterministic sampling reduces creative fabrication",
          "Mitigation 3 — Force citations: require model to cite sources; if it can't, say 'I don't know'",
          "Mitigation 4 — Self-consistency: sample N times, only accept answers appearing in majority",
          "Mitigation 5 — External verification: check generated facts against external APIs or databases",
          "Mitigation 6 — Constrained output: limit model to choose from provided options (classification vs open-ended)",
          "Mitigation 7 — Reflection/critique: ask model to review its own answer for errors",
          "Detection: use NLI models to check if response is entailed by source; use factuality scorers"
        ],
        example: `import anthropic

client = anthropic.Anthropic()

# ── Strategy 1: RAG Grounding ───────────────────────────────
def grounded_answer(context: str, question: str) -> str:
    return client.messages.create(
        model="claude-opus-4-6",
        max_tokens=512,
        system="""Answer ONLY using the provided context.
If the answer cannot be found in the context, respond with exactly:
'INSUFFICIENT_CONTEXT: I cannot answer this from the provided information.'
Do NOT use any outside knowledge.""",
        messages=[{"role": "user",
                   "content": f"<context>\n{context}\n</context>\n\nQuestion: {question}"}]
    ).content[0].text

# ── Strategy 2: Forced Citations ────────────────────────────
citation_prompt = """
You are a research assistant. For EVERY factual claim you make:
- Add a citation: [Source: doc_name, section/page]
- If you cannot cite it from provided sources, write [UNCITED]
- Any [UNCITED] claim should be prefaced with 'Possibly: '
This makes it clear what is verified vs speculative.
"""

# ── Strategy 3: Self-Consistency Voting ────────────────────
def self_consistent_answer(question: str, n: int = 5) -> str:
    answers = []
    for _ in range(n):
        res = client.messages.create(
            model="claude-opus-4-6",
            max_tokens=256,
            temperature=0.7,   # some variation to sample diverse paths
            messages=[{"role": "user", "content": f"{question}\nThink step by step."}]
        )
        answers.append(res.content[0].text)

    # Extract final answers and take majority
    # (in practice, use an LLM to extract and compare)
    print(f"Generated {n} answers — take the majority:")
    for i, a in enumerate(answers, 1):
        print(f"  [{i}] {a[:100]}...")
    return answers  # return all for manual review

# ── Strategy 4: External Fact Verification ──────────────────
def verify_claim(claim: str, source_of_truth: dict) -> dict:
    """Check generated claim against a known data source"""
    verification_prompt = f"""
    Claim to verify: "{claim}"

    Ground truth data: {source_of_truth}

    Is the claim supported, contradicted, or unverifiable from the data?
    Respond as JSON: {{"verdict": "supported|contradicted|unverifiable", "reason": "..."}}
    """
    result = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=200,
        messages=[{"role": "user", "content": verification_prompt}]
    ).content[0].text
    import json
    return json.loads(result)

# ── Strategy 5: Constrained Output (Reduce Fabrication) ─────
classification_prompt = """
Classify the following customer message into EXACTLY ONE of these categories:
- BILLING_ISSUE
- TECHNICAL_SUPPORT
- FEATURE_REQUEST
- GENERAL_INQUIRY
- COMPLAINT

You MUST choose from the list above. Do not invent new categories.
Customer message: "{message}"
Return ONLY the category name.
"""

# ── Strategy 6: Reflection / Self-Critique ──────────────────
def reflect_and_refine(question: str) -> str:
    # Step 1: Initial answer
    initial = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=512,
        messages=[{"role": "user", "content": question}]
    ).content[0].text

    # Step 2: Critique
    critique = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=256,
        messages=[{"role": "user",
                   "content": f"Review this answer for factual errors, unsupported claims, or hallucinations:\n\n{initial}\n\nList any issues found."}]
    ).content[0].text

    # Step 3: Refined answer
    refined = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=512,
        messages=[{"role": "user",
                   "content": f"Original question: {question}\n\nInitial answer: {initial}\n\nCritique: {critique}\n\nNow provide a corrected, more reliable answer."}]
    ).content[0].text
    return refined

# ── NLI-based Hallucination Detection ──────────────────────
from transformers import pipeline
nli = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

def is_entailed(claim: str, context: str) -> bool:
    """Check if claim is entailed by context using NLI"""
    result = nli(context, [claim])
    label = result["labels"][0]
    score = result["scores"][0]
    print(f"Entailment: {label} ({score:.2f})")
    return label == "entailment" and score > 0.7
`
      },
      "Embeddings": {
        explanation: "Embeddings are dense numerical vector representations of text (or images, audio) that capture semantic meaning. Similar concepts are close together in vector space, enabling semantic search, clustering, and similarity comparison.",
        details: [
          "Word2Vec / GloVe: early word embeddings trained on co-occurrence; 'king' - 'man' + 'woman' ≈ 'queen'",
          "Sentence embeddings: encode entire sentences/paragraphs into single vectors (SBERT, OpenAI ada)",
          "Dimensions: typical sizes are 384, 768, 1536, 3072 — higher dimensions = more expressive but more memory",
          "Cosine similarity: measures angle between vectors (−1 to 1); 1 = identical, 0 = orthogonal, −1 = opposite",
          "Dot product similarity: fast approximation when vectors are normalized",
          "Popular models: text-embedding-ada-002 (OpenAI), embed-english (Cohere), all-MiniLM-L6-v2 (free, local)",
          "Multimodal embeddings: CLIP embeds text and images in same space → cross-modal search",
          "ANN (Approximate Nearest Neighbor): FAISS, HNSW — much faster than exact search for large datasets",
          "Use cases: semantic search, RAG, clustering, recommendation, duplicate detection, anomaly detection"
        ],
        example: `from openai import OpenAI
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss

oai = OpenAI()

# ── Generating Embeddings ───────────────────────────────────
def embed_openai(text: str) -> list[float]:
    res = oai.embeddings.create(
        model="text-embedding-ada-002",
        input=text
    )
    return res.data[0].embedding   # 1536-dim vector

# Free local model (no API cost)
model = SentenceTransformer('all-MiniLM-L6-v2')
vecs = model.encode(["Hello world", "Hi there", "Quantum physics"])

# ── Cosine Similarity ───────────────────────────────────────
def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

v1 = np.array(embed_openai("cat"))
v2 = np.array(embed_openai("kitten"))
v3 = np.array(embed_openai("automobile"))
print(cosine_similarity(v1, v2))   # ~0.93 (similar)
print(cosine_similarity(v1, v3))   # ~0.72 (less similar)

# ── Semantic Search with FAISS ──────────────────────────────
documents = [
    "Python is great for data science.",
    "JavaScript is used for web development.",
    "Neural networks are inspired by the brain.",
    "React is a popular UI framework."
]
doc_vecs = np.array([embed_openai(d) for d in documents]).astype('float32')

index = faiss.IndexFlatIP(1536)    # Inner product (for normalized = cosine)
faiss.normalize_L2(doc_vecs)
index.add(doc_vecs)

query = "What's good for AI and ML?"
q_vec = np.array([embed_openai(query)]).astype('float32')
faiss.normalize_L2(q_vec)

distances, indices = index.search(q_vec, k=2)
for i, idx in enumerate(indices[0]):
    print(f"[{distances[0][i]:.3f}] {documents[idx]}")
# [0.89] Neural networks are inspired by the brain.
# [0.81] Python is great for data science.
`
      },
      "Fine-tuning vs RAG": {
        explanation: "Fine-tuning and RAG are two complementary strategies for adapting LLMs to specific domains. Choosing between them depends on the nature of the knowledge needed and available resources.",
        details: [
          "Fine-tuning: update model weights on domain data — model 'bakes in' the knowledge",
          "RAG: retrieve relevant docs at inference time — knowledge stays external and updatable",
          "Use fine-tuning for: tone/style/format changes, specialized jargon, consistent persona, domain-specific reasoning patterns",
          "Use RAG for: up-to-date information, private/proprietary data, large knowledge bases, verifiable citations",
          "Fine-tuning cost: GPU hours, labeled data; RAG cost: vector DB infra, embedding API calls",
          "LoRA (Low-Rank Adaptation): fine-tune only small adapter matrices, not full model — 100x cheaper",
          "QLoRA: LoRA on quantized model — fine-tune 7B model on a single consumer GPU",
          "Best practice: combine both — fine-tune for behavior, RAG for factual grounding",
          "Catastrophic forgetting: fine-tuning can degrade general capabilities; use regularization techniques"
        ],
        example: `# ── LoRA Fine-tuning with Hugging Face PEFT ───────────────
from transformers import AutoModelForCausalLM, AutoTokenizer, TrainingArguments
from peft import LoraConfig, get_peft_model, TaskType
from trl import SFTTrainer

model_id = "mistralai/Mistral-7B-v0.1"
model = AutoModelForCausalLM.from_pretrained(model_id, load_in_4bit=True)  # QLoRA
tokenizer = AutoTokenizer.from_pretrained(model_id)

lora_config = LoraConfig(
    task_type=TaskType.CAUSAL_LM,
    r=16,                   # rank — higher = more capacity, more params
    lora_alpha=32,          # scaling factor
    lora_dropout=0.05,
    target_modules=["q_proj", "v_proj"]   # which layers to adapt
)

model = get_peft_model(model, lora_config)
model.print_trainable_parameters()
# trainable params: 4,194,304 || all params: 3,752,071,168 || 0.11%

# Training dataset format (instruction tuning)
dataset = [
    {"text": "<s>[INST] What is the capital of France? [/INST] Paris. </s>"},
    {"text": "<s>[INST] Summarize RAG in one sentence. [/INST] RAG retrieves relevant documents and injects them into the LLM prompt for grounded generation. </s>"}
]

trainer = SFTTrainer(
    model=model,
    train_dataset=dataset,
    args=TrainingArguments(
        output_dir="./finetuned",
        num_train_epochs=3,
        per_device_train_batch_size=4,
        learning_rate=2e-4,
        warmup_ratio=0.03,
        lr_scheduler_type="cosine"
    ),
    dataset_text_field="text"
)
trainer.train()
model.save_pretrained("./finetuned-lora")

# ── RAG vs Fine-tuning Decision Matrix ─────────────────────
"""
                    RAG         Fine-tuning
─────────────────────────────────────────────
Knowledge cutoff    No limit    Fixed at training
Private data        ✓           ✓ (but baked in)
Updateable          Easy        Expensive retrain
Verifiable          Citations   Hard to trace
Latency             +retrieval  Fast inference
Cost                Vector DB   GPU training
Style/Tone          Prompt      ✓ Better
Format control      Prompt      ✓ Better
Reasoning pattern   Limited     ✓ Better
"""
`
      }
    }
  }
};

export default aiMlGenaiData;