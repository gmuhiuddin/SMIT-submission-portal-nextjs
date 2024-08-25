import mongoose from "mongoose"

export const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String
  },
  image: String,
  role: {
    type: String,
    enum: ["admin", "student", "teacher", "undefined"],
    default: "undefined"
  },
  provider: {
    type: String,
    enum: ["google", "credentials"],
    default: "credentials"
  },
  emailVerified: {
    type: Date
  },
  isTwoFactorEnabled: {
    type: Boolean,
    default: false
  },
  warnSend: {
    type: [{
      warnDate: String,
      classroomId: String,
    }],
    default: []
  },
  lastActivity: String
}, { timestamps: true })

userSchema.pre('save', function (next) {
  if (!this.isNew && this.isModified('role')) {
    this.model("User").findById(this._id)
      .then((originalDoc: any) => {
        if (originalDoc && originalDoc.role !== 'undefined') {
          const err = new Error('Role cannot be changed once it is set');
          return next(err);
        }
        next();
      })
      .catch((err: any) => next(err));
  } else {
    next();
  }
});

const User = mongoose.models?.User || mongoose.model("User", userSchema)

const verificationTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
})

const VerificationToken = mongoose.models?.VerificationToken || mongoose.model("VerificationToken", verificationTokenSchema)


const passwordResetTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
})

const PasswordResetToken = mongoose.models?.PasswordResetToken || mongoose.model("PasswordResetToken", passwordResetTokenSchema)


const twoFactorTokenSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  token: {
    type: String,
    unique: true,
    required: true
  },
  expires: {
    type: Date,
    required: true
  }
})

const TwoFactorToken = mongoose.models?.TwoFactorToken || mongoose.model("TwoFactorToken", twoFactorTokenSchema)


export const twoFactorConfirmationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    unique: true,
    required: true
  }
})

const TwoFactorConfirmation = mongoose.models?.TwoFactorConfirmation || mongoose.model("TwoFactorConfirmation", twoFactorConfirmationSchema)


export { User, VerificationToken, PasswordResetToken, TwoFactorToken, TwoFactorConfirmation }