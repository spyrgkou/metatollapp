const redis = require('redis').createClient({
	// url: 'redis://localhost:6379'
	url: 'redis://redis:6379'
});

(async () => {
	try {
		await redis.connect();
		console.log('Connected to Redis server on port 6379');
	} catch (error) {
		console.error(error);
	}
})();

module.exports = redis;