const fs = require("fs");
const http = require("http")

const PORT = 5000;
const DATA_FILE = "letters.json"

if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

const getLetters = () => JSON.parse(fs.readFileSync(DATA_FILE));
const saveLetters = (letters) => fs.writeFileSync(DATA_FILE, JSON.stringify(letters, null, 2));

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === "OPTIONS") {
        res.writeHead(204, {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        });
        return res.end();
    }

    res.setHeader("Access-Control-Allow-Origin", "*"); // CORS
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // 📜 **GET /random-letter** (Fetch a random letter)
    if (req.method === "GET" && req.url === "/random-letter") {
        const letters = getLetters();

        if (letters.length === 0) {
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "No letters in the void yet." }));
        }

        const randomIndex = Math.floor(Math.random() * letters.length);

        const randomLetter = letters[Math.floor(Math.random() * letters.length)];

        console.log("Before sending response");
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(randomLetter));
    }

    // ✉️ **POST /write-letter** (Send a new letter)
    if (req.method === "POST" && req.url === "/write-letter") {
        let body = "";
        req.on("data", (chunk) => (body += chunk));
        req.on("end", () => {
            const { letter } = JSON.parse(body);
            if (!letter || letter.trim() === "") {
                res.writeHead(400, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Letter cannot be empty!" }));
            }

            let letters = getLetters();
            letters.push({ id: Date.now(), content: letter });

            // Keep only the last 100 letters
            if (letters.length > 100) letters.shift();

            saveLetters(letters);
            res.writeHead(200, { "Content-Type": "application/json" });
            return res.end(JSON.stringify({ message: "Letter sent into the void!" }));
        });
    }

    // ❌ 404 for other routes
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
