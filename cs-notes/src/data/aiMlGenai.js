const aiMlGenaiData = {
  "AI / ML / GenAI": {
    icon: "ti-brain",
    color: "#A32D2D",
    topics: {
      "Machine Learning": {
        explanation: "Machine Learning is a subset of AI where systems learn from data to make predictions or decisions without being explicitly programmed for each task.",
        details: [
          "Supervised: labeled data (classification, regression)",
          "Unsupervised: unlabeled data (clustering, dimensionality reduction)",
          "Reinforcement: learn through rewards and penalties",
          "Training vs test set: 80/20 or 70/30 split typical"
        ],
        example: `from sklearn.linear_model import LinearRegression
import numpy as np

X = np.array([[1],[2],[3],[4],[5]])
y = np.array([150,250,300,400,500])

model = LinearRegression()
model.fit(X, y)
print(model.predict([[6]]))  # ~580

from sklearn.cluster import KMeans
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
print(kmeans.labels_)`
      },
      "Neural Networks": {
        explanation: "Neural networks are ML models inspired by the brain. Layers of interconnected neurons learn by adjusting weights through backpropagation.",
        details: [
          "Input → Hidden layers → Output",
          "Activation functions: ReLU, Sigmoid, Tanh, Softmax",
          "Backpropagation: compute gradients, adjust weights",
          "Gradient descent: optimize weights to minimize loss"
        ],
        example: `import torch.nn as nn

model = nn.Sequential(
    nn.Linear(784, 256),
    nn.ReLU(),
    nn.Linear(256, 128),
    nn.ReLU(),
    nn.Linear(128, 10),
    nn.Softmax(dim=1)
)

# Training loop
for epoch in range(100):
    output = model(X_train)
    loss = criterion(output, y_train)
    optimizer.zero_grad()
    loss.backward()   # backprop
    optimizer.step()  # update weights`
      },
      "LLMs": {
        explanation: "Large Language Models are transformer-based neural networks trained on massive text corpora to understand and generate human language.",
        details: [
          "Architecture: transformer with self-attention mechanism",
          "Pre-training: predict next token on large dataset",
          "Fine-tuning: adapt to specific tasks/behavior",
          "RLHF: Reinforcement Learning from Human Feedback"
        ],
        example: `import anthropic
client = anthropic.Anthropic()

response = client.messages.create(
    model="claude-opus-4-6",
    max_tokens=1000,
    temperature=0.7,   # 0=deterministic, 1=creative
    messages=[
        {"role": "user", "content": "Explain recursion simply."}
    ]
)
print(response.content[0].text)`
      },
      "Prompt Engineering": {
        explanation: "Prompt engineering is the practice of designing effective inputs for LLMs to get desired, high-quality outputs.",
        details: [
          "Zero-shot: no examples provided",
          "Few-shot: provide 2–5 examples in prompt",
          "Chain-of-thought: ask model to think step-by-step",
          "Role prompting: give the AI a persona/role"
        ],
        example: `// Few-shot
"Classify sentiment:
'Terrible product.' → Negative
'I love it!' → Positive
'Not bad, could be better.' → Neutral
'This is absolutely wonderful!' → "
// Output: Positive

// Chain-of-thought
"Q: Roger has 5 balls. He buys 2 cans of 3. Total?
A: Step 1: 2 × 3 = 6 new balls.
   Step 2: 5 + 6 = 11 balls."

// Structured output
"Return ONLY valid JSON: {'score': ..., 'reason': '...'}"`
      },
      "RAG": {
        explanation: "Retrieval-Augmented Generation enhances LLMs by retrieving relevant documents and injecting them into the prompt, giving the model up-to-date or domain-specific knowledge.",
        details: [
          "Problem: LLMs have knowledge cutoffs and may hallucinate",
          "Solution: retrieve relevant documents → inject into prompt",
          "Components: Document store, Embedding model, Vector DB, LLM",
          "Enables private knowledge bases without fine-tuning"
        ],
        example: `# RAG pipeline
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

vectorstore = Chroma.from_documents(chunks, OpenAIEmbeddings())
docs = vectorstore.similarity_search(query, k=3)

context = "\\n".join([d.page_content for d in docs])
prompt = f"Context:\\n{context}\\n\\nAnswer: {query}"
answer = llm(prompt)`
      },
      "Hallucinations": {
        explanation: "LLM hallucinations occur when a model generates confident but factually incorrect information — presenting plausible-sounding but false content.",
        details: [
          "Factual hallucination: wrong facts presented confidently",
          "Source hallucination: citing non-existent papers/sources",
          "Causes: gaps in training data, overconfident generation",
          "Mitigation: RAG, grounding, verification, lower temperature"
        ],
        example: `// Mitigation strategies

// 1. RAG — ground in retrieved facts
context = retrieve(query)
prompt = f"Answer ONLY using: {context}"

// 2. Force citations
prompt = "Cite [Source: doc, section] for every claim.
         If you cannot cite it, say 'I don't know.'"

// 3. Temperature = 0 (more deterministic)
response = client.create(model="gpt-4", temperature=0.0)

// 4. Self-consistency — sample multiple, vote
responses = [llm(prompt) for _ in range(5)]`
      }
    }
  }
};

export default aiMlGenaiData;
