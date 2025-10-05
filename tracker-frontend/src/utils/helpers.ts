export const formatDate = (isoString: Date | null) => {
    if (!isoString) return 'N/A';
    try {
        const date = new Date(isoString);

        return new Intl.DateTimeFormat('et', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
        }).format(date);
    } catch (e) {
        console.error(e)
        return 'Invalid Date';
    }
};

export const calculateDuration = (startIsoString: Date, endIsoString: Date | null) => {
    if (!startIsoString) return 'Unknown';
    
    const start = new Date(startIsoString).getTime();
    const end = endIsoString ? new Date(endIsoString).getTime() : new Date().getTime(); 

    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (!endIsoString || end > new Date().getTime()) {
        return `~${diffDays} days in progress`;
    }

    return `${diffDays} days total`;
};
