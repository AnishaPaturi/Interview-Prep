const cybersecurityData = {
  "Cybersecurity": {
    icon: "ti-shield",
    color: "#3C3489",
    topics: {
      "Encryption": {
        explanation: "Encryption converts readable data (plaintext) into unreadable ciphertext using a cryptographic algorithm and key. It is the foundational mechanism for confidentiality in modern computing — securing data in transit (TLS), at rest (AES), and end-to-end (Signal protocol).",
        details: [
          "Symmetric encryption: same key encrypts and decrypts — fast, but key distribution is the hard problem",
          "AES (Advanced Encryption Standard): current gold standard symmetric cipher; block cipher operating on 128-bit blocks",
          "AES key sizes: AES-128 (128-bit key), AES-192, AES-256 — longer = more secure but marginally slower",
          "AES modes: ECB (never use — same block → same ciphertext), CBC (needs IV), GCM (authenticated, preferred), CTR",
          "GCM mode: provides both encryption AND authentication (AEAD) — detects tampering without separate HMAC",
          "Asymmetric encryption: public key encrypts, private key decrypts — solves key distribution but slow",
          "RSA: based on integer factorization difficulty; 2048-bit minimum, 4096-bit recommended for long-term secrets",
          "ECC (Elliptic Curve Cryptography): same security as RSA but with much smaller keys — ECDSA, ECDH",
          "Hybrid encryption: TLS pattern — RSA/ECDH to securely exchange a symmetric AES session key, then use AES",
          "Perfect Forward Secrecy (PFS): ephemeral key exchange (ECDHE) — compromise of long-term key doesn't expose past sessions",
          "IV (Initialization Vector): random value ensures same plaintext → different ciphertext each time; must be unique, never reuse",
          "Padding: block ciphers need input to be multiple of block size; PKCS#7 is standard; OAEP for RSA",
          "Key derivation: never use passwords directly as keys; use KDF (PBKDF2, scrypt, Argon2) to derive cryptographic key",
          "Quantum threat: AES-256 is quantum-safe; RSA and ECC will be broken by Shor's algorithm — NIST post-quantum standards emerging"
        ],
        example: `from Crypto.Cipher import AES
from Crypto.Random import get_random_bytes
from Crypto.Util.Padding import pad, unpad
from cryptography.hazmat.primitives.asymmetric import rsa, padding, ec
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
from cryptography.hazmat.primitives.ciphers.aead import AESGCM
import base64, os

# ── AES-256-GCM (Authenticated Encryption) ─────────────────
# GCM = most recommended mode: encryption + integrity check combined
key = get_random_bytes(32)      # 256-bit key
nonce = get_random_bytes(12)    # 96-bit nonce (DO NOT reuse with same key)
plaintext = b"Top secret data"
aad = b"header info"            # Additional Authenticated Data (not encrypted but authenticated)

aesgcm = AESGCM(key)
ciphertext = aesgcm.encrypt(nonce, plaintext, aad)
# ciphertext includes 16-byte GCM authentication tag appended

decrypted = aesgcm.decrypt(nonce, ciphertext, aad)
assert decrypted == plaintext

# If ciphertext is tampered → cryptography.exceptions.InvalidTag raised
try:
    tampered = ciphertext[:-1] + bytes([ciphertext[-1] ^ 0xFF])
    aesgcm.decrypt(nonce, tampered, aad)
except Exception as e:
    print(f"Tamper detected: {e}")   # InvalidTag

# ── AES-256-CBC (older, requires separate MAC) ───────────────
key_cbc = get_random_bytes(32)
iv  = get_random_bytes(16)      # 128-bit IV, must be random each time
cipher = AES.new(key_cbc, AES.MODE_CBC, iv)
ct = cipher.encrypt(pad(b"Secret message", AES.block_size))

# Decrypt
cipher2 = AES.new(key_cbc, AES.MODE_CBC, iv)
pt = unpad(cipher2.decrypt(ct), AES.block_size)

# ── RSA-OAEP (Asymmetric Encryption) ────────────────────────
# Use for encrypting small data (e.g., symmetric key exchange)
private_key = rsa.generate_private_key(
    public_exponent=65537,
    key_size=2048       # use 4096 for long-term secrets
)
public_key = private_key.public_key()

# Encrypt with RECIPIENT's public key
message = b"AES session key goes here"
ciphertext = public_key.encrypt(
    message,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)

# Decrypt with private key
plaintext = private_key.decrypt(
    ciphertext,
    padding.OAEP(
        mgf=padding.MGF1(algorithm=hashes.SHA256()),
        algorithm=hashes.SHA256(),
        label=None
    )
)
assert plaintext == message

# ── RSA Digital Signature ───────────────────────────────────
# Sign with SENDER's private key; verify with public key
signature = private_key.sign(
    b"document content",
    padding.PSS(
        mgf=padding.MGF1(hashes.SHA256()),
        salt_length=padding.PSS.MAX_LENGTH
    ),
    hashes.SHA256()
)

# Verify (anyone with public key can verify)
try:
    public_key.verify(
        signature,
        b"document content",
        padding.PSS(mgf=padding.MGF1(hashes.SHA256()), salt_length=padding.PSS.MAX_LENGTH),
        hashes.SHA256()
    )
    print("Signature valid ✓")
except Exception:
    print("Signature invalid — document tampered!")

# ── ECDH Key Exchange (Elliptic Curve Diffie-Hellman) ────────
# Both parties derive the same shared secret without transmitting it
# Basis of Perfect Forward Secrecy (PFS) in TLS 1.3
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey

alice_private = X25519PrivateKey.generate()
bob_private   = X25519PrivateKey.generate()

alice_public = alice_private.public_key()
bob_public   = bob_private.public_key()

# Exchange public keys (safe to transmit publicly)
alice_shared = alice_private.exchange(bob_public)
bob_shared   = bob_private.exchange(alice_public)
assert alice_shared == bob_shared   # same secret!
# Now derive AES key from shared secret using HKDF

# ── Key Derivation from Password ────────────────────────────
# NEVER use password directly as encryption key!
from cryptography.hazmat.primitives.kdf.scrypt import Scrypt

password = b"user_password"
salt = os.urandom(16)          # random salt, store alongside ciphertext

kdf = Scrypt(salt=salt, length=32, n=2**14, r=8, p=1)
derived_key = kdf.derive(password)  # 256-bit AES key

# ── Hybrid Encryption Pattern (like TLS) ─────────────────────
def hybrid_encrypt(recipient_public_key, message: bytes) -> dict:
    # 1. Generate random AES session key
    session_key = get_random_bytes(32)
    nonce = get_random_bytes(12)

    # 2. Encrypt message with AES-GCM (fast symmetric)
    aesgcm = AESGCM(session_key)
    ct = aesgcm.encrypt(nonce, message, None)

    # 3. Encrypt session key with recipient's RSA public key
    encrypted_key = recipient_public_key.encrypt(
        session_key,
        padding.OAEP(mgf=padding.MGF1(hashes.SHA256()), algorithm=hashes.SHA256(), label=None)
    )
    return {"encrypted_key": encrypted_key, "nonce": nonce, "ciphertext": ct}

# ── Common Pitfalls ─────────────────────────────────────────
# ❌ WRONG: ECB mode — same plaintext block → same ciphertext block (patterns visible!)
# ❌ WRONG: reusing nonce/IV with same key → catastrophic key stream exposure
# ❌ WRONG: self-implemented crypto ("rolling your own crypto")
# ❌ WRONG: using MD5/SHA1 for security (broken, use SHA-256+)
# ❌ WRONG: using RSA directly to encrypt large data (use hybrid)
# ✓  RIGHT: AES-256-GCM for symmetric, ECDH for key exchange, RSA/ECDSA for signatures
`
      },
      "Hashing": {
        explanation: "Hashing converts arbitrary input into a fixed-size digest using a deterministic, one-way function. It is fundamentally different from encryption: you cannot reverse a hash to recover input. Hashing is used for data integrity, password storage, digital signatures, and data structures (hash maps).",
        details: [
          "One-way (preimage resistance): given hash H, computationally infeasible to find input M such that hash(M) = H",
          "Collision resistance: computationally infeasible to find two different inputs that produce the same hash",
          "Avalanche effect: a single bit change in input produces a completely different hash output",
          "Deterministic: same input ALWAYS produces the same hash — enables verification",
          "MD5 (128-bit): BROKEN — collisions found; use only for non-security checksums",
          "SHA-1 (160-bit): BROKEN — Google's SHAttered attack produced PDF collision in 2017",
          "SHA-256 / SHA-512: secure, widely used for integrity checks, digital signatures, blockchain",
          "SHA-3 (Keccak): NIST standard, different construction (sponge) than SHA-2 — resistant to length extension attacks",
          "BLAKE2 / BLAKE3: faster than SHA-2, secure, recommended for performance-sensitive applications",
          "Password hashing: NEVER use SHA-256 for passwords — attackers can compute billions/sec; use bcrypt, scrypt, or Argon2",
          "bcrypt: intentionally slow (~100 ops/sec); includes salt automatically; adaptive cost factor",
          "scrypt: memory-hard (requires large RAM) — resists GPU/ASIC attacks more than bcrypt",
          "Argon2: winner of Password Hashing Competition 2015; three variants: Argon2i (side-channel), Argon2d (GPU), Argon2id (recommended)",
          "Rainbow tables: precomputed hash → password lookup tables; defeated by salting",
          "HMAC: Hash-based Message Authentication Code — uses key + hash to verify both integrity AND authenticity",
          "Length extension attack: SHA-256/512 vulnerable; use HMAC or SHA-3 instead for MACs"
        ],
        example: `import hashlib, hmac, os, secrets
import bcrypt
from argon2 import PasswordHasher
from argon2.exceptions import VerifyMismatchError

# ── General Hashing ──────────────────────────────────────────
data = b"important document content"

# SHA-256 — file integrity, digital signatures (NOT passwords)
sha256 = hashlib.sha256(data).hexdigest()
print(f"SHA-256: {sha256}")   # 64 hex chars = 256 bits

# SHA-512 — higher security margin
sha512 = hashlib.sha512(data).hexdigest()

# BLAKE2b — faster than SHA-256, secure, good general purpose
blake2 = hashlib.blake2b(data, digest_size=32).hexdigest()

# Verify file integrity
def verify_file_integrity(filepath: str, expected_hash: str) -> bool:
    h = hashlib.sha256()
    with open(filepath, 'rb') as f:
        for chunk in iter(lambda: f.read(65536), b''):  # 64KB chunks
            h.update(chunk)
    return hmac.compare_digest(h.hexdigest(), expected_hash)  # timing-safe compare

# Avalanche effect demo
h1 = hashlib.sha256(b"password").hexdigest()
h2 = hashlib.sha256(b"Password").hexdigest()  # one char different
print(h1)  # ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f
print(h2)  # 0b14d501a594442a01c6859541bcb3428d2ff0f3d9f2b45e3dddab52938ff5e
# Completely different!

# ── HMAC — Message Authentication ───────────────────────────
# Ensures message was from someone who knows the secret key
secret_key = secrets.token_bytes(32)   # 256-bit key

def create_hmac(key: bytes, message: bytes) -> str:
    return hmac.new(key, message, hashlib.sha256).hexdigest()

def verify_hmac(key: bytes, message: bytes, provided_mac: str) -> bool:
    expected = create_hmac(key, message)
    return hmac.compare_digest(expected, provided_mac)  # constant-time!

mac = create_hmac(secret_key, b"Transfer $1000 to Alice")
print(verify_hmac(secret_key, b"Transfer $1000 to Alice", mac))  # True
print(verify_hmac(secret_key, b"Transfer $9999 to Alice", mac))  # False — tampered!

# API request signing pattern:
def sign_api_request(api_key: bytes, payload: str) -> dict:
    timestamp = str(int(__import__('time').time()))
    message = f"{timestamp}:{payload}".encode()
    signature = create_hmac(api_key, message)
    return {"payload": payload, "timestamp": timestamp, "signature": signature}

# ── Password Hashing with bcrypt ─────────────────────────────
# bcrypt automatically: generates salt, applies cost factor, stores both in hash
password = b"my_secure_password_123!"

# Hash at registration:
hashed = bcrypt.hashpw(password, bcrypt.gensalt(rounds=12))
# rounds=12 → ~250ms per check (adjust based on your hardware)
# stored hash looks like: $2b$12$<salt><hash>  (60 chars)
print(f"bcrypt hash: {hashed.decode()}")

# Verify at login:
print(bcrypt.checkpw(password, hashed))           # True
print(bcrypt.checkpw(b"wrong_password", hashed))  # False

# ── Password Hashing with Argon2id (recommended 2024+) ───────
ph = PasswordHasher(
    time_cost=2,       # number of iterations
    memory_cost=65536, # 64 MB of RAM required
    parallelism=2,     # threads
    hash_len=32,
    salt_len=16
)

hashed_argon2 = ph.hash("user_password")
# Returns: $argon2id$v=19$m=65536,t=2,p=2$<salt>$<hash>

try:
    ph.verify(hashed_argon2, "user_password")    # raises nothing = correct
    if ph.check_needs_rehash(hashed_argon2):     # cost factors changed?
        hashed_argon2 = ph.hash("user_password") # rehash with new params
    print("Password correct ✓")
except VerifyMismatchError:
    print("Wrong password ✗")

# ── Rainbow Table Defense (salting) ─────────────────────────
# Without salt: hash("password123") is always the same
# Attacker precomputes billions of (input → hash) pairs
# With salt: hash("password123" + random_salt) — unique per user

# bcrypt/Argon2 handle salting automatically!
# For manual salting (SHA-256 only for non-passwords):
salt = os.urandom(32)
combined = salt + b"data_to_protect"
digest = hashlib.sha256(combined).digest()
# Store: salt + digest

# ── Timing Attack Prevention ─────────────────────────────────
# ❌ WRONG: string comparison leaks timing info
def insecure_verify(provided, stored):
    return provided == stored   # returns early on first mismatch!

# ✓ RIGHT: constant-time comparison
def secure_verify(provided: bytes, stored: bytes) -> bool:
    return hmac.compare_digest(provided, stored)  # always takes same time

# ── Cryptographic vs Non-Cryptographic Hash ───────────────────
# Cryptographic (SHA-256, SHA-3, BLAKE2):
#   - Preimage resistant, collision resistant, one-way
#   - Use for: passwords, integrity, signatures, MACs

# Non-cryptographic (MurmurHash, xxHash, CRC32):
#   - Fast, NOT secure, easily reversible/collided
#   - Use for: hash maps, checksums, bloom filters, deduplication

# ── Common Mistakes ──────────────────────────────────────────
# ❌ Using SHA-256 directly for passwords (billions/sec on GPU)
# ❌ Storing passwords in plaintext or reversible encoding (base64)
# ❌ Using MD5 or SHA-1 for security purposes (broken)
# ❌ Using == to compare hashes (timing attack)
# ❌ No salt → rainbow table attack
# ❌ Shared salt → attacker knows if two users have same password
# ✓ Use bcrypt or Argon2id for passwords, always
`
      },
      "Common Attacks": {
        explanation: "Understanding how attacks work is the foundation of defense. Attackers target the weakest link — often not cryptography itself, but injection flaws, broken authentication, misconfiguration, and human error. The OWASP Top 10 covers the most critical web application security risks.",
        details: [
          "SQL Injection: attacker injects SQL code through user input; manipulates database queries; #1 web vulnerability for decades",
          "XSS (Cross-Site Scripting): inject malicious JavaScript into pages viewed by other users; steals cookies/tokens",
          "CSRF (Cross-Site Request Forgery): trick authenticated user's browser into making unauthorized requests",
          "MITM (Man-in-the-Middle): attacker intercepts communication between two parties; defeated by TLS + cert pinning",
          "Brute Force: systematically try all possible passwords; defeated by rate limiting, account lockout, strong passwords",
          "Credential Stuffing: use leaked username/password pairs from breaches; defeated by MFA, unique passwords",
          "Buffer Overflow: write beyond allocated memory boundary; can overwrite return address, execute arbitrary code",
          "SSRF (Server-Side Request Forgery): server makes requests to internal/attacker-controlled URLs",
          "Path Traversal: ../../etc/passwd — access files outside intended directory",
          "Insecure Direct Object Reference (IDOR): /api/invoice/1234 → change to /api/invoice/1235 → see someone else's data",
          "XXE (XML External Entity): malicious XML references external entities to read files or make internal requests",
          "Clickjacking: iframe overlay tricks user into clicking on something they can't see",
          "Social Engineering: phishing, pretexting, vishing — exploits human psychology, not technology"
        ],
        example: `# ══════════════════════════════════════════════════════════
# SQL INJECTION
# ══════════════════════════════════════════════════════════

# ❌ VULNERABLE — string concatenation
def get_user_VULNERABLE(username: str):
    query = f"SELECT * FROM users WHERE username = '{username}'"
    return db.execute(query)
# Input: admin' OR '1'='1
# Query becomes: SELECT * FROM users WHERE username = 'admin' OR '1'='1'
# Returns ALL users!

# Input: '; DROP TABLE users; --
# Query: SELECT * FROM users WHERE username = ''; DROP TABLE users; --
# Drops the entire table!

# ✓ SAFE — parameterized queries (prepared statements)
def get_user_SAFE(username: str):
    query = "SELECT * FROM users WHERE username = ?"
    return db.execute(query, (username,))  # username treated as data, never code

# ✓ ORM (Object-Relational Mapper) — safe by default
from sqlalchemy import text
user = db.session.query(User).filter(User.username == username).first()

# ══════════════════════════════════════════════════════════
# XSS (Cross-Site Scripting)
# ══════════════════════════════════════════════════════════

# ❌ VULNERABLE — rendering user input as HTML
def render_comment_VULNERABLE(comment):
    return f"<div>{comment}</div>"
# Input: <script>document.cookie // send to attacker</script>
# Victim's browser executes attacker's script!
# Can steal session cookies, redirect to phishing page, keylog

# ✓ SAFE — escape/sanitize user input
import html
def render_comment_SAFE(comment: str) -> str:
    return f"<div>{html.escape(comment)}</div>"
# <script> becomes &lt;script&gt; — rendered as text, not executed

# ✓ Content Security Policy header — browser-level protection
response.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'"
# Prevents loading scripts from other domains

# ══════════════════════════════════════════════════════════
# CSRF (Cross-Site Request Forgery)
# ══════════════════════════════════════════════════════════

# Attack: victim visits evil.com, which submits a form to bank.com
# Bank.com sees the request with victim's session cookie → transfers money

# ✓ Defense 1: CSRF token (unpredictable, tied to session)
import secrets
def generate_csrf_token():
    token = secrets.token_urlsafe(32)
    session['csrf_token'] = token
    return token  # embed in every form as hidden field

def validate_csrf(request):
    token = request.form.get('csrf_token')
    if not token or not hmac.compare_digest(token, session['csrf_token']):
        raise SecurityError("CSRF token mismatch!")

# ✓ Defense 2: SameSite cookie attribute
response.set_cookie('session', value, samesite='Strict')
# Browser won't send cookie on cross-origin requests

# ══════════════════════════════════════════════════════════
# BRUTE FORCE & CREDENTIAL STUFFING
# ══════════════════════════════════════════════════════════

import time
from collections import defaultdict

class RateLimiter:
    def __init__(self, max_attempts=5, window_seconds=300):
        self.attempts = defaultdict(list)
        self.max_attempts = max_attempts
        self.window = window_seconds

    def is_blocked(self, identifier: str) -> bool:
        now = time.time()
        # Remove old attempts outside window
        self.attempts[identifier] = [
            t for t in self.attempts[identifier]
            if now - t < self.window
        ]
        return len(self.attempts[identifier]) >= self.max_attempts

    def record_attempt(self, identifier: str):
        self.attempts[identifier].append(time.time())

limiter = RateLimiter()

def login(ip: str, username: str, password: str):
    if limiter.is_blocked(ip) or limiter.is_blocked(username):
        raise Exception("Too many attempts. Wait 5 minutes.")

    user = get_user(username)
    if not user or not verify_password(password, user.password_hash):
        limiter.record_attempt(ip)
        limiter.record_attempt(username)
        raise Exception("Invalid credentials")  # don't say "wrong password" specifically!
    return create_session(user)

# ✓ Add CAPTCHA after N failures
# ✓ Alert user of login from new location/device
# ✓ Require MFA (TOTP/WebAuthn) — stops credential stuffing entirely

# ══════════════════════════════════════════════════════════
# PATH TRAVERSAL
# ══════════════════════════════════════════════════════════

import os

# ❌ VULNERABLE
def serve_file_VULNERABLE(filename):
    path = f"/var/www/uploads/{filename}"
    return open(path).read()
# Input: ../../etc/passwd → reads /etc/passwd

# ✓ SAFE — canonicalize and validate stays within base directory
def serve_file_SAFE(filename: str) -> bytes:
    base_dir = "/var/www/uploads"
    # Remove any path components
    filename = os.path.basename(filename)    # strips ../
    full_path = os.path.realpath(os.path.join(base_dir, filename))
    
    if not full_path.startswith(os.path.realpath(base_dir)):
        raise PermissionError("Path traversal detected!")
    return open(full_path, 'rb').read()

# ══════════════════════════════════════════════════════════
# IDOR (Insecure Direct Object Reference)
# ══════════════════════════════════════════════════════════

# ❌ VULNERABLE
@app.route('/api/invoice/<int:invoice_id>')
def get_invoice_VULNERABLE(invoice_id):
    return Invoice.query.get(invoice_id)  # any user can see any invoice!

# ✓ SAFE — always check ownership
@app.route('/api/invoice/<int:invoice_id>')
def get_invoice_SAFE(invoice_id):
    invoice = Invoice.query.filter_by(
        id=invoice_id,
        user_id=current_user.id    # must belong to current user
    ).first_or_404()
    return invoice

# Or use UUIDs instead of sequential IDs to prevent enumeration:
# /api/invoice/550e8400-e29b-41d4-a716-446655440000 (hard to guess)
`
      },
      "Authentication & Authorization": {
        explanation: "Authentication verifies WHO you are (identity); Authorization determines WHAT you're allowed to do (permissions). These are distinct and both critical. Broken authentication is the #2 cause of data breaches after injection.",
        details: [
          "Authentication factors: Something you know (password), Something you have (OTP device), Something you are (biometrics)",
          "MFA/2FA: combining two factors — drastically reduces account takeover risk (99.9% reduction per Microsoft)",
          "TOTP (Time-based OTP): RFC 6238; shared secret + current time → 6-digit code; used by Google Authenticator",
          "WebAuthn / FIDO2: hardware-backed passkeys; phishing-resistant; no password transmitted",
          "JWT (JSON Web Token): stateless auth token; Header.Payload.Signature; server validates without DB lookup",
          "JWT structure: header (alg, typ) + payload (claims: sub, exp, iat) + signature (HMAC-SHA256 or RS256)",
          "JWT pitfalls: 'alg: none' attack (strip signature), weak secret, no expiry, storing sensitive data in payload",
          "Session tokens: server-side session stored in DB; invalidated server-side (vs JWT which can't be truly revoked)",
          "OAuth 2.0: authorization framework — 'Login with Google'; grants limited access without sharing password",
          "OAuth flows: Authorization Code (web apps), PKCE (mobile/SPA), Client Credentials (server-to-server)",
          "RBAC (Role-Based Access Control): assign permissions to roles, assign roles to users",
          "ABAC (Attribute-Based Access Control): policies based on user attributes, resource attributes, environment",
          "Principle of Least Privilege: grant only minimum permissions necessary — limits blast radius of breaches",
          "Password policies: min 12 chars, check against breach databases (HaveIBeenPwned), don't force regular rotation"
        ],
        example: `import jwt, time, secrets, pyotp, qrcode
from functools import wraps
from flask import request, jsonify

# ══════════════════════════════════════════════════════════
# JWT (JSON Web Tokens)
# ══════════════════════════════════════════════════════════

SECRET_KEY = secrets.token_urlsafe(64)   # strong random secret; store in env var!

def create_jwt(user_id: int, role: str) -> str:
    payload = {
        "sub": str(user_id),             # subject
        "role": role,                     # custom claim
        "iat": int(time.time()),          # issued at
        "exp": int(time.time()) + 3600,  # expires in 1 hour
        "jti": secrets.token_urlsafe(16) # JWT ID — unique, prevents replay
    }
    return jwt.encode(payload, SECRET_KEY, algorithm="HS256")

def verify_jwt(token: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=["HS256"],    # ALWAYS specify allowed algorithms!
            options={"require": ["exp", "iat", "sub"]}
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("Token expired")
    except jwt.InvalidTokenError:
        raise Exception("Invalid token")

# ❌ CRITICAL JWT PITFALLS:
# 1. Never accept alg=none: jwt.decode(token, "", algorithms=["none"]) → catastrophic!
# 2. Never store sensitive info in payload (it's base64, NOT encrypted, anyone can decode it)
# 3. Always verify expiry, always specify algorithm

# ── JWT Refresh Token Pattern ────────────────────────────────
# Access token: short-lived (15min), used for API calls
# Refresh token: long-lived (7 days), stored securely, used to get new access token

def create_token_pair(user_id: int) -> dict:
    access_token = create_jwt_with_expiry(user_id, seconds=900)    # 15 min
    refresh_token = create_jwt_with_expiry(user_id, seconds=604800) # 7 days
    store_refresh_token_hash(user_id, refresh_token)  # store in DB for revocation
    return {"access_token": access_token, "refresh_token": refresh_token}

# ══════════════════════════════════════════════════════════
# TOTP (Time-Based OTP) — Google Authenticator compatible
# ══════════════════════════════════════════════════════════

def setup_totp(user_id: int, username: str) -> dict:
    secret = pyotp.random_base32()   # 160-bit secret
    store_totp_secret(user_id, secret)  # store encrypted in DB

    totp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
        name=username,
        issuer_name="YourApp"
    )
    # User scans this QR code with their authenticator app
    qr = qrcode.make(totp_uri)
    return {"secret": secret, "uri": totp_uri}

def verify_totp(user_id: int, code: str) -> bool:
    secret = get_totp_secret(user_id)
    totp = pyotp.TOTP(secret)
    return totp.verify(code, valid_window=1)  # allow 30s clock drift

# ══════════════════════════════════════════════════════════
# RBAC (Role-Based Access Control) with Flask decorators
# ══════════════════════════════════════════════════════════

PERMISSIONS = {
    "viewer":  {"read"},
    "editor":  {"read", "write"},
    "admin":   {"read", "write", "delete", "manage_users"},
    "superadmin": {"read", "write", "delete", "manage_users", "system_config"}
}

def require_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return jsonify({"error": "No token"}), 401
        try:
            token = auth_header.split(' ')[1]
            request.user = verify_jwt(token)
        except Exception as e:
            return jsonify({"error": str(e)}), 401
        return f(*args, **kwargs)
    return decorated

def require_permission(permission: str):
    def decorator(f):
        @wraps(f)
        @require_auth
        def decorated(*args, **kwargs):
            user_role = request.user.get("role", "viewer")
            if permission not in PERMISSIONS.get(user_role, set()):
                return jsonify({"error": "Forbidden"}), 403
            return f(*args, **kwargs)
        return decorated
    return decorator

@app.route('/api/data')
@require_permission('read')
def get_data():
    return jsonify({"data": "..."})

@app.route('/api/data', methods=['DELETE'])
@require_permission('delete')
def delete_data():
    return jsonify({"deleted": True})

# ══════════════════════════════════════════════════════════
# OAuth 2.0 + PKCE (Authorization Code with PKCE)
# ══════════════════════════════════════════════════════════

import hashlib, base64

# PKCE prevents authorization code interception
def generate_pkce_pair() -> dict:
    code_verifier = secrets.token_urlsafe(64)   # random string
    code_challenge = base64.urlsafe_b64encode(
        hashlib.sha256(code_verifier.encode()).digest()
    ).rstrip(b'=').decode()
    return {"verifier": code_verifier, "challenge": code_challenge}

# Authorization URL — send user here to authorize with Google/GitHub/etc.
def build_auth_url(client_id: str, redirect_uri: str, pkce: dict) -> str:
    state = secrets.token_urlsafe(32)  # CSRF protection for OAuth flow
    store_in_session('oauth_state', state)
    store_in_session('pkce_verifier', pkce['verifier'])

    return (
        f"https://accounts.google.com/o/oauth2/auth"
        f"?client_id={client_id}"
        f"&redirect_uri={redirect_uri}"
        f"&response_type=code"
        f"&scope=openid email profile"
        f"&state={state}"
        f"&code_challenge={pkce['challenge']}"
        f"&code_challenge_method=S256"
    )

# ── Password Hashing (best practice recap) ──────────────────
import bcrypt

def hash_password(plain: str) -> str:
    return bcrypt.hashpw(plain.encode(), bcrypt.gensalt(12)).decode()

def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode(), hashed.encode())

# ── Security Headers ─────────────────────────────────────────
@app.after_request
def add_security_headers(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'                # clickjacking
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['Content-Security-Policy'] = "default-src 'self'"
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    response.headers['Permissions-Policy'] = 'camera=(), microphone=(), geolocation=()'
    return response
`
      },
      "Network Security": {
        explanation: "Network security encompasses the protocols, practices, and controls that protect data in transit and network infrastructure from unauthorized access, attacks, and disruptions. TLS, firewalls, VPNs, and intrusion detection systems form the core of network defense.",
        details: [
          "TLS (Transport Layer Security): encrypts data in transit; TLS 1.3 is current standard (1.0/1.1 deprecated)",
          "TLS handshake: client hello → server hello + certificate → key exchange (ECDHE) → symmetric key derived → encrypted channel",
          "Certificate chain: server cert → intermediate CA → root CA (in browser trust store); pinning adds extra verification",
          "HTTPS: HTTP over TLS; certificate proves server identity AND encrypts traffic",
          "DNS over HTTPS (DoH) / DNS over TLS (DoT): encrypts DNS queries to prevent DNS snooping and spoofing",
          "Firewall: filters traffic by IP, port, protocol; stateless (packet filter) vs stateful (tracks connections)",
          "WAF (Web Application Firewall): inspects HTTP traffic; blocks SQL injection, XSS, malicious bots",
          "VPN: encrypts all traffic between client and server; OpenVPN, WireGuard (modern, faster)",
          "Zero Trust Architecture: 'never trust, always verify' — no implicit trust even inside network perimeter",
          "IDS/IPS: Intrusion Detection/Prevention System — monitors for known attack patterns; Snort, Suricata",
          "DDoS: Distributed Denial of Service — flood target with traffic to exhaust resources; mitigated by CDN, rate limiting, anycast",
          "Port scanning: Nmap discovers open ports/services — attackers use this for reconnaissance",
          "Network segmentation: isolate sensitive systems in separate network segments; limits lateral movement after breach"
        ],
        example: `import ssl, socket, subprocess
import requests

# ══════════════════════════════════════════════════════════
# TLS / HTTPS — Inspecting and Verifying
# ══════════════════════════════════════════════════════════

# Inspect a server's TLS certificate
def get_cert_info(hostname: str, port: int = 443) -> dict:
    context = ssl.create_default_context()
    with socket.create_connection((hostname, port), timeout=10) as sock:
        with context.wrap_socket(sock, server_hostname=hostname) as ssock:
            cert = ssock.getpeercert()
            cipher = ssock.cipher()
            version = ssock.version()
    return {
        "subject": dict(x[0] for x in cert['subject']),
        "issuer":  dict(x[0] for x in cert['issuer']),
        "expires": cert['notAfter'],
        "san":     cert.get('subjectAltName', []),
        "cipher":  cipher,
        "tls_version": version
    }

info = get_cert_info("google.com")
print(f"Issued to: {info['subject']}")
print(f"Expires: {info['expires']}")
print(f"TLS: {info['tls_version']} using {info['cipher']}")

# ── Enforce HTTPS + Verify Certificates (requests) ───────────
# requests verifies TLS by default
response = requests.get("https://api.example.com/data")  # verify=True by default

# ❌ NEVER disable certificate verification in production!
requests.get("https://...", verify=False)   # MITM vulnerable!

# ✓ Certificate pinning — extra protection
import certifi
response = requests.get("https://api.example.com", verify="/path/to/custom-ca-bundle.pem")

# ── Secure TLS Server with Python ────────────────────────────
import ssl
from http.server import HTTPServer, BaseHTTPRequestHandler

def create_secure_server(certfile: str, keyfile: str, port: int = 443):
    context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
    context.minimum_version = ssl.TLSVersion.TLSv1_3   # TLS 1.3 minimum!
    context.load_cert_chain(certfile=certfile, keyfile=keyfile)
    
    # Strong cipher suites only
    context.set_ciphers('ECDH+AESGCM:ECDH+CHACHA20:!aNULL:!MD5:!DSS')
    
    server = HTTPServer(('', port), BaseHTTPRequestHandler)
    server.socket = context.wrap_socket(server.socket, server_side=True)
    return server

# ══════════════════════════════════════════════════════════
# Firewall Rules (iptables concepts)
# ══════════════════════════════════════════════════════════

# Basic iptables rules (Linux):
# iptables -P INPUT DROP           # default: drop all inbound
# iptables -P FORWARD DROP         # default: drop all forwarded
# iptables -P OUTPUT ACCEPT        # default: allow all outbound
# iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT  # allow responses
# iptables -A INPUT -p tcp --dport 22 -s 192.168.1.0/24 -j ACCEPT   # SSH from LAN only
# iptables -A INPUT -p tcp --dport 443 -j ACCEPT   # HTTPS from anywhere
# iptables -A INPUT -p tcp --dport 80 -j ACCEPT    # HTTP (redirect to HTTPS)

# ══════════════════════════════════════════════════════════
# Rate Limiting (DDoS/Brute Force protection)
# ══════════════════════════════════════════════════════════

from collections import defaultdict
import time

class TokenBucket:
    """Token bucket rate limiter — allows burst, limits sustained rate"""
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity         # max tokens (burst limit)
        self.refill_rate = refill_rate   # tokens per second
        self.buckets = defaultdict(lambda: {"tokens": capacity, "last": time.time()})

    def allow(self, identifier: str) -> bool:
        bucket = self.buckets[identifier]
        now = time.time()
        elapsed = now - bucket["last"]
        bucket["tokens"] = min(
            self.capacity,
            bucket["tokens"] + elapsed * self.refill_rate
        )
        bucket["last"] = now

        if bucket["tokens"] >= 1:
            bucket["tokens"] -= 1
            return True
        return False

limiter = TokenBucket(capacity=10, refill_rate=1)  # 10 req burst, 1 req/sec sustained

# ══════════════════════════════════════════════════════════
# Port Scanning with Nmap (reconnaissance tool)
# ══════════════════════════════════════════════════════════

import nmap

def scan_host(target: str) -> dict:
    nm = nmap.PortScanner()
    nm.scan(target, '1-1024', '-sV -T4')  # -sV detects service versions
    results = {}
    for host in nm.all_hosts():
        results[host] = {"state": nm[host].state(), "ports": {}}
        for proto in nm[host].all_protocols():
            for port in nm[host][proto].keys():
                service = nm[host][proto][port]
                results[host]["ports"][port] = {
                    "state":   service["state"],
                    "service": service["name"],
                    "version": service.get("version", "")
                }
    return results

# ══════════════════════════════════════════════════════════
# DNS Security
# ══════════════════════════════════════════════════════════

import dns.resolver

def check_dns_security(domain: str) -> dict:
    results = {}
    
    # Check SPF record (prevents email spoofing)
    try:
        spf = dns.resolver.resolve(domain, 'TXT')
        results['SPF'] = [r.to_text() for r in spf if 'v=spf1' in r.to_text()]
    except:
        results['SPF'] = "NOT FOUND — email spoofing possible!"

    # Check DMARC
    try:
        dmarc = dns.resolver.resolve(f'_dmarc.{domain}', 'TXT')
        results['DMARC'] = [r.to_text() for r in dmarc]
    except:
        results['DMARC'] = "NOT FOUND — phishing risk!"

    # Check DNSSEC
    try:
        dns.resolver.resolve(domain, 'DNSKEY')
        results['DNSSEC'] = "Enabled ✓"
    except:
        results['DNSSEC'] = "Not enabled"

    return results
`
      },
      "Vulnerability Assessment": {
        explanation: "Vulnerability assessment and penetration testing (pen testing) systematically identifies, classifies, and prioritizes weaknesses in systems before attackers can exploit them. A structured security program includes vulnerability scanning, pen testing, and bug bounty programs.",
        details: [
          "CVE (Common Vulnerabilities and Exposures): standardized identifier for publicly known vulnerabilities",
          "CVSS (Common Vulnerability Scoring System): 0-10 score for severity; considers impact, exploitability",
          "OWASP Top 10: most critical web app risks — maintained by Open Web Application Security Project",
          "Vulnerability scanning: automated tools (Nessus, OpenVAS, Qualys) identify known vulnerabilities",
          "Penetration testing: authorized simulated attack to find and exploit weaknesses before real attackers",
          "Pen test phases: Reconnaissance → Scanning → Exploitation → Post-exploitation → Reporting",
          "SAST (Static Application Security Testing): analyze source code without running it — finds issues early",
          "DAST (Dynamic Application Security Testing): test running application — finds runtime vulnerabilities",
          "SCA (Software Composition Analysis): scan dependencies for known CVEs — npm audit, Snyk, OWASP Dependency-Check",
          "Threat modeling: STRIDE (Spoofing, Tampering, Repudiation, Info Disclosure, DoS, Elevation of Privilege)",
          "Bug bounty programs: reward external researchers for responsibly disclosing vulnerabilities",
          "Zero-day: vulnerability unknown to vendor; no patch available — extremely dangerous"
        ],
        example: `# ══════════════════════════════════════════════════════════
# DEPENDENCY SCANNING
# ══════════════════════════════════════════════════════════

# Check Python dependencies for known CVEs
# $ pip install pip-audit
# $ pip-audit

# Output:
# Package      Version   ID                  Fix
# ------------ --------- ------------------- -------
# cryptography 38.0.1    GHSA-x4qr-2fkf-...  39.0.1
# requests     2.26.0    CVE-2023-32681      2.31.0

# Check Node.js:
# $ npm audit
# $ npm audit fix

# Snyk (comprehensive):
# $ snyk test
# $ snyk monitor   # continuous monitoring

# ══════════════════════════════════════════════════════════
# STATIC ANALYSIS (SAST)
# ══════════════════════════════════════════════════════════

# Bandit — Python security linter
# $ bandit -r ./myapp -f json

# Common findings:
# B105 hardcoded_password_string — never hardcode passwords
# B106 hardcoded_password_funcarg
# B108 probable_insecure_tmp_directory — use tempfile module
# B301 pickle — don't unpickle untrusted data (code execution!)
# B501 request_with_no_cert_validation — verify=False in requests
# B506 yaml_load — use yaml.safe_load() not yaml.load()

# ❌ What Bandit flags:
import pickle
data = pickle.loads(untrusted_bytes)    # B301 — arbitrary code exec

import yaml
data = yaml.load(user_input)            # B506 — use safe_load

password = "hardcoded_secret_123"       # B105 — hardcoded credential

# ✓ Fixed versions:
data = pickle.loads(trusted_bytes)      # or use json instead of pickle
data = yaml.safe_load(user_input)
password = os.environ.get('APP_PASSWORD')

# Semgrep — multi-language SAST
# $ semgrep --config=p/owasp-top-ten ./src

# ══════════════════════════════════════════════════════════
# DYNAMIC TESTING (DAST) with OWASP ZAP
# ══════════════════════════════════════════════════════════

from zapv2 import ZAPv2

def run_zap_scan(target_url: str) -> dict:
    zap = ZAPv2(apikey='your-api-key')
    
    # Spidering — discover pages
    scan_id = zap.spider.scan(target_url)
    while int(zap.spider.status(scan_id)) < 100:
        time.sleep(2)
    
    # Active scan — test for vulnerabilities
    ascan_id = zap.ascan.scan(target_url)
    while int(zap.ascan.status(ascan_id)) < 100:
        time.sleep(5)
    
    alerts = zap.core.alerts(target_url)
    
    # Group by risk level
    by_risk = {"High": [], "Medium": [], "Low": [], "Informational": []}
    for alert in alerts:
        risk = alert.get('risk', 'Informational')
        by_risk[risk].append({
            "name": alert['name'],
            "url":  alert['url'],
            "description": alert['description'],
            "solution": alert['solution'],
            "cweid": alert.get('cweid')
        })
    return by_risk

# ══════════════════════════════════════════════════════════
# THREAT MODELING (STRIDE)
# ══════════════════════════════════════════════════════════

STRIDE_THREATS = {
    "Spoofing":           "Pretending to be someone else — mitigate: authentication (MFA, certs)",
    "Tampering":          "Modifying data or code — mitigate: integrity checks (HMAC, signing, TLS)",
    "Repudiation":        "Denying an action — mitigate: audit logs, non-repudiation (digital signatures)",
    "Info Disclosure":    "Exposing private data — mitigate: encryption, access controls, need-to-know",
    "Denial of Service":  "Making service unavailable — mitigate: rate limiting, redundancy, CDN",
    "Elevation of Privilege": "Gaining unauthorized access — mitigate: least privilege, RBAC, sandboxing"
}

def analyze_component(component_name: str, dataflows: list) -> list:
    threats = []
    for dataflow in dataflows:
        for threat, mitigation in STRIDE_THREATS.items():
            threats.append({
                "component": component_name,
                "dataflow": dataflow,
                "threat": threat,
                "mitigation": mitigation,
                "cvss_estimate": estimate_cvss(threat, dataflow)
            })
    return threats

# ══════════════════════════════════════════════════════════
# SECURE DEVELOPMENT CHECKLIST
# ══════════════════════════════════════════════════════════
"""
INPUT VALIDATION:
  □ Validate and sanitize all user inputs server-side
  □ Use parameterized queries (no string concatenation in SQL)
  □ Validate file uploads (type, size, content)
  □ Encode output to prevent XSS

AUTHENTICATION:
  □ Hash passwords with bcrypt/Argon2id (min cost 12)
  □ Implement MFA for sensitive operations
  □ Use secure session management (HTTPOnly, Secure, SameSite cookies)
  □ Implement rate limiting on auth endpoints
  □ Check passwords against breach databases (HaveIBeenPwned API)

AUTHORIZATION:
  □ Verify permissions on every request server-side
  □ Implement principle of least privilege
  □ Validate object ownership (prevent IDOR)
  □ Log all access control failures

CRYPTO:
  □ Use TLS 1.2+ everywhere; prefer TLS 1.3
  □ Use AES-256-GCM for symmetric encryption
  □ Use ECDSA/RSA-2048+ for asymmetric
  □ Never roll your own crypto

DEPENDENCIES:
  □ Run dependency scanner in CI/CD (npm audit, pip-audit, Snyk)
  □ Keep dependencies updated, automate with Dependabot
  □ Use lockfiles (package-lock.json, poetry.lock)

SECRETS:
  □ No hardcoded secrets in code or git history
  □ Use environment variables or secret managers (AWS Secrets Manager, Vault)
  □ Rotate secrets regularly, immediately if compromised

LOGGING:
  □ Log security events (auth failures, access denied, suspicious activity)
  □ Never log passwords, tokens, or PII
  □ Send logs to SIEM; set up alerts for anomalies
"""
`
      }
    }
  }
};

export default cybersecurityData;