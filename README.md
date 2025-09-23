# Authentication Fundamentals

## Authentication vs Authorization

| Concept            | Description                                       | Example                                            |
| ------------------ | ------------------------------------------------- | -------------------------------------------------- |
| **Authentication** | Verifying a user’s identity                       | Login using email/password, OTP, token, biometrics |
| **Authorization**  | Determining what an authenticated user can access | Admin can delete user data                         |

---

## Authentication Methods

1. **Session-based** (Stateful, uses cookies) (Stateful because server maintains session state.)
2. **Token-based** (Stateless, uses JWT) (Stateless because server doesn't store session info.)
3. **OAuth / OpenID** (Login via Google, Facebook, etc.)

---

## Quick Analogy

* **Stateful** → Server keeps a guestbook of logged-in users.
* **Stateless** → User carries a ticket proving their identity.

---

## Stateful Authentication

Server stores session information (memory, DB, Redis) and verifies it for every request.

**Flow:**

```text
User logs in → Server creates session → Sends cookie with sessionID → Client sends cookie with every request → Server verifies session
```

**Pros:**

* Simple to implement
* Easy to invalidate sessions

**Cons:**

* Server memory grows with number of users
* Doesn’t scale well for large/distributed apps

---

## Stateless Authentication (JWT)

Server does **not** store session info; client stores all necessary data.

**Flow:**

```text
User logs in → Server generates JWT → Sends JWT to client → Client stores token → Client sends token in requests → Server verifies token
```

**Pros:**

* Scales easily, no server-side storage
* Great for microservices/distributed apps

**Cons:**

* Token invalidation is tricky
* Must manage token expiration & refresh carefully

---

## Security Best Practices

* Never store plain passwords! Hash them using **bcrypt** or **argon2**.
* Encourage strong passwords (mix letters, numbers, symbols).
* Implement rate-limiting to prevent brute-force attacks.

---

## Cookies Overview

Cookies are key in **stateful authentication**.

| Cookie Type     | Description                            | Example / Behavior                               |
| --------------- | -------------------------------------- | ------------------------------------------------ |
| **Session**     | Temporary, deleted when browser closes | `Set-Cookie: sessionID=abc123; HttpOnly; Path=/` |
| **Persistent**  | Stored on disk, track preferences      | Keeps users logged in across sessions(Remember me)            |
| **Same-Site**   | Controls cross-site requests           | Strict, Lax, None                                |
| **Https-only**   | Cannot be accessed via JavaScript (document.cookie) in the browser. Protects against XSS attacks (cross-site scripting).                                                | Always use for session IDs or tokens:                                |
| **Secure**      | Sent only over HTTPS                   | Helps prevent CSRF attacks                       |
| **First-party** | Set by the domain you visit            | Visiting `example.com` sets a first-party cookie |
| **Third-party** | Set by external domains                | Ad from `ads.com` in `example.com` is sets as a third-party cookie      |


**Same-Site Cookie Behavior:**

| Type   | Example Scenario                                              |
| ------ | ------------------------------------------------------------- |
| Strict | Link from another site → cookie **not sent**, user logged out |
| Lax    | Top-level navigation allowed, cross-site POST blocked         |
| None   | Sent in all requests, must use `Secure` (HTTPS only)          |

**Code Example:**

```http
Set-Cookie: sessionID=abc123.Singnature; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=3600
```
HttpOnly → JS can’t access
Secure → only HTTPS
SameSite=Strict → prevents cross-site requests
Path=/ -> Cookie is valid for all routes under /
Max-Age=3600 → expires in 1 hour

---




