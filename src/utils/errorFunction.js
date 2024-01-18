const errorFunction = (errorBit, msg, data) => {
  if (errorBit) return { is_error: errorBit, message: msg };
  else return { is_error: errorBit, message: msg, data };
};

module.exports = errorFunction;

/*
    errorFunction() uchta argumentni oladi –
    1. errorBit – xatolik yuz bergan yoki yoʻqligini tekshirish uchun,
    2. msg – amal bajariladigan tegishli xabarlarni koʻrsatish uchun,
    3. maʼlumotlar – foydalanuvchiga yuboriladi.

    Xatolik yuzaga kelganda, u qaytariladi - errorBit va msg yoki boshqa errorBit, msg va data.
*/