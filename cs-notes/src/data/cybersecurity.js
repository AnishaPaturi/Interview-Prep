const cybersecurityData = {
  "Cybersecurity": {
    icon: "ti-shield",
    color: "#3C3489",
    topics: {
      "Encryption": {
        explanation: "Encryption converts readable data (plaintext) into unreadable format (ciphertext) using an algorithm and key. Only authorized parties with the correct key can decrypt it.",
        details: [
          "Symmetric: same key for encrypt/decrypt (AES, DES) — fast",
          "Asymmetric: public key encrypts, private key decrypts (RSA, ECC)",
          "TLS uses asymmetric to exchange a symmetric key, then symmetric for speed",
          "AES-256 is the current industry standard for symmetric encryption"
        ],
        example: `// Symmetric — AES-256
from Crypto.Cipher import AES
key = get_random_bytes(32)   # 256-bit key
cipher = AES.new(key, AES.MODE_GCM)
ciphertext, tag = cipher.encrypt_and_digest(b"Secret")

// Asymmetric — RSA
# 1. Alice gets Bob's PUBLIC key
# 2. Encrypts message with Bob's public key
# 3. Only Bob's PRIVATE key can decrypt
private_key = rsa.generate_private_key(65537, 2048)
public_key  = private_key.public_key()`
      },
      "Hashing": {
        explanation: "Hashing converts input into a fixed-size digest using a one-way function. Same input always produces the same hash; you cannot reverse a hash to recover the input.",
        details: [
          "One-way: hash → original is computationally infeasible",
          "Deterministic: same input → same hash always",
          "Avalanche effect: tiny input change → completely different hash",
          "Use bcrypt for passwords (slow by design — resists brute force)"
        ],
        example: `import hashlib, bcrypt

# SHA-256
h = hashlib.sha256(b"password123").hexdigest()
# "ef92b778..."

# Same input → same hash
# Different input → completely different hash

# Passwords: use bcrypt (NOT SHA-256!)
salt   = bcrypt.gensalt()
hashed = bcrypt.hashpw(b"mypassword", salt)
bcrypt.checkpw(b"mypassword",   hashed)  # True
bcrypt.checkpw(b"wrongpassword", hashed) # False

# SHA-256: billions/sec   ← vulnerable to brute force
# bcrypt:  ~100/sec       ← slow by design`
      }
    }
  }
};

export default cybersecurityData;
