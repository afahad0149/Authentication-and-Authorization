const { model, Schema } = require('mongoose');

const SessionSchema = new Schema({
  userEmail: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Session = model('Session', SessionSchema);

module.exports = Session;
