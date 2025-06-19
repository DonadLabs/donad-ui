export function formatCurrency(amount: number) {
    return new Intl.NumberFormat("de-DE", {
        style: "currency",
        currency: "DON",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function formatAddress(address: string) {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-5)}`
}

export function timeAgo(timestamp: number) {
    const now = Math.floor(new Date().getTime() / 1000)
    const past = new Date(timestamp).getTime()
    const diff = Math.floor((now - past)) // in seconds
    console.log({ timestamp, now, past, diff })

    if (diff < 60) return `${diff} detik lalu`
    if (diff < 3600) return `${Math.floor(diff / 60)} menit lalu`
    if (diff < 86400) return `${Math.floor(diff / 3600)} jam lalu`
    return `${Math.floor(diff / 86400)} hari lalu`
}

export function formatDate(timestamp: number) {
    return new Date(timestamp * 1000).toLocaleDateString("id-ID")
}

export function getDaysLeft(targetTimestamp: number) {
    const now = Math.floor(Date.now() / 1000)
    const daysLeft = Math.ceil((targetTimestamp - now) / (24 * 60 * 60))
    return Math.max(0, daysLeft)
}