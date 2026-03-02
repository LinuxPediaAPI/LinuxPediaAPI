<h1 align="center">🐧 Linux Pedia API</h1>

<div align="center">
  <p>
    <strong>Turning the Linux ecosystem into a structured and accessible API</strong>
  </p>
</div>

<div align="center">
  <a href="https://github.com/vn-wiki/LinuxPedia">
    <img src="https://img.shields.io/github/stars/vn-wiki/LinuxPedia?style=social" alt="GitHub stars" />
  </a>
  <a href="https://github.com/vn-wiki/LinuxPedia/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/vn-wiki/LinuxPedia" alt="License" />
  </a>
  <a href="https://nodejs.org/">
    <img src="https://img.shields.io/badge/runtime-Node.js-green" alt="Node.js" />
  </a>
</div>

---

## 📌 About the Project

Linux Pedia API is an experimental RESTful API designed to provide structured and programmatic access to Linux-related information.

It centralizes data about:

- 🐧 Linux distributions  
- 🖥️ Commands and usage examples  
- 🧩 Kernel versions  
- 📦 Popular packages  
- 📜 History and technical curiosities  

The goal is to make Linux knowledge easier to integrate into applications, bots, dashboards, and educational tools.

---

## 🌐 Live Website

Official documentation website:

👉 https://linux-pedia-api.vercel.app/

---

## 🚀 Technologies Used

| Technology | Logo | Description |
|------------|------|-------------|
| **Node.js** | <div align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" width="40" height="40" alt="Node.js"/></div> | Backend runtime powering the RESTful API endpoints |
| **MongoDB** | <div align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" width="40" height="40" alt="MongoDB"/></div> | NoSQL database used to store structured information |
| **HTML, CSS, JS** | <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="40" height="40" alt="HTML"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40" height="40" alt="CSS"/> <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript"/> | Documentation website frontend |
| **Insomnia** | <div align="center"><img src="https://raw.githubusercontent.com/get-icon/geticon/master/icons/insomnia.svg" width="40" height="40" alt="Insomnia"/></div> | API endpoint testing and validation |
| **Vercel** | <div align="center"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg" width="40" height="40" alt="Vercel"/></div> | Deployment and hosting platform |

---

## 📁 Project Structure

```bash
LinuxPediaAPI/
├── LICENSE
├── api/
│   └── index.js
├── package-lock.json
├── package.json
├── public/
│   ├── about.html
│   ├── documention.html
│   ├── favicon.png
│   ├── images/
│   │   ├── Wallpaper.jpg
│   │   ├── cmds/
│   │   │   ├── cat.svg
│   │   │   ├── cd.svg
│   │   │   ├── chmod.svg
│   │   │   ├── chown.svg
│   │   │   ├── cp.svg
│   │   │   ├── df.svg
│   │   │   ├── find.svg
│   │   │   ├── grep.svg
│   │   │   ├── kill.svg
│   │   │   ├── ls.svg
│   │   │   ├── mkdir.svg
│   │   │   ├── mv.svg
│   │   │   ├── ps.svg
│   │   │   ├── pwd.svg
│   │   │   ├── rm.svg
│   │   │   ├── top.svg
│   │   │   └── touch.svg
│   │   ├── dux1.png
│   │   ├── dux2.png
│   │   ├── dux3.png
│   │   └── ondas.svg
│   ├── index.html
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── style.css
│   └── termsofuse.html
├── readme.md
└── vercel.json
```

---

## 🚀 Running Locally

1. Clone the repository:

```bash
git clone https://github.com/vn-wiki/LinuxPedia.git
cd LinuxPedia
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

The API should now be running locally.

---

## 📡 Example Endpoint

### Example request

```http
GET /api/v1/comandos/arquivos
```

### Example response

```json
[
  { 
    "comandos": "ls",
    "descricao": "Lista arquivos e diretórios",
    "exemplo": "ls -la"
  },
  { 
    "comandos": "cp",
    "descricao": "Copia arquivos ou diretórios",
    "exemplo": "cp arquivo.txt /tmp"
  }
]
```

---

## 📌 Endpoint Pattern

All command endpoints follow this structure:

```
GET /api/v1/comandos/{categoria}
```

Replace `{categoria}` with one of the available categories:

- `arquivos`
- `processos`
- `rede`
- `usuarios`
- `pacotes`
## 🤝 Contributing

This is an open community project. Contributions are welcome.

1. Fork the repository  
2. Create a new branch  
3. Commit your changes  
4. Push to your branch  
5. Open a Pull Request  

---

## ⚠️ Terms of Use

Linux Pedia API is an open initiative. Please use it responsibly.

Do not:

- Send mass automated requests  
- Crawl all endpoints repeatedly  
- Use the API for malicious activities or spam  

For high-volume usage, please get in contact.

---

## 👥 Contributors

<a href="https://github.com/LinuxPediaAPI/LinuxPediaAPI/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=LinuxPediaAPI/LinuxPediaAPI" />
</a>

---

## 👨‍💻 Authors

- @vito-ysl  
- @Rezys07  
- @alex518123  

---

## 📜 License

This project is licensed under the MIT License.

---

✨ Built with care for the Linux community.
