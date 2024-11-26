async function startSpeedTest() {
    const testFileUrl = "https://speed.hetzner.de/100MB.bin"; // A public file for testing speed

    // Measure download speed
    const downloadStart = performance.now();
    await fetch(testFileUrl, { cache: "no-store" });
    const downloadEnd = performance.now();
    const downloadTime = (downloadEnd - downloadStart) / 1000; // in seconds
    const fileSizeInBits = 100 * 1024 * 1024 * 8; // 100MB in bits
    const downloadSpeedMbps = (fileSizeInBits / downloadTime / (1024 * 1024)).toFixed(2);
    document.getElementById("download-speed").innerText = `Download Speed: ${downloadSpeedMbps} Mbps`;

    // Measure upload speed
    const uploadData = new Blob(["0".repeat(1000000)], { type: "application/octet-stream" }); // 1MB file
    const uploadStart = performance.now();
    await fetch(testFileUrl, {
        method: "POST",
        body: uploadData,
        cache: "no-store",
    });
    const uploadEnd = performance.now();
    const uploadTime = (uploadEnd - uploadStart) / 1000; // in seconds
    const uploadSpeedMbps = (fileSizeInBits / uploadTime / (1024 * 1024)).toFixed(2);
    document.getElementById("upload-speed").innerText = `Upload Speed: ${uploadSpeedMbps} Mbps`;

    // Measure ping
    const pingStart = performance.now();
    await fetch(window.location.href);
    const pingEnd = performance.now();
    const pingTime = (pingEnd - pingStart).toFixed(2);
    document.getElementById("ping").innerText = `Ping: ${pingTime} ms`;
}
