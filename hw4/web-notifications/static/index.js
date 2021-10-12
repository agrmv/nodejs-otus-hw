const publicVapidKey = 'BK56AMdLY8avuiQRc0yRkSjz4XdyJZsVEG3C3c2EhhVcXqdPLUHFTMKBnQO1JfLxlUV5EgVLg4CuVJQ8jvVf3VE';

const ws = new WebSocket("ws://127.0.0.1:8082");
ws.onmessage = event => console.log(event.data);

let notificationInterval;
ws.onopen = async () => {
    if ('serviceWorker' in navigator) {
        await sendNotify();
        notificationInterval = setInterval(await sendNotify, 1000 * 15);
    }
}
ws.onclose = () => {
    if (notificationInterval) clearInterval(notificationInterval);
}

const sendNotify = async () => {
    const register = await navigator.serviceWorker.register('/worker.js', {scope: '/'});
    ws.send(JSON.stringify(await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })));
}

//https://gist.github.com/Klerith/80abd742d726dd587f4bd5d6a0ab2
function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}