if (/*process.env.NODE_ENV === 'production' &&*/ process.client) {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register(`${process.env.BASE_URL}sw.js`)
        })
    }
}
