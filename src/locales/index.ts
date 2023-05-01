const languageData = {
  en: {
    windSpeed: "Wind Speed",
    humidity: "Humidity",
    cloud: "Cloud",
    pressure: "Pressure",
    visibility: "Visibility",
    Mon: "Mon",
    Tue: "Tue",
    Wed: "Wed",
    Thu: "Thu",
    Fri: "Fri",
    Sat: "Sat",
    Sun: "Sun",
    manageCities: "Manage Cities",
    settings: "Settings",
    language: "Language",
    tempUnit: "Temperature unit",
    cancel: "Cancel",
    save: "Save",
    viewOnHomeScreen: "View on Home Screen",
    added: "Added",
    enterLocation: "Enter location",
    temperature: "Temperature",
  },
  vi: {
    windSpeed: "Tốc độ gió",
    rain: "Lượng mưa",
    humidity: "Độ ẩm",
    cloud: "Mây",
    pressure: "Áp suất",
    visibility: "Tầm nhìn",
    Mon: "T2",
    Tue: "T3",
    Wed: "T4",
    Thu: "T5",
    Fri: "T6",
    Sat: "T7",
    Sun: "CN",
    manageCities: "Quản lý thành phố",
    settings: "Cài đặt",
    language: "Ngôn ngữ",
    tempUnit: "Đơn vị nhiệt độ",
    cancel: "Hủy bỏ",
    save: "Lưu",
    viewOnHomeScreen: "Xem trên Màn hình chính",
    added: "Đã thêm",
    enterLocation: "Nhập vị trí",
    temperature: "Nhiệt độ",
  },
};

export const translate = (lang: string) => {
  switch (lang) {
    case "en":
      return languageData.en;
    case "vi":
      return languageData.vi;
    default:
      return languageData.en;
  }
};
