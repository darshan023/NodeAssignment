const mongoose = global.mongoose,
  Schema = mongoose.Schema;

const CitySchema = new Schema({
  city: { type: String, unique: false },
  urbanstatus: { type: String, unique: false },
  districtcode: Number
});

CitySchema.index({ city: 1, urbanstatus: 1 }, { unique: true });
mongoose.model("City", CitySchema);
