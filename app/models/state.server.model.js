const mongoose = global.mongoose,
  Schema = mongoose.Schema;

const StateSchema = new Schema({
  state: { type: String, unique: false },
  statecode: { type: Number, unique: true },
  districtcode: Number
});

StateSchema.index({ state: 1, statecode: 1 }, { unique: true });
mongoose.model("State", StateSchema);
