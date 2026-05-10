const computerNetworksData = {
  "Computer Networks": {
    icon: "ti-network",
    color: "#533AB7",
    topics: {
      "OSI Model": {
        explanation: "The OSI (Open Systems Interconnection) model is a conceptual framework with 7 layers standardizing how different network systems communicate.",
        details: [
          "Layer 7 Application: user interface (HTTP, FTP, SMTP, DNS)",
          "Layer 6 Presentation: encryption, compression, encoding",
          "Layer 5 Session: session management, authentication",
          "Layer 4 Transport: end-to-end communication (TCP, UDP)",
          "Layer 3 Network: routing, logical addressing (IP)",
          "Layer 2 Data Link: framing, MAC addressing (Ethernet)",
          "Layer 1 Physical: bits over wire (cables, signals)"
        ],
        example: `// Mnemonic: All People Seem To Need Data Processing
L7 Application:  HTTP, HTTPS, FTP, SMTP, DNS
L6 Presentation: SSL/TLS, JPEG, ASCII encoding
L5 Session:      NetBIOS, RPC, session auth
L4 Transport:    TCP (reliable), UDP (fast), ports
L3 Network:      IP, ICMP, routers
L2 Data Link:    Ethernet, Wi-Fi, switches, MAC
L1 Physical:     cables, fiber, radio waves

// HTTP request journey:
App layer → TCP segment (port 80) → IP packet → Ethernet frame → bits on wire`
      },
      "TCP vs UDP": {
        explanation: "TCP provides reliable, ordered, error-checked delivery. UDP is faster but unreliable — fire and forget.",
        details: [
          "TCP: connection-oriented (3-way handshake: SYN→SYN-ACK→ACK)",
          "TCP: flow control, congestion control, ordering, retransmission",
          "UDP: connectionless, no guarantee of delivery or order",
          "UDP: lower latency, good for video streaming, gaming, DNS"
        ],
        example: `// TCP 3-way handshake
Client → Server: SYN (seq=x)
Server → Client: SYN-ACK (seq=y, ack=x+1)
Client → Server: ACK (ack=y+1)
// Connection established!

// Use TCP: HTTP/HTTPS, FTP, SSH, email
// Use UDP: DNS, VoIP, video streaming, online games`
      },
      "IP Address": {
        explanation: "An IP address is a unique numerical label assigned to each device on a network. IPv4 uses 32 bits; IPv6 uses 128 bits.",
        details: [
          "IPv4: 192.168.1.1 (32 bits, ~4.3 billion addresses)",
          "IPv6: 2001:0db8::8a2e:370:7334 (128 bits)",
          "Private ranges: 10.x.x.x, 172.16-31.x.x, 192.168.x.x",
          "Subnet mask: divides IP into network and host parts"
        ],
        example: `// IPv4 subnetting
IP:       192.168.1.0 / 24
Mask:     255.255.255.0
Network:  192.168.1.0
Hosts:    192.168.1.1 – 192.168.1.254  (254 usable)
Broadcast:192.168.1.255

// /24 → 32-24 = 8 host bits → 2⁸ - 2 = 254 hosts

// NAT: many private IPs share one public IP
// 192.168.1.x → [NAT Router] → 203.0.113.1 (public)`
      },
      "HTTP/HTTPS": {
        explanation: "HTTP is the foundation of data communication on the web. HTTPS adds TLS/SSL encryption for security.",
        details: [
          "Methods: GET, POST, PUT, DELETE, PATCH, HEAD, OPTIONS",
          "Status codes: 2xx success, 3xx redirect, 4xx client error, 5xx server error",
          "Headers: Host, Content-Type, Authorization, Cookie",
          "HTTPS: TLS handshake + certificate verification"
        ],
        example: `// HTTP Request
GET /api/users/123 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGc...

// HTTP Response
HTTP/1.1 200 OK
Content-Type: application/json
{"id": 123, "name": "Alice"}

// Common status codes
200 OK, 201 Created, 204 No Content
301 Moved Permanently, 304 Not Modified
400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
500 Internal Server Error, 503 Service Unavailable`
      },
      "DNS": {
        explanation: "DNS (Domain Name System) translates human-readable domain names to IP addresses. The internet's phone book.",
        details: [
          "Hierarchical: root → TLD (.com, .org) → domain → subdomain",
          "Records: A (IPv4), AAAA (IPv6), CNAME (alias), MX (mail), NS (nameserver)",
          "Caching: reduces lookup time; TTL controls cache duration"
        ],
        example: `// DNS lookup for "www.example.com"
1. Check local cache
2. Query recursive resolver (ISP)
3. Resolver → root nameserver → .com TLD address
4. Resolver → .com TLD → example.com NS address
5. Resolver → example.com NS → www IP address
6. Returns IP, cached for TTL duration

// DNS record types
A     example.com → 93.184.216.34
CNAME www.example.com → example.com (alias)
MX    example.com → mail.example.com`
      }
    }
  }
};

export default computerNetworksData;
