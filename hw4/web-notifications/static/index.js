if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/worker.js', {
        scope: '/',
    }).then(async (register) => {
        console.log('ServiceWorker registration successful')
        await fetch('/subscribe', {
            method: "POST",
            body: JSON.stringify(await register.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array('BK56AMdLY8avuiQRc0yRkSjz4XdyJZsVEG3C3c2EhhVcXqdPLUHFTMKBnQO1JfLxlUV5EgVLg4CuVJQ8jvVf3VE')
            })),
            headers: {
                'content-type': 'application/json'
            }
        });
    }).catch(e => console.log('ServiceWorker registration failed: ', e));
}

async function subscribe() {
    const register = navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    await fetch('/subscribe', {
        method: "POST",
        body: JSON.stringify(await register.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array('BK56AMdLY8avuiQRc0yRkSjz4XdyJZsVEG3C3c2EhhVcXqdPLUHFTMKBnQO1JfLxlUV5EgVLg4CuVJQ8jvVf3VE')
        })),
        headers: {
            'content-type': 'application/json'
        }
    });
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