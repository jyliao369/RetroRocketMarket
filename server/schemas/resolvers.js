const { AuthenticationError } = require('apollo-server-express');
const { User, Posting } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {

    Query: {
        users: async () => {
            return User.find().populate('postings');
        },
        user: async (parent, { userId }) => {
            return User.findOne({ _id: userId }).populate('postings');
        },

        myprofile: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('postings');
            }
            throw new AuthenticationError('You need to log in first!!');
        },

        postings: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Posting.find(params).sort({ createdAt: -1 });
        },  
        posting: async (parent, { postingId }) => {
            return Posting.findOne({ _id: postingId });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user};
        },
        removeUser: async (parent, args, context) => {
            if (context.user) {
                return User.findOneAndDelete({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to log in first!!');
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            
            if (!user) {
                throw new AuthenticationError('No profile matches the provided email');
            }

            const correctPass = await user.isCorrectPassword(password);

            if (!correctPass) {
                throw new AuthenticationError('Wrong password');
            }

            const token = signToken(user);
            return { token, user };
        },

        addPosting: async (parent, { title, category, platform, publisher, genre, condition, description }, context) => {
            if (context.user) {
                const posting = await Posting.create({
                    title,
                    category,
                    platform,
                    publisher,
                    genre,
                    condition,
                    description,
                    postAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { postings: posting._id } }
                );

                return posting;
            }
            throw new AuthenticationError('You need to be logged in!');
            
        },
        removePosting: async (parent, { postingId }, context) => {
            if (context.user) {
                const posting = await Posting.findOneAndDelete({
                    _id: postingId,
                    postAuthor: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { postings: posting._id } }
                );

                return posting;
            }
            throw new AuthenticationError('You must logged in!!');
        },
    },
};

module.exports = resolvers;