# Fagun With Bugs

![Fagun With Bugs](https://example.com/banner-image.png)

## Overview
Fagun With Bugs is a curated repository showcasing various software vulnerabilities, testing scripts, and proof-of-concept (PoC) examples. It aims to provide bug bounty hunters, ethical hackers, and security researchers with insights and resources for identifying and exploiting common security flaws.

## Features
- **Curated Vulnerabilities**: A collection of scripts and examples for real-world bugs.
- **PoC Scripts**: Detailed Proof-of-Concept scripts for demonstrating vulnerabilities.
- **Learning Resources**: Helpful for both beginners and professionals in cybersecurity.
- **Open Source**: Contributions are welcome to expand the repository.

## Directory Structure
```plaintext
├── sql-injection
│   ├── payloads.txt
│   ├── sqli-scanner.py
├── xss
│   ├── xss-payloads.txt
│   ├── xss-scanner.py
├── lfi
│   ├── lfi-scanner.py
│   ├── lfi-test-urls.txt
├── README.md
```

## Getting Started
Follow these steps to set up and use the repository:

### Prerequisites
- Python 3.8+
- pip package manager
- Kali Linux or any preferred Linux distribution (recommended)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/fagun18/fagun-with-bugs.git
   cd fagun-with-bugs
   ```
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Usage
1. **SQL Injection Testing**:
   - Run the SQLi scanner:
     ```bash
     python3 sql-injection/sqli-scanner.py -u <target_url>
     ```
2. **Cross-Site Scripting (XSS) Testing**:
   - Run the XSS scanner:
     ```bash
     python3 xss/xss-scanner.py -u <target_url>
     ```
3. **Local File Inclusion (LFI) Testing**:
   - Run the LFI scanner:
     ```bash
     python3 lfi/lfi-scanner.py -u <target_url>
     ```

## Contributing
Contributions are always welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Submit a pull request with detailed information.

## Screenshots
### SQL Injection Scanner
![SQL Injection Scanner Output](https://example.com/sql-screenshot.png)

### XSS Scanner
![XSS Scanner Output](https://example.com/xss-screenshot.png)

### LFI Scanner
![LFI Scanner Output](https://example.com/lfi-screenshot.png)

## License
This repository is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.

## Contact
- **Author**: Fagun
- **GitHub**: [fagun18](https://github.com/fagun18)
- **Website**: [https://fagun18.github.io/fagun-with-bugs/index.html](https://fagun18.github.io/fagun-with-bugs/index.html)
- **Email**: [fagun115946@gmail.com](mailto:fagun115946@gmail.com)

## Browser Extension
Check out the browser extension for enhanced testing capabilities: [Fagun With Bugs - SQA Testing](https://chromewebstore.google.com/detail/fagun-with-bugs-sqa-testi/peelhgmemfhajlldpkamljidapnfnaob)
