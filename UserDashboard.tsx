  const userStats = getUserStats(user.id) ?? {
    borrowedCount: 0,
    returnedCount: 0,
    totalSpent: 0,
  };
