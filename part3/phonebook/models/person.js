const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

// get MongoDB connection url from environment variables
const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose.connect(url)
    .then(() => {
        console.log('connected to MongoDB');
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
        validate: {
            validator: function(value) {
                return /\d{2,3}-\d{6,10}/.test(value);
            },
            message: 'Invalid number. Expected format: 12-123456 or 123-123456'
        }
    },
});

// modify json response: convert id to string, and remove unnecessary fields
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);