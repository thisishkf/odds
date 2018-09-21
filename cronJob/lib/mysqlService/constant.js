const type = {
    select: "SELECT",
    insert: "INSERT",
    update: "UPDATE"
};

const defaultValue = {
    connectTimeout: 300000,
    acquireTimeout: 300000,
    maxRetry: 2,
    queueLimit: 30,
}

module.exports = {
    queryType: type,
    defaultValue: defaultValue
};
