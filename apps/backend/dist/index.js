import app from "./app";
import os from "os";
const PORT = Number(process.env.PORT) || 4000;
app.get("/", (req, res) => {
    const up = Math.floor(os.uptime() / 3600);
    const totalMem = os.totalmem() / (1024 * 1024 * 1024);
    const freeMem = os.freemem() / (1024 * 1024 * 1024);
    const usedMem = totalMem - freeMem;
    const memUsagePercent = (usedMem / totalMem) * 100;
    const cpuLoad = os.loadavg()[0];
    const serverStatus = {
        msg: "Server is up and running",
        uptime: up + "Hrs",
        memory: {
            totalMemory: totalMem.toFixed(2) + "GiB",
            usedMemory: usedMem.toFixed(2) + "GiB",
            freeMemory: freeMem.toFixed(2) + "GiB",
            memoryUsagePercentage: memUsagePercent.toFixed(2) + "%",
        },
        cpu: {
            load: cpuLoad,
        },
        platform: os.platform(),
        arch: os.arch(),
        hostname: os.hostname(),
    };
    res.json(serverStatus);
});
app.listen(PORT, "0.0.0.0", () => {
    const interfaces = os.networkInterfaces();
    const addresses = [];
    for (const name of Object.keys(interfaces)) {
        const iface = interfaces[name];
        if (!iface)
            continue;
        for (const net of iface) {
            if (net.family === "IPv4") {
                addresses.push(net.address);
            }
        }
    }
    console.log("🌐 Server running at:");
    for (const ip of addresses) {
        console.log(`- http://${ip}:${PORT}`);
    }
});
