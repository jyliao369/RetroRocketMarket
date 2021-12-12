const db = require('../config/connection');
const { User, Posting } = require('../models');
const userSeeds = require('./userSeeds.json');
const postingSeeds = require('./postingSeeds.json');

db.once('open', async () => {
    try {
        await User.deleteMany({});
        await Posting.deleteMany({});

        await User.create(userSeeds)

        for (let a = 0; a < postingSeeds.length; a++) {
            const { _id, postAuthor } = await Posting.create(postingSeeds[a]);
            const user = await User.findOneAndUpdate(
                { username: postAuthor },
                {
                    $addToSet: {
                        postings: _id,
                    },
                }
            );
        }
    }   catch (err) {
        console.error(err);
        process.exit(1);
    }

    console.log('all done!');
    process.exit(0);
});