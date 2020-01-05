const mongoose = global.mongoose,
  Schema = mongoose.Schema;

const DistrictSchema = new Schema({
  district: { type: String, unique: false },
  districtcode: { type: Number, unique: true },
  statecode: Number
});

DistrictSchema.index({ district: 1, districtcode: 1 }, { unique: true });
mongoose.model("District", DistrictSchema);
