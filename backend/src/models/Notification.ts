import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: {
      validator: function (phoneNumber: string): boolean {
        if (!phoneNumber) {
          return true;
        }

        const regex = /^\+996\d{9}$/;
        return regex.test(phoneNumber);
      },
      message: 'Неверный формат номера телефона!',
    },
  },
  message: String,
  isChecked: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Notification = mongoose.model('Notification', NotificationSchema);
export default Notification;
