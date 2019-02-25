export const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0] + ' ' + date.toLocaleTimeString();
}