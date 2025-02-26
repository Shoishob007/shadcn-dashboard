export const isJobOpen = (deadline) => {
    return new Date(deadline) > new Date();
};

export const matchesSearchQuery = (searchQuery, job) => {
    const searchLower = searchQuery.toLowerCase();
    return (
        job?.job?.title?.toLowerCase().includes(searchLower) ||
        job?.location?.toLowerCase().includes(searchLower) ||
        job.email?.toLowerCase().includes(searchLower) ||
        job?.job?.organization?.orgName?.toLowerCase().includes(searchLower) ||
        job?.description?.toLowerCase().includes(searchLower)
    );
};

export const filterJobs = (jobs, filters) => {
    if (!jobs) return [];

    return jobs.filter((doc) => {
        const job = doc;
        const isOpen = isJobOpen(doc.deadline);

        // Search query filter
        if (filters.searchQuery && !matchesSearchQuery(filters.searchQuery, job)) {
            return false;
        }

        // Status filter
        if (filters.status !== 'all') {
            if (filters.status === 'open' && !isOpen) return false;
            if (filters.status === 'expired' && isOpen) return false;
        }

        // Job role filter
        if (filters.jobRole !== 'all' && job.jobRole !== filters.jobRole) {
            return false;
        }

        // Experience filter
        if (filters.experienceRange !== 'all') {
            const experience = job?.yearOfExperience || 0;
            const [min, max] = filters.experienceRange.split('-').map(Number);
            if (experience < min || (max && experience > max)) return false;
        }

        return true;
    });
};