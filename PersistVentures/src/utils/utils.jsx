function timeAgo(timestamp) {
  const now = new Date();
  const date = new Date(timestamp);
  const seconds = Math.round((now - date) / 1000);

  if (seconds < 60) {
    return seconds + ' seconds ago';
  }

  const minutes = Math.round(seconds / 60);
  if (minutes < 60) {
    return minutes + ' minutes ago';
  }

  const hours = Math.round(minutes / 60);
  if (hours < 24) {
    return hours + ' hour' + (hours > 1 ? 's' : '') + ' ago';
  }

  const days = Math.round(hours / 24);
  if (days < 30) {
    return days + ' day' + (days > 1 ? 's' : '') + ' ago';
  }

  const months = Math.round(days / 30);
  if (months < 12) {
    return months + ' month' + (months > 1 ? 's' : '') + ' ago';
  }

  const years = Math.round(months / 12);
  return years + ' year' + (years > 1 ? 's' : '') + ' ago';
}

export { timeAgo };
